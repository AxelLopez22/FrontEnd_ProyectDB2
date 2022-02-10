document.getElementById("btn_open").addEventListener("click", OpenClose_Menu)

var menu_side = document.getElementById("menu_side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");

function OpenClose_Menu(){
    body.classList.toggle("body_move");
    menu_side.classList.toggle("menu__side_move");
}

if (window.innerWidth < 760){
    body.classList.add("body_move");
    menu_side.classList.add("menu__side_move");
}

/** 
window.addEventListener("resize", function(){
    if (window.innerWidth > 760){
        body.classList.remove("body_move");
        menu_side.classList.remove("menu__side_menu");
    }
    if (window.innerWidth > 760){
        body.classList.add("body_move");
        menu_side.classList.add("menu__side_menu");
    }
});
*/

$(document).ready(function() {
   $('div.options__menu a:first').addClass('Selected');
   $('.content div').hide();
   $('.content div.Inicio').show();

   $('div.options__menu a').click(function() {
       $('div.options__menu a').removeClass('Selected');
       $(this).addClass('Selected');
       $('.content div').hide();

       let OptionSelect = $(this).attr('href');
       $(OptionSelect).show();
       return false;
   });
});