(function($){

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
    
    $(function(){
        inputChange();
        // script
    });
})(jQuery);
