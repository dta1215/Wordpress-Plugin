$ = jQuery;

$(document).ready(function() {
    BangGiaHandler.init();
    DiaDiemHandler.init();
});


BangGiaHandler = (function(){
    function Init() {
        $('.delete-price').click(function(e) {
            e.preventDefault();
            let confirmDelete = confirm('Bạn có chắc muốn xóa bản ghi này !');

            if(!confirmDelete) return false;

            var row = $(this).closest('tr');
            var id = $(this).data('id');
            var data = {
                'action': 'delete_custom_data',
                'id': id
            };
            $.post(ajaxurl, data, function(response) {
                if (response === 'success') {
                    row.remove();
                } else {
                    alert('Xóa không thành công.');
                }
            });
        });


        $(".price_status").change((e)=>{
            let target = e.target;
            let isChecked = $(target).is(":checked");
            let recordId = $(target).closest("tr").attr("id");

            let data = {
                action: "change_price_handler",
                recordId: recordId,
                status: isChecked ? 1 : 0
            };

            $.post(ajaxurl, data, function(res) {
                if(res){
                    alert(res);
                }
            });
        })
    }

    return {
        init: Init
    }
})();


DiaDiemHandler = (function(){
    function Events(){

        // Event delete record
        $('.btn-delete-place').click(function(e) {
            e.preventDefault();
            let confirmDelete = confirm('Bạn có chắc muốn xóa bản ghi này!');
        
            if (!confirmDelete) return false;
        
            var row = $(this).closest('tr');
            var id = $(this).data('id');
            var data = {
                'action': 'custom_delete_place',
                'id': id
            };
        
            $.post(ajaxurl, data, function(res) {
                if (res === 'success') {
                    row.remove();
                } else {
                    alert('Xóa không thành công.');
                }
            });
        });

        // Event change place status
        $(".render_data_status").change((e)=>{
            let target = e.target;
            let isChecked = $(target).is(":checked");
            let recordId = $(target).closest("tr").attr("id");

            let data = {
                action: "change_status_handler",
                recordId: recordId,
                status: isChecked ? 1 : 0
            };

            $.post(ajaxurl, data, function(res) {
                if(res){
                    alert(res);
                }
            });
        })
    }

    function Init() {
        Events();
    }

    return {
        init: Init
    }
})();