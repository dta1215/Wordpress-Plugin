
$ = jQuery;

$(function(){
    console.log("Init booking form JS")
    InitDateTimePicker()
    
    BookingFormHandler.init()
})


BookingFormHandler = (function(){
    let root = {
        $form: null
    }
    
    function Cache(){
        root.$form = $("#booking_form");
        root.$TopArea = root.$form.find(".booking_form_top")
        root.$btnSubmitForm = root.$form.find("#btnBooking")
    }
    
    function InitValidation(){
        let validateModel = {
            ignore: "",
            rules: {
                booking_select_noixuatphat : {
                    required: true
                },
                booking_select_noiden : {
                    required: true
                },
                booking_input_thoigiankhoihanh: {
                    required: true
                },
                booking_radio_loaixe: {
                    required: true
                }

            },
            messages: {
                booking_select_noixuatphat: {
                    required: "Chọn nơi xuất phát"
                },
                booking_select_noiden: {
                    required: "Chọn điểm đến"
                },
                booking_input_thoigiankhoihanh: {
                    required:  "Chọn thời gian khởi hành"
                },
                booking_radio_loaixe: {
                    required: "Chọn loại xe"
                }
            }
        }
        
        root.$form.validate(validateModel)
    }
    
    function Events(){
        InitValidation();
        
        root.$btnSubmitForm.click((e)=>{
            root.$form.valid();
        })
        
        root.$form.delegate('[name="booking_select_noixuatphat"], [name="booking_select_noiden"]', "change", function(e){
            ToggleLoaiXe()

            UpdateMatchingPlaces(e);
        })

        // Nếu nơi xuất phát là HN thì nơi đi HN sẽ phải ẩn đi vì cùng một nơi
        function UpdateMatchingPlaces(e){
            let changedElement = $(e.target);
            let currentValue = changedElement.val();

            if(changedElement.is('[name="booking_select_noixuatphat"]'))
            {
                let noidenSelect = root.$form.find(`[name="booking_select_noiden"]`)
                noidenSelect.val('');
                noidenSelect.find(`option`).removeAttr("hidden");

                console.log(noidenSelect.find(`option[value="${currentValue}"]`));
                noidenSelect.find(`option[value="${currentValue}"]`).attr("hidden", "true")
            }
        }

        function ToggleLoaiXe(){
            let isValid_NoiO_NoiDen = $('select[name="booking_select_noixuatphat"]').valid() && $('select[name="booking_select_noiden"]').valid()

            if(isValid_NoiO_NoiDen) {
                root.$TopArea.show();
            }else{
                root.$TopArea.hide();
            }
        }

        root.$btnSubmitForm.click((e)=>{
            let isValidForm = root.$form.valid();

            if(!isValidForm) return false;

            // When Valid form
            PUM.open(1534);

            let noiXuatPhatValue = root.$form.find('[name="booking_select_noixuatphat"]').val();
			let noiDenValue = root.$form.find('[name="booking_select_noiden"]').val();
			let loaiXe = root.$form.find("[name='booking_radio_loaixe']:checked").val();
			let ngayXuatPhat = root.$form.find('[name="booking_input_thoigiankhoihanh"]').val();
			let gioXuatPhat = root.$form.find('[name="booking_input_thoigiankhoihanh"]').val();

            let resultObj = {
				noiXuatPhatValue: noiXuatPhatValue,
				noiDenValue: noiDenValue,
				giaXe: loaiXe,
				ngayXuatPhat: ngayXuatPhat,
				gioXuatPhat: gioXuatPhat
			}

			FillUltimateForm(resultObj);
        })
    }

    function FillUltimateForm(parentObj){
        console.log(parentObj);

        let ultimateBookingForm = $(".ultimate_booking_form").closest("form");
        
        let getXeType = parseInt(parentObj.giaXe) == 250 ? "VIP" : "Thường";
        
        $(".ultimate_booking_form_from").text(parentObj.noiXuatPhatValue);
        $(".ultimate_booking_form_to").text(parentObj.noiDenValue);
        $(".ultimate_booking_form_time").text(parentObj.gioXuatPhat);
        $(".ultimate_booking_form_price").text(`${getXeType} ` + parentObj.giaXe);
        
        /* Fill vao o input an */
        $("#ultimate_booking_form_from").val(parentObj.noiXuatPhatValue);
        $("#ultimate_booking_form_to").val(parentObj.noiDenValue);
        $("#ultimate_booking_form_time").val(parentObj.gioXuatPhat);
        $("#ultimate_booking_form_price").val(`${getXeType} - ${parentObj.giaXe}`);
    }

    function PreLoad(){
        root.$TopArea.hide();
    }
    
    function Init(){
        Cache();
        Events();

        PreLoad();
    }
    
    return {
     init: Init
    }
})()


function InitDateTimePicker(){
    let dateTimeEl = $("#booking_input_thoigiankhoihanh")

    if(dateTimeEl.length <= 0){
        return false;
    }

    // Khoi tao Datetime picker
    dateTimeEl.datetimepicker('setOptions', {
        lang: 'vi',
        i18n: {
            vi: {
                months: [
                    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                ],
                dayOfWeekShort: [
                  "CN", "T2", "T3", "T4", "T5", "T6", "T7"
                ],
                dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
            },
        },
    });

    dateTimeEl.datetimepicker({
        format:'H:i, d/m/Y',
        formatDate:'d/m/Y'
    });
}