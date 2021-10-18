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

    // agree all
    //.agrContent
    function agreeAll() {
        var checked_all = false;
        var check_all_button = document.querySelector('#check-all');
        //var check_all_button = document.querySelectorAll('.chkAll');
        //var target_checkboxes = document.querySelectorAll('.checkboxes');
        var target_checkboxes = document.querySelectorAll('.agrContent .agrList input');

        /*
        * if the user clicked on one of the checkboxes,
        * either checked them or unchecked them,
        * reset checked_all to false
        */
        target_checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                var unchecked = Array.prototype.slice.call(target_checkboxes).filter(checkbox => !checkbox.checked);
                
                console.log(unchecked.length);

                if(unchecked.length) {
                    checked_all = false;
                    check_all_button.checked = false;
                } else {
                    checked_all = true;
                    check_all_button.checked = true;
                }
            });
        });

        /*
        * when the user clicked on the check all button,
        * check all the target checkboxes
        */
        //check_all_button.addEventListener('click', function() {
        check_all_button.addEventListener('click', function() {
            checked_all = !checked_all;
            target_checkboxes.forEach(function(checkbox) {
                checkbox.checked = checked_all;
            });
        });
    }
    
    $(function(){
        
        inputChange();
        agreeAll();


        // script
    });
})(jQuery);
