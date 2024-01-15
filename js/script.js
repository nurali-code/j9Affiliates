$(document).ready(function () {

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Target videos
    const video1 = $('#videoSection1 video')[0];
    const video2 = $('#videoSection2 video')[0];

    // Observe videos
    observer.observe(video1);
    observer.observe(video2);

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the video is in view, play it
                entry.target.play();
            } else {
                // If the video is out of view, pause it
                entry.target.pause();
            }
        });
    }


    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top, }, 300,)
    });

    $('.select-btn').on('click', function (e) {
        $('.select-content').slideToggle(300);
    });

    $('.inp-btn').on('click', function (e) {
        var parInp = $(this).parents('.inp-doble');
        $(parInp).toggleClass('active');
        if ($(parInp).hasClass('active')) { $(parInp).find('.inp-content').slideDown(300); }
        else { $(parInp).find('.inp-content').slideUp(300); }
        $(parInp).find('.inp__main').html($(this).html());
    });

    $('.main').slick({
        arrows: true,
        infinite: true,
        dots: false,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        touchThreshold: 8,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerPadding: '0px',
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
            $('body, .modal').removeClass('active');
        };

        function showModal(id) { $(id).fadeIn(300); $('body').addClass('active'); }

        $('[data-modal]').on('click', function (e) {
            e.preventDefault();
            showModal('#' + $(this).attr("data-modal"));
        });

        $('.modal-close').on('click', () => { hideModals(); });

        $(document).on('click', function (e) {
            if (!(($(e.target).parents('.modal-content').length) ||
                ($(e.target).parents('.btn').length) ||
                ($(e.target).parents('.inp-btn').length) ||
                ($(e.target).parents('.inp-doble').length) ||
                ($(e.target).hasClass('btn')) ||
                ($(e.target).hasClass('inp-btn')) ||
                ($(e.target).hasClass('modal-content'))
            )) { hideModals(); }
        });
    });

    $('.btnPlay').on('click', function (e) {
        $(this).fadeOut();
        var videoElement = $(this).nextAll('video:first')[0];
        videoElement.play();
        videoElement.controls = true;
        videoElement.muted = false;
    });
    

    $('.dropdown-btn').on('click', function (e) {
        if ($(this).hasClass('active')) { $('.dropdown-btn').removeClass('active').next().slideUp(300); }
        else {
            $('.dropdown-btn').removeClass('active').next().slideUp(300);
            $(this).toggleClass('active').next().slideToggle(300);
        }
    });

    $("form").submit(function () {
        $.ajax({
            type: "post",
            method: 'post',
            url: "../sendmail.php",
            data: $(this).serialize(),
        }).done(function () {
            $('#modal').fadeOut()
            $('#thanks').fadeIn()
        }); return false;
    });

    const exchangeRate = 0.77 / 1000;

    function convertDepositKRWtoUSD(krw) {
        return (krw * exchangeRate).toLocaleString('en-US', { maximumFractionDigits: 2 });
    }

    function convertIncomeKRWtoUSD(krw) {
        return (krw * exchangeRate).toLocaleString('en-US', { maximumFractionDigits: 0 });
    }

    function updateCommissionAndIncome() {
        var depositKRW = parseInt($('#depositSlider').val(), 10);
        var bettors = parseInt($('#bettorsSlider').val(), 10);
        var commissionPercentage = 0;

        if (bettors < 5) {
            commissionPercentage = 0;
        } else if (depositKRW <= 10000000) {
            commissionPercentage = 35;
        } else if (depositKRW <= 200000000) {
            commissionPercentage = bettors >= 10 ? 40 : 35;
        } else {
            commissionPercentage = bettors >= 20 ? 45 : (bettors >= 10 ? 40 : 35);
        }

        var incomeKRW = (depositKRW * commissionPercentage) / 100;
        var depositUSD = convertDepositKRWtoUSD(depositKRW);
        var incomeUSD = convertIncomeKRWtoUSD(incomeKRW);

        $('#commissionResult').text(commissionPercentage + '%');
        $('#incomeResult')
            .html(
                '<i>' + incomeUSD + ' USD </i> <i>  ' + incomeKRW.toLocaleString() + ' KRW </i> '
            );
        $('#depositAmount').text(depositKRW.toLocaleString() + ' KRW = ' + depositUSD + ' USD');
        $('#bettorsAmount').text(bettors);
    }
    $('#depositSlider, #bettorsSlider').on('input', updateCommissionAndIncome);
    $(document).ready(function () {
        updateCommissionAndIncome();
    });

});

