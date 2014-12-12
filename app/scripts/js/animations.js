$(document).ready(function () {

    addAnimation('#page-area', 'zoomIn');
    addAnimation('#logo', 'bounceInDown');
    addAnimation('#form-area', 'bounceInRight');
    addAnimation('#signup', 'bounceInUp');

});


function addAnimation(element, animation) {

    $(element).removeClass(animation + ' animated').addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass(animation + ' animated');
    });

}