<div class="wrap">
    <?php create_dia_diem(); ?>
    <h1>Danh sách địa điểm</h1>
    <div class="">
        <?php danh_sach_dia_diem(); ?>
    </div>
</div>


<?php
function create_dia_diem()
{
    ?>
    <div class="container">
        <form id="dia_diem_form" action="">
            <div class="row col-4">
                <label for="">Địa điểm</label>
                <input type="text" name="place_name" placeholder="Tên địa điểm" required>
            </div>
            <div class="row col-4">
                <label for="">Thứ tự</label>
                <input type="text" name="place_order" placeholder="Thứ tự" required>
            </div>
            <div class="row form-group">
                <label for="">Trạng thái</label>
                <input type="checkbox" name="place_status" placeholder="Trạng thái"
                checked required>
            </div>
            <div class="row py-1">
                <div>
                    <button id="btnSavePlace" class="btn btn-outline-danger">Lưu lại</button>
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
    var_dump($results);
}


// Lưu địa điểm
function save_places()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_data';

    if (isset($_POST['submit'])) {
        $origin = sanitize_text_field($_POST['origin']);
        $destination = sanitize_text_field($_POST['destination']);
        $price_departure = floatval($_POST['price_departure']);
        $price_return = floatval($_POST['price_return']);

        // Thêm dữ liệu vào bảng
        $wpdb->insert(
            $table_name,
            array(
                'origin' => $origin,
                'destination' => $destination,
                'price_departure' => $price_departure,
                'price_return' => $price_return,
            ),
            array('%s', '%s', '%f', '%f')
        );
    }
}

add_action('admin_init', 'save_places');