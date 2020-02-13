'use strict';

////////////////////////////////ЛИЧНЫЙ КАБИНЕТ/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////открытие закозов////////////////////////////
$(".table-tr").click(function(){
    $(this).toggleClass("active-bgc");
    $(this).siblings(".active-tr").toggle('normal');
});

/////////////////////////попап количество заказов + - //////////////////////////////
$(function(){
    var valueElement = $('.popup-table__number span');
    function incrementValue(e){
        valueElement.text(Math.max(parseInt(valueElement.text()) + e.data.increment, 0));
        return false;
    }
    function sumValue(){
        var num=Number(($('.popup-table__number span').text(Number($('.popup-table__number span').text()))).html());
        var num1=Number(($('.popup-price span').text(Number($('.popup-price span').text()))).html());
        var num_sum=num*num1;
        $('.popup-sum span').text(num_sum)
    }

    $('.popup-table__button2').bind('click', {increment: 1}, incrementValue);
    $('.popup-table__button2').on('click', sumValue);
    $('.popup-table__button1').bind('click', {increment: -1}, incrementValue);
    $('.popup-table__button1').on('click', sumValue);
});

//////////////////////////////////////////////////////////////download/////////////////////
$('.table-get').on('click', function () {
    $.ajax({
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/172905/test.pdf',
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'myfile.pdf';
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
});
// $(window).load(function() {
//     setTimeout(function() {
//         $('input:-webkit-autofill')
//             .css('-webkit-text-fill-font-size', '18px', 'font-size', '18px')
//         ;
//     }, 50);
// });

////// переход на другую страницу
$('.table-link').on("click", function() {
    window.location = 'personal-client.html';
});

///////////////////////////сортировка клиентов personal-clients.html//////////////
$(document).ready(function() {
    $("#user_list").tablesorter();
});

////////////////////////добавления цвета на сортировке///////////////
$('.table-active').on('click', function(){
    $(this).children().toggleClass('current-top');
});

/////////////// поиск по заказах по инпут///////////////////////////
$("#form-search-button").on('click',function(){
    var f = $('#search-clients').val();
    $("#user_list tr.table-tr").each(function(){
        if ($(this).text().search(new RegExp(f, "i")) < 0) {
            $(this).fadeOut();
        } else {
            $(this).show();
        }
    });
});
////////////////////////////////поиск заказа на кнопку
$(".form-search__input").on('keyup',function(){
    var f = $(this).val();
    $(".describe-table__table tr.table-tr").each(function(){
        if ($(this).text().search(new RegExp(f, "i")) < 0) {
            $(this).fadeOut();
        } else {
            $(this).show();
        }
    });
});

////////////////select////////////////
var newOptions=$('#tbody tr td:first-child');
var select = $('#personal-select');
if(select.prop) {
    var options = select.prop('options');
} else {
    var options = select.attr('options');
}
$.each(newOptions, function(val, text) {
    options[options.length] = new Option(text.innerHTML);
});
//////////////////////////////////////////////select//////////////////////
$('#personal-select').change( function(){
    $('tr').show();
    var letter = $(this).val();
    var dataset = $('#tbody').find('td:first-child');
    $.each(dataset, function(x, y){
        var data = $(y);

        $.each(data, function(a, b){
            console.log($(b).html())
            if( $(b).html().search(new RegExp(letter, "i")) < 0){
                $(this).parent().fadeOut();
            } else {
                $(this).show();
            }
        });
    });
});




/////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('.menu-trigger').click(function () {
        $('.header__menu__box ul').slideToggle(500);
        // $('.header__menu__box ul').animate({'width': 'toggle'});
    });
});
$(window).resize(function() {
    if ($(window).width() > 992) {
        $('.header__menu__box ul').removeAttr('style');
    }
})

/////слайдер index.html/////////
$('.slider-box').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    prevArrow: $('.questionnaire__prev'),
    nextArrow: $('.questionnaire__next')
    // autoplay: true
});

