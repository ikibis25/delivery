/*
Copyright (c) 2017
------------------------------------------------------------------
[Master Javascript]

Project:	Door To Door
Version:	1.0.0
-------------------------------------------------------------------*/

$(document).ready(function() {
    "use strict";
	
    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.mp-scrollToTop').addClass('scroll-active');
        } else {
            $('.mp-scrollToTop').removeClass('scroll-active');
        }
    });
	
    //Click event to scroll to top
    $('.mp-scrollToTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    var heroHeader = $("#hero-header");
    heroHeader.owlCarousel({
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        pagination: false,
        navigation: true,
        autoPlay:true,
        autoHeight: true,
        transitionStyle: "fade",
        navigationText: ["<i aria-hidden='true' class='fa fa-long-arrow-left'></i>", "<i aria-hidden='true' class='fa fa-long-arrow-right'></i>"]
    });

    $('#mpTabs a[href="#household-items"]').on('shown.bs.tab', function(e) {
        var divHeight = $('.mp-scroll-content-area').height();
        $('.mp-scroll-content').css('max-height', divHeight + 'px');
    });

    (function($) {
        $(window).on("load", function() {
            $(".mp-scroll-content").mCustomScrollbar({
                autoHideScrollbar: true,
                theme: "rounded"
            });
        });
    })(jQuery);

    /*BOOTSTRAP MENU ON HOVER*/
    if ($(window).width() > 990) {
        $('ul.nav > li.dropdown, li.dropdown-submenu').hover(function() {
            $(this).find(' > .dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
            $(this).find(' > .dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
    } else {};

    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();
	
	// Contact Form Submition
	function checkRequire(formId , targetResp){
		targetResp.html('');
		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			formDetail.append('form_type' , _this.attr('form-type'));
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
				}
			});
		}
	});

});