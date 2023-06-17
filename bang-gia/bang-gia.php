<?php
/*
    Plugin Name: Bảng giá tuyến xe
*/

// Add JS  & CSS files
function enqueue_custom_admin_JS_CSS()
{
    // Đăng ký stylesheet cho trang quản trị
    wp_enqueue_style('custom-admin-style', plugins_url('assets/libs/bootstrap/bootstrap.min.css', __FILE__));
    wp_enqueue_script('my-custom-plugin-script', plugin_dir_url(__FILE__) . 'assets/libs/js/index.js', array('jquery'), '1.0', true);

}
add_action('admin_enqueue_scripts', 'enqueue_custom_admin_JS_CSS');


// Init WP Admin Menu
function my_custom_plugin_menu()
{
    add_menu_page(
        'Quản lý tuyến xe',
        'Quản lý tuyến xe',
        'manage_options',
        'my-custom-plugin',
        'my_custom_plugin_page',
        'dashicons-admin-generic',
        99
    );

    add_submenu_page("my-custom-plugin", "Quản lý địa điểm", "Quản lý địa điểm", "manage_options", "my-custom-dia-diem", "quan_ly_dia_diem_page", 'dashicons-admin-generic');

}
add_action('admin_menu', 'my_custom_plugin_menu');


function quan_ly_dia_diem_page()
{
    include(plugin_dir_path(__FILE__) . 'templates/dia-diem.php');
}

function my_custom_plugin_page()
{
    // Hiển thị biểu mẫu thêm dữ liệu
    display_custom_form();

    ?>
    <div class="wrap">
        <h1>Bảng tuyến xe</h1>
        <!-- Hiển thị bảng dữ liệu -->
        <?php display_custom_table(); ?>
    </div>
    <?php
}

function get_places(){
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_places';
    $results = $wpdb->get_results("SELECT * FROM $table_name");

    return $results;
}

function display_custom_form()
{

    $places = get_places();

    // var_dump($places);

    ?>
    <form method="post">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 py-1">
                    <div class="row">
                        <div class="col-3"><label for="origin">Nơi xuất phát:</label></div>
                        <div class="col-6">
                            <select name="origin" required>
                                <option value="">Chọn điểm xuất phát</option>
                                <?php if (!empty($places)): ?>
                                    <?php foreach ($places as $place): ?>
                                        <option value="<?php echo esc_attr($place->id); ?>"><?php echo esc_html($place->name); ?>
                                        </option>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 py-1">
                    <div class="row">
                        <div class="col-3"><label for="destination">Nơi đến:</label></div>
                        <div class="col-6">
                            <select name="destination" required>
                                <option value="">Chọn điểm xuất phát</option>
                                <?php if (!empty($places)): ?>
                                    <?php foreach ($places as $place): ?>
                                        <option value="<?php echo esc_attr($place->id); ?>"><?php echo esc_html($place->name); ?>
                                        </option>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 py-1">
                        <div class="row">

                            <div class="col-3"><label for="price_departure">Giá xe thường:</label></div>
                            <div class="col-6">
                                <input type="number" step="1" name="price_departure"
                                    id="price_departure" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 py-1">
                        <div class="row">
                            <div class="col-3"> <label for="price_return">Giá xe VIP:</label></div>
                            <div class="col-6"> <input type="number" step="1" name="price_return"
                                    id="price_return" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 py-1">
                        <input type="submit" class="btn btn-primary" name="submit" value="Thêm dữ liệu">
                    </div>
                </div>
            </div>

    </form>
    <?php
}

function process_custom_form()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_prices';

    if (isset($_POST['submit'])) {
        $origin = sanitize_text_field($_POST['origin']);
        $destination = sanitize_text_field($_POST['destination']);
        $price_departure = ($_POST['price_departure']);
        $price_return = ($_POST['price_return']);

        // Thêm dữ liệu vào bảng
        $wpdb->insert(
            $table_name,
            array(
                'fromPlaceId' => $origin,
                'toPlaceId' => $destination,
                'price' => $price_departure,
                'vipPrice' => $price_return,
            )
        );
    }
}
add_action('admin_init', 'process_custom_form');

function display_custom_table()
{
    global $wpdb;
    $booking_prices = $wpdb->prefix . 'booking_prices';
    $booking_places = $wpdb->prefix . 'booking_places';

    // Lấy dữ liệu từ bảng
    $results = $wpdb->get_results("SELECT 
                                price.id, 
                                p1.name as 'fromPlaceName', 
                                p2.name as 'toPlaceName', 
                                price.price, price.vipPrice,
                                status
                            FROM wp_booking_prices price
                            JOIN wp_booking_places p1 on price.fromPlaceId = p1.id
                            JOIN wp_booking_places p2 on price.toPlaceId = p2.id;");

    // var_dump($results);

    // Hiển thị bảng
    if ($results) {
        echo '<table class="wp-list-table widefat table table-striped table-responsive">';
        echo '<thead>
            <tr>
                <th>id</th>
                <th>Nơi xuất phát</th>
                <th>Nơi đến</th>
                <th>Giá vé thường</th>
                <th>Giá vé VIP</th>
                <th>Trạng thái</th>
                <th></th>
            </tr>
        </thead>';
        echo '<tbody>';
        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . esc_html($row->id) . '</td>';
            echo '<td>' . esc_html($row->fromPlaceName) . '</td>';
            echo '<td>' . esc_html($row->toPlaceName) . '</td>';
            echo '<td>' . esc_html($row->price) . '</td>';
            echo '<td>' . esc_html($row->vipPrice) . '</td>';
            echo '<td>' . esc_html($row->status == 1 ? "Mở" : "Đóng") . '</td>';
            echo '<td><button class="delete-button btn btn-danger delete-price" data-id="' . $row->id . '">Xóa</button></td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    } else {
        echo 'Không có dữ liệu.';
    }
}



function delete_custom_data()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_prices';
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

    if ($id > 0) {
        $result = $wpdb->delete($table_name, array('id' => $id), array('%d'));
        if ($result) {
            echo 'success';
        } else {
            echo 'error';
        }
    }
    wp_die();
}
add_action('wp_ajax_delete_custom_data', 'delete_custom_data');
add_action('wp_ajax_nopriv_delete_custom_data', 'delete_custom_data');

function my_custom_plugin_install()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_prices';

    $places_table = $wpdb->prefix . 'booking_places';

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id INT(11) NOT NULL AUTO_INCREMENT,
        origin VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        price_departure DECIMAL(10,2) NOT NULL,
        price_return DECIMAL(10,2) NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

register_activation_hook(__FILE__, 'my_custom_plugin_install');