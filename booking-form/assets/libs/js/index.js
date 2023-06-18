
$ = jQuery;

$(function(){
    console.log("Init booking form JS")
    InitDateTimePicker()
    
    BookingFormHandler.init()
})


BookingFormHandler = (function(){
    const UltimateForm_ID = 1534;

    let root = {
        $form: null
    }
    
    function Cache(){
        root.$form = $("#booking_form");
        root.$TopArea = root.$form.find(".booking_form_top")
        root.$btnSubmitForm = root.$form.find("#btnBooking")

        root.$fromSelect = root.$form.find("[name='booking_select_noixuatphat']");
        root.$toSelect = root.$form.find("[name='booking_select_noiden']");
        root.$datePicker = root.$form.find("[name='booking_input_thoigiankhoihanh']");
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


        // Update to Place base on From PLace selected
        root.$fromSelect.change((e)=>{
            let target = e.target;
            let selectedFromId = $(target).val();

            $.get(ajaxurl + `?action=get_to_place&fromId=${selectedFromId}`, (res) => {
                if(res) {
                    let result = res.map((item, i) => {
                        if(i == 0){
                            return `
                                <option value="">Chọn điểm đến</option>
                                <option value="${item.id}">${item.name}</option>
                            `
                        }else{
                            return `<option value="${item.id}">${item.name}</option>`
                        }
                    }).join("");

                    root.$toSelect.html(result);
                }
            })
        })  

        root.$btnSubmitForm.click((e)=>{
            let isValidForm = root.$form.valid();

            if(!isValidForm) return false;

            // When Valid form
            PUM.open(UltimateForm_ID);

            let noiXuatPhatValue = root.$form.find('[name="booking_select_noixuatphat"]').find("option:selected").html();
			let noiDenValue = root.$form.find('[name="booking_select_noiden"]').find("option:selected").html();
			let ngayXuatPhat = root.$form.find('[name="booking_input_thoigiankhoihanh"]').val();
			let gioXuatPhat = root.$form.find('[name="booking_input_thoigiankhoihanh"]').val();
            
            loaiXe = "";
            let giaTien = root.$form.find("[name='booking_radio_loaixe']:checked").val();
            if(root.$form.find('[name="booking_radio_loaixe"]:checked').is("#radio_booking_radio_loaixe_VIP")){
                loaiXe = "VIP";
            }else if (root.$form.find('[name="booking_radio_loaixe"]:checked').is("#radio_booking_radio_loaixe_thuong")){
                loaiXe = "Thường";
            }

            let resultObj = {
				noiXuatPhatValue: noiXuatPhatValue,
				noiDenValue: noiDenValue,
                loaiXe: loaiXe,
				giaTien: giaTien,
				ngayXuatPhat: ngayXuatPhat,
				gioXuatPhat: gioXuatPhat
			}

			FillUltimateForm(resultObj);
        })

        // Event dat ve thanh cong, ban tin qua Tele
        $(".ultimate_booking_form").closest("form").on("wpcf7mailsent", (e)=>{
            let target = $(e.target);
            $(target).trigger("reset");

            root.$fromSelect.val("").trigger("change");
            root.$toSelect.val("").trigger("change");
            root.$datePicker.val("");

            PUM.close(UltimateForm_ID);
        })
    }

    // Nếu nơi xuất phát là HN thì nơi đi HN sẽ phải ẩn đi vì cùng một nơi
    function UpdateMatchingPlaces(e){
        let changedElement = $(e.target);
        let currentValue = changedElement.val();

        if(changedElement.is('[name="booking_select_noixuatphat"]'))
        {
            let noidenSelect = root.$form.find(`[name="booking_select_noiden"]`)
            noidenSelect.val('');
            noidenSelect.find(`option`).removeAttr("hidden");

            noidenSelect.find(`option[value="${currentValue}"]`).attr("hidden", "true")
        }
    }

    function ToggleLoaiXe(){
        let isValid_NoiO_NoiDen = $('select[name="booking_select_noixuatphat"]').valid() && $('select[name="booking_select_noiden"]').valid()

        if(isValid_NoiO_NoiDen) {
            let fromId = $(`select[name="booking_select_noixuatphat"]`).val();
            let toId = $(`select[name="booking_select_noiden"]`).val();

            // Fill bang gia tuong ung 
            GetBangGia(fromId, toId).then((res)=>{
                if(!res){
                    root.$TopArea.find(`[type="radio"]:selected`).attr("selected", "");
                    root.$TopArea.hide();
                }
                
                if(res){
                    root.$TopArea.show();

                    root.$TopArea.find(`#booking_radio_loaixe_VIP`).text(IntToVND(res.vipPrice));
                    root.$TopArea.find(`#radio_booking_radio_loaixe_VIP`).val(res.vipPrice);

                    root.$TopArea.find(`#booking_radio_loaixe_thuong`).text(IntToVND(res.price));
                    root.$TopArea.find(`#radio_booking_radio_loaixe_thuong`).val(res.price);
                }
            })
        }else{
            root.$TopArea.hide();
        }
    }

    function FillUltimateForm(parentObj){
        let ultimateBookingForm = $(".ultimate_booking_form").closest("form");
        
        $(".ultimate_booking_form_from").text(parentObj.noiXuatPhatValue);
        $(".ultimate_booking_form_to").text(parentObj.noiDenValue);
        $(".ultimate_booking_form_time").text(parentObj.gioXuatPhat);
        $(".ultimate_booking_form_price").text(`${parentObj.loaiXe} ` + IntToVND(parentObj.giaTien));
        
        /* Fill vao o input an */
        $("#ultimate_booking_form_from").val(parentObj.noiXuatPhatValue);
        $("#ultimate_booking_form_to").val(parentObj.noiDenValue);
        $("#ultimate_booking_form_time").val(parentObj.gioXuatPhat);
        $("#ultimate_booking_form_price").val(`${parentObj.loaiXe} - ${IntToVND(parentObj.giaTien)}`);
    }

    function GetBangGia(xuatPhatId, noiDenId){
        return new Promise((resolve, reject)=>{
            var data = {
                'action': 'ajax_load_bang_gia',
                'fromId': xuatPhatId,
                'toId': noiDenId
            };
            $.get(ajaxurl, data, function(res) {
                resolve(res);
            });
        })
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


function IntToVND(num){
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
}