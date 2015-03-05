$(function() {

	$.Placeholder.init({ color : "#fff" });

		$('.jcarousel').jcarousel({
	        center: true
	    });

        $('.jcarousel-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();

		$('.input_phone input').mask("+7(999) 999-9999");

		$('.post').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated fadeInDown',
			offset: 100
		});

		$('.zoomIn').addClass("hidden").viewportChecker({
			classToAdd: 'visible animated fadeInDown',
			offset: 100
		});



	  var nextYear = new Date(new Date().getFullYear() + 2, 0, 0, 0, 0, 0, 0);

	  $('#main-example').countdown(nextYear, function(event) {
	    var $this = $(this).html(event.strftime(''
	  		+ '<div class="time hours">'
				+ '<span class="count">%H</span>'
				+ '<span class="label">часов</span>'
			+ '</div>'
			+ '<div class="time minutes">'
				+ '<span class="count">%M</span>'
				+ '<span class="label">минут</span>'
			+ '</div>'
			+ '<div class="time seconds">'
				+ '<span class="count next top">%S</span>'
				+ '<span class="label">секунд</span>'
			+ '</div>'));
	    });


	    $('#global_bg, .close, .sn-button').click(function(event) {
	    	$('.global_form, #global_bg').hide();
	    });
    
	    $('.header-contact-button, .cons-button').click(function(event) {
	    	$('.global_form.form, #global_bg').show();
	    });

	    $('input').on('change', function(event) {
	    	if ($(this).val() != "") {
	    		$(this).removeClass('red');
	    	};
	    });

        $('.submit').click(function(event) {
        	var error = false;
	    	var arr = new Array();
	    	$('.form').removeClass('select');
	    	$(this).parent().addClass('select');
	    	var classes = $('.select input').map(function(indx, element){
	    		if ($(element).val().length < 3) {
	                error = true;
	                $(element).addClass('red');
	             };
			  arr.push($(element).data('name') + ': ' + $(element).val());
			});
			if (!error) {
				$.ajax({
					type: "POST",
					url: "submit.php",
					data: {dataform: arr, formname: $(this).parent('.form').data('formname')}
					}).done(function( msg ) {
						$('.select input').val('');
				    	$('.global_form').hide();
						$('.global_form.sn, #global_bg').show();
					});
			}
			else{
				alert('Заполните все поля!');
			}
		});

});