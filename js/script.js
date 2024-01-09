$(document).ready(function () {
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top, }, 300,)
    });

    $('.btn-menu').on('click', function (e) {
        $(this).toggleClass('active');
        $('.header .nav, body').toggleClass('active');
    });

    $('.hero-slider').slick({
        arrows: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        centerPadding: '0px',
        centerMode: true,
    });

    $('.direction-slider').slick({
        arrows: false,
        infinite: true,
        dots: true,
        speed: 600,
        slidesToShow: 1,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1000,
                settings: "unslick",
            },
        ]
    });

    function hideModals() {
        $('.modal').fadeOut();
        $('body, .header .nav, .btn-menu').removeClass('active');
    };

    $(function () {
        function showModal(id) {
            $(id).fadeIn(300);
            $('body').addClass('active');
        }

        $('[data-modal]').on('click', function (e) {
            e.preventDefault();
            showModal('#' + $(this).attr("data-modal"));
        });

        $('.modal-close').on('click', () => {
            hideModals();
        });

        $(document).on('click', function (e) {
            if (!(
                ($(e.target).parents('.modal-content').length) ||
                ($(e.target).hasClass('btnModal')) ||
                ($(e.target).hasClass('btn')) ||
                ($(e.target).hasClass('btn-menu')) ||
                ($(e.target).hasClass('modal-content'))
            )) {
                hideModals();
            }
        });
    });

    $('.youth').slick({
        arrows: true,
        infinite: true,
        dots: false,
        slidesToShow: 1,
        speed: 600,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
    });


    $('.btnPlay').on('click', function (e) {
        $(this).fadeOut();
        $(this).next('video')[0].play();
        $(this).next('video').attr('controls', true);
    })

    $('.dropdown-btn').on('click', function (e) {
        if ($(this).hasClass('active')) { $('.dropdown-btn').removeClass('active').next().slideUp(); }
        else {
            $('.dropdown-btn').removeClass('active').next().slideUp();
            $(this).toggleClass('active').next().slideToggle();
        }
    });

    $("form").submit(function () {
        // $('form .btn').addClass('loading');
        $.ajax({
            type: "post",
            method: 'post',
            url: "../sendmail.php",
            data: $(this).serialize(),
            // success: function (response) { alert(response); },
            // error: function (error) { console.error(error); }
        }).done(function () {
            alert('Спасибо за заявку. Ожидайте с вами свяжется специалист!');
        }); return false;
    });

});

