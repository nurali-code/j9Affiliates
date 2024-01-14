$(document).ready(function () {
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top, }, 300,)
    });

    $('.plan-wrap').slick({
        arrows: true,
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 8,
        mobileFirst: true,
        centerPadding: '15px',
        centerMode: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1224,
                settings: {
                    slidesToShow: 3,
                    adaptiveHeight: false
                }
            },
        ]
    });

    $('.testimonial-slider').slick({
        arrows: true,
        infinite: true,
        dots: false,
        speed: 600,
        slidesToShow: 3,
        touchThreshold: 8,
        slidesToScroll: 1,
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 1224,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 700,
                settings: { slidesToShow: 1 }
            },
        ]
    });


    $(function () {
        function hideModals() {
            $('.modal').fadeOut();
            $('body, .header .nav, .btn-menu').removeClass('active');
        };

        function showModal(id) {
            $(id).fadeIn(300); $('body').addClass('active');
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


    $('.btnPlay').on('click', function (e) {
        $(this).fadeOut();
        $(this).next('video')[0].play();
        $(this).next('video').attr('controls', true);
    })

    $('.dropdown-btn').on('click', function (e) {
        if ($(this).hasClass('active')) { $('.dropdown-btn').removeClass('active').next().slideUp(300); }
        else {
            $('.dropdown-btn').removeClass('active').next().slideUp(300);
            $(this).toggleClass('active').next().slideToggle(300);
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

