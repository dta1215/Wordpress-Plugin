$ = jQuery;

$(document).ready(function() {
    BangGiaHandler.init();
});


BangGiaHandler = (function(){
    function Init() {
        $('.delete-button').click(function(e) {
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
    }

    return {
        init: Init
    }
})();