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
add_action('admin_menu', 'booking_plugin_menu');
function booking_plugin_menu()
{
    add_menu_page('Quản lý giá xe', 'Quản lý giá xe', 'manage_options', 'booking-menu', 'booking_menu_page', 'dashicons-admin-generic', 99);

    add_submenu_page("booking-menu", "Quản lý địa điểm", "Quản lý địa điểm", "manage_options", "my-custom-dia-diem", "quan_ly_dia_diem_page", 'dashicons-admin-generic');
}


function quan_ly_dia_diem_page()
{
    // include(plugin_dir_path(__FILE__) . 'templates/dia-diem.php');
    include 'templates/dia-diem.php';
}

function booking_menu_page()
{
    // Hiển thị biểu mẫu thêm dữ liệu
    display_custom_form();
    ?>
    <div class="wrap">
        <h1>Bảng giá xe</h1>
        <!-- Hiển thị bảng dữ liệu -->
        <?php display_custom_table(); ?>
    </div>
    <?php
}

function get_places()
{
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
        <div class="">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="origin">Nơi xuất phát:</label>
                        <select name="origin" class="form-control" required>
                            <option value="">Chọn điểm xuất phát</option>
                            <?php if (!empty($places)): ?>
                                <?php foreach ($places as $place): ?>
                                    <option value="<?php echo esc_attr($place->id); ?>"><?php echo esc_html($place->name); ?>
                                    </option>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="destination">Nơi đến:</label>
                        <select name="destination" class="form-control" required>
                            <option value="">Chọn điểm xuất phát</option>
                            <?php if (!empty($places)): ?>
                                <?php foreach ($places as $place): ?>
                                    <option value="<?php echo esc_attr($place->id); ?>"><?php echo esc_html($place->name); ?>
                                    </option>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="price_departure" class="label-control">Giá xe thường:</label>
                        <input type="number" class="form-control" step="1" name="price_departure" id="price_departure"
                            required>
                    </div>
                    <div class="form-group">
                        <label for="price_return" class="label-control">Giá xe VIP:</label>
                        <input type="number" class="form-control" step="1" name="price_return" id="price_return" required>
                    </div>
                </div>
            </div>
            <hr>
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
                                price.price, 
                                price.vipPrice,
                                price.status
                            FROM {$booking_prices} price
                            JOIN $booking_places p1 on price.fromPlaceId = p1.id
                            JOIN $booking_places p2 on price.toPlaceId = p2.id;
                        ");

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
            echo '<tr id=' . $row->id . '>';
            echo '<td>' . esc_html($row->id) . '</td>';
            echo '<td>' . esc_html($row->fromPlaceName) . '</td>';
            echo '<td>' . esc_html($row->toPlaceName) . '</td>';
            echo '<td>' . esc_html(NumberToVND($row->price)) . '</td>';
            echo '<td>' . esc_html(NumberToVND($row->vipPrice)) . '</td>';
            echo '<td><input class="price_status" type="checkbox" name="status" value="' . esc_attr($row->status) . '"' . checked($row->status, 1, false) . '></td>';
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

// Change place status
function change_status_handler()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_places';

    $recordId = $_POST['recordId'];
    $status = $_POST['status'];

    $dbStatus = $wpdb->update(
        $table_name,
        array('status' => $status),
        array('id' => $recordId)
    );

    if ($dbStatus !== false) {
        wp_send_json('Cập nhật trạng thái thành công');
    }
    // wp_send_json($_POST);
}
// Hàm callback để xử lý yêu cầu AJAX
add_action('wp_ajax_change_status_handler', 'change_status_handler');
add_action('wp_ajax_nopriv_change_status_handler', 'change_status_handler'); // Sử dụng cho người dùng không đăng nhập


// Change Price status
function change_price_handler()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_prices';

    $recordId = $_POST['recordId'];
    $status = $_POST['status'];

    $dbStatus = $wpdb->update(
        $table_name,
        array('status' => $status),
        array('id' => $recordId)
    );

    if ($dbStatus !== false) {
        wp_send_json('Cập nhật trạng thái thành công');
    }
    // wp_send_json($_POST);
}
// Hàm callback để xử lý yêu cầu AJAX
add_action('wp_ajax_change_price_handler', 'change_price_handler');
add_action('wp_ajax_nopriv_change_price_handler', 'change_price_handler'); // Sử dụng cho người dùng không đăng nhập

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





function NumberToVND($price){
    return number_format($price, 0, '', ',');
}
