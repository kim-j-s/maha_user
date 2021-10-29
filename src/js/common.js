(function($){

    // input
    function inputChange() {
        const $inputWrap = $('.inputWrap');
        $inputWrap.each(function(e){
            if($(this).find('.inp').val().length >= 1) {
                $(this).find('.inp').addClass('on');
            } else {
                $(this).find('.inp').removeClass('on');
            }

            $(this).find('.inp').change(function(){
                if($(this).val().length >= 1) {
                    $(this).addClass('on');
                } else {
                    $(this).removeClass('on');
                }
            });
        });
    }

    function agreeAll() {
        var $check_all_button = $('.chkAll');
        var $target_checkboxes = $('.agrList input');

        $check_all_button.on('change', function(){
            if ($(this).prop('checked')) {
                $(this).closest('.agrWrap').find('.agrList input').prop('checked',true);
            } else {
                $(this).closest('.agrWrap').find('.agrList input').prop('checked',false);
            }
        });

        $target_checkboxes.each(function(){
            $(this).on('click', function(){
                var lng = $(this).closest('.agrList').find('input').not('.exception').length;
                var checkedLng = $(this).closest('.agrList').find('input:checkbox:checked').not('.exception').length;
                console.log(lng, checkedLng);
                if (lng === checkedLng) {
                    $(this).closest('.agrWrap').find('.chkAll').prop('checked',true);
                } else {
                    $(this).closest('.agrWrap').find('.chkAll').prop('checked',false);
                }
            });
        });
    }
    

    $(function(){
        
        inputChange();
        agreeAll();

        // script
    });
})(jQuery);