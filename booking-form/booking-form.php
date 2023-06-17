<?php
/*

Plugin Name: Booking form

*/

add_action('wp_enqueue_scripts', 'booking_form_assets');

function booking_form_assets()
{
    wp_register_style('bootstrap', plugins_url('/assets/libs/bootstrap/bootstrap.min.css', __FILE__));
    wp_register_style('datePickerCSS', plugins_url('/assets/libs/datetimepicker-master/build/jquery.datetimepicker.min.css', __FILE__));
    wp_register_style('indexCSS', plugins_url('/assets/index.css', __FILE__));

    wp_register_script('jquery', plugins_url('/assets/libs/jquery/jquery-3.7.0.min.js', __FILE__));
    wp_register_script('jqueryValidate', plugins_url('/assets/libs/jquery-validation/jquery.validate.min.js', __FILE__));
    wp_register_script('datePicker', plugins_url('/assets/libs/datetimepicker-master/build/jquery.datetimepicker.full.min.js', __FILE__));
    wp_register_script('indexJS', plugins_url('/assets/libs/js/index.js', __FILE__));


    wp_enqueue_style('bootstrap');
    wp_enqueue_style('datePickerCSS');
    wp_enqueue_style('indexCSS');

    wp_enqueue_script('jquery');
    wp_enqueue_script('jqueryValidate');
    wp_enqueue_script('datePicker');
    wp_enqueue_script('indexJS');
}

function get_place_data_db()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_places';

    $results = $wpdb->get_results("SELECT * FROM $table_name
                                    WHERE status = '1'");

    return $results;
}

function booking_form_shortcode()
{
    ob_start(); // Start output buffering

    $places = get_place_data_db();

    // var_dump($places)

    // Your form HTML code goes here
    ?>
    <form id="booking_form" class="container" action="">
        <!-- Form fields -->
            <div class="row booking_form_top">
                <div class="col-12 col-md-6"></div>
                <div class="col-12 col-md-6">
                    <div class="row">
                        <div class="col-6 col-md-4">
                            <label>Xe VIP</label>
                            <div>
                                <input id="radio_booking_radio_loaixe_VIP" type="radio" name="booking_radio_loaixe" value="250.000"><text id="booking_radio_loaixe_VIP">250.000</text>
                            </div>
                        </div>
                        <div class="col-6 col-md-4">
                         <label>Xe Thường</label>
                            <div>
                                <input id="radio_booking_radio_loaixe_thuong" type="radio" name="booking_radio_loaixe" value="200.000"><text id="booking_radio_loaixe_thuong">200.000</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row booking_form_middle">
                <div class="col-12 col-xs-3 col-md-3">
                    <select name="booking_select_noixuatphat">
                        <option value="">Chọn điểm xuất phát</option>
                        <?php if (!empty($places)): ?>
                            <?php foreach ($places as $place): ?>
                                <option value="<?php echo esc_attr($place->id); ?>"><?php echo esc_html($place->name); ?>
                                </option>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </select>
                </div>
                <div class="col-12 col-xs-3 col-md-3">
                    <select name="booking_select_noiden">
                        <option value="">Chọn điểm đến</option>
                        <?php if (!empty($places)): ?>
                            <?php foreach ($places as $place): ?>
                                <option value="<?php echo esc_attr($place->id); ?>"><?php echo esc_html($place->name); ?>
                                </option>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </select>
                </div>
                <div class="col-12 col-xs-3 col-md-3">
                    <input type="text" id="booking_input_thoigiankhoihanh" name="booking_input_thoigiankhoihanh"
                        placeholder="Thời gian khởi hành *">
                </div>
                <div class="col-12 col-xs-2 col-md-2 d-flex justify-content-center">
                    <input id="btnBooking" class="button primary" type="button" value="Đặt vé ngay">
                </div>
            </div>
    </form>
    <?php



    return ob_get_clean(); // Return the buffered content
}


function ajax_load_bang_gia(){
    global $wpdb;
    $table_name = $wpdb->prefix . 'booking_prices';

    $valid = $_GET["action"] == "ajax_load_bang_gia" && $_GET["fromId"] && $_GET["toId"];

    if($valid){
        // Lấy dữ liệu từ bảng
        $fromId = $_GET["fromId"];
        $toId = $_GET["toId"];

        $results = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT price, vipPrice FROM $table_name p 
                WHERE (p.fromPlaceId = %d AND p.toPlaceId = %d ) AND p.status = '1'
                LIMIT 1",
                $fromId,
                $toId
            )
        );

        wp_send_json($results);
    }
}

add_action('wp_ajax_ajax_load_bang_gia', 'ajax_load_bang_gia');
add_action('wp_ajax_nopriv_ajax_load_bang_gia', 'ajax_load_bang_gia');


add_shortcode('booking_form', 'booking_form_shortcode');



