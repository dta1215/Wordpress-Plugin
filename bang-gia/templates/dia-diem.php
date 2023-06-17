<div class="wrap">

    <?php save_places(); ?>
    <hr />
    <h1>Danh sách địa điểm</h1>
    <div class="">
        <?php danh_sach_dia_diem(); ?>
    </div>
</div>


<?php
// Lưu địa điểm
function save_places()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_places';

    if (isset($_POST['addPlace'])) {
        $place_name = sanitize_text_field($_POST['place_name']);
        $place_order = intval($_POST['place_order']);
        $place_status = isset($_POST['place_status']) ? 1 : 0;

        // Thêm bản ghi mới vào bảng
        $wpdb->insert(
            $table_name,
            array(
                'name' => $place_name,
                'place_order' => $place_order,
                'status' => $place_status
            )
        );

        // Hiển thị thông báo thành công
        echo '<div class="notice notice-success"><p>Đã thêm địa điểm thành công.</p></div>';
    }


    // Hiển thị biểu mẫu thêm địa điểm
    ?>
    <div class="container">
        <form method="post">
            <div class="row">
                <div class="col-4">
                    <label for="place_name">Tên địa điểm:</label>
                    <input type="text" name="place_name" required>
                </div>
                <div class="col-3">
                    <label for="place_order">Thứ tự:</label>
                    <input type="number" name="place_order" required>
                </div>
                <div class="col-2">
                    <label for="place_status">Trạng thái:</label>
                    <input type="checkbox" name="place_status" checked>
                </div>
                <div class="col-2">
                    <button type="submit" name="addPlace" class="button button-primary">Thêm</button>
                </div>
            </div>
        </form>
    </div>
    <?php
}




function danh_sach_dia_diem()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_places';

    // Lấy dữ liệu từ bảng
    $results = $wpdb->get_results("SELECT * FROM $table_name WHERE status = '1'");


    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if (isset($_GET['action']) && $_GET['action'] === 'custom_delete_place') {
        if ($id > 0) {
            $result = $wpdb->delete($table_name, array('id' => $id), array('%d'));
            if ($result !== false) {
                wp_redirect(admin_url('admin.php?page=my-custom-dia-diem'));
                exit;
            } 
        }
        wp_die('Xóa không thành công.');
    }
    
    // Hiển thị bảng
    if ($results) {
        echo '<table class="wp-list-table widefat table table-striped table-responsive">';
        echo '<thead>
                <tr>
                    <th>id</th>
                    <th>Tên</th>
                    <th>Thứ tự</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>';
        echo '<tbody>';
        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . esc_html($row->id) . '</td>';
            echo '<td>' . esc_html($row->name) . '</td>';
            echo '<td>' . esc_html($row->place_order) . '</td>';
            $status = $row->status;
            $display_status = ($status == 1) ? 'Bật' : 'Tắt';
            echo '<td>' . esc_html($display_status) . '</td>';
            echo '<td><a href="' . admin_url("admin.php?page=my-custom-dia-diem&action=custom_delete_place&id=" . $row->id) . '" />Xóa</a></td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    } else {
        echo 'Không có dữ liệu.';
    }


    
}


function custom_delete_place()
{
    
}

add_action('admin_init', 'custom_delete_place');