/////слайдер продукция index.html/////////
$('.production-slider').slick({
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: '<button id="prev" type="button"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>',
    nextArrow: '<button id="next" type="button"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>',
    slidesToShow: 3,
    // autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    // centerMode: true,
    // slidesPerRow: 4,
    // cssEase: 'linear',
    // variableWidth: true,
    responsive: [
        {
            breakpoint: 1650,
            settings: {
                slidesToShow: 3,
                variableWidth: false

            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                variableWidth: false,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 995,
            settings: {
                slidesToShow: 2,
                variableWidth: false,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                variableWidth: false,
                slidesToScroll: 1
            }
        }
    ]
});

///////валидация формы/////////////////
$("#form-enter").submit(function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
        url:    "send.php", //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $(self).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            var t=$(self).parent().parent().parent().parent().find(".popup").css({'display': 'block'});
            setTimeout(function () {
                $(".popup").hide();
            }, 3000);
        },
        error: function(response) { // Данные не отправлены
            ////////////удалить//////////////////////
            var t=$(self).parent().parent().parent().parent().find(".popup").css({'display': 'block'});
            setTimeout(function () {
                $(".popup").hide();
            }, 3000);
            ////////////////////////////////////////
        }
    });


});


//слайдер к странице training-item.html
$('.course-slider').slick({
    // centerMode: true,
    // centerPadding: '250px',
    slidesToShow: 6,
    slidesToScroll: 3,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        {
            breakpoint: 1700,
            settings: {
                arrows: false,
                // centerMode: true,
                // centerPadding: '250px',
                slidesToShow: 5,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 1400,
            settings: {
                arrows: false,
                // centerMode: true,
                // centerPadding: '250px',
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1100,
            settings: {
                arrows: false,
                // centerMode: true,
                // centerPadding: '40px',
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 700,
            settings: {
                arrows: false,
                // centerMode: true,
                // centerPadding: '40px',
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 460,
            settings: {
                arrows: false,
                // centerMode: true,
                // centerPadding: '40px',
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // {
        //     breakpoint: 480,
        //     settings: {
        //         arrows: false,
        //         centerMode: true,
        //         centerPadding: '40px',
        //         slidesToShow: 1
        //     }
        // }
    ]
});


///////хедер блок контакты/////////
$('#check').click(function() {
    if($("#check").is(':checked'))
        $(".svg-tel").css({"transform":"rotate(182deg)"});
    else
        $(".svg-tel").css({"transform":"rotate(0deg)"});
});

//////partners.html///////////
$(".partners-box__text a").on({
    mouseenter: function () {
        $(this).parent().parent().find('.partners-box__img').css({"transform":"scale(1.1)"});
    },
    mouseleave: function () {
        $(this).parent().parent().find('.partners-box__img').css({"transform":"scale(1)"});
    }
    // $(".partners-box__img img").css({"transform":"scale(1.2)"})
});

//////back to top кнопка///////////
$(document).ready(function(){
    $('body').append('<a href="#" id="go-top" title="Вверх"><i class="fa fa-caret-up" aria-hidden="true"></i>Вверх</a>');
});

$(function() {
    $.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
        var scrollDiv = $(this);
        $(window).scroll(function() {
            if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
            else $(scrollDiv).fadeIn("slow")
        });
        $(this).click(function() {
            $("html, body").animate({scrollTop: 0}, "slow")
        })
    }
});

$(function() {
    $("#go-top").scrollToTop();
});


////////меню добавление бордера на актив///////////////
$(document).ready(function(){
    var url=document.location.href;
    $.each($(".header__menu__link"),function(){
        if(this.href==url){$(this).addClass('active');};
    });
});

$('.header__menu__link').hover(function(){

    if ( $(this).hasClass("active") ) {
        //     $('.header__menu__link:after').css({
        //         'width':  "0"
        // });
    }
});



$('.production-block__slider1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: false,
    fade: true,
    // infinite: true,
    // speed: 300,
    // autoplay: true,
    // autoplaySpeed: 5000,
    asNavFor: '.production-block__slider'
});
$('.production-block__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.production-block__slider1',
    // dots: false,
    // infinite: true,
    // speed: 300,
    // autoplay: true,
    // autoplaySpeed: 5000,
    focusOnSelect: true
});




