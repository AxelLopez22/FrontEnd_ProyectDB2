
$(document).ready(function(){
    $('.sidebar-menu li a:first').addClass('active');
    $('.Secciones div').hide();
    $('.Secciones div:first').show();

    $('.sidebar-menu li a').click(function(){
        $('.sidebar-menu li a').removeClass('active');
        $(this).addClass('active');
        $('.Secciones div').hide();

        let ActiveTab = $(this).attr('href');
        $(ActiveTab).show();
        return false;
    });
});