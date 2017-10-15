jQuery(document).ready(function($){
	var	scrolling = false;
	var contentSections = $('.cd-section'),
		verticalNavigation = $('.cd-vertical-nav'),
		navigationItems = verticalNavigation.find('a'),
		navTrigger = $('.cd-nav-trigger'),
		scrollArrow = $('.cd-scroll-down');
		
		
	var headline = document.querySelector('.trigger-headline');
			var	trigger = document.querySelector('.btn--trigger');
			var	segmenter = new Segmenter(document.querySelector('.segmenter'),	{
					pieces: 8,
					positions: [
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100},
						{top: 0, left: 0, width: 100, height: 100}
					],
					shadows: false,
					parallax: true,
					parallaxMovement: {min: 10, max: 30},
					animation: {
						duration: 2500,
						easing: 'easeOutExpo',
						delay: 0,
						opacity: .1,
						translateZ: {min: 10, max: 25}
					},
					onReady: function() {
						// segmenter.animate();
						headline.classList.remove('trigger-headline--hidden');
						trigger.classList.remove('btn--hidden');
						trigger.addEventListener('click', function() {
							segmenter.animate();
							headline.classList.remove('trigger-headline--hidden');
							this.classList.add('btn--hidden');
						});
					}
				});

	$(window).on('scroll', checkScroll);

	//smooth scroll to the selected section
	verticalNavigation.on('click', 'a', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    scrollArrow.on('click', function(event){
    	event.preventDefault();
        smoothScroll($(this.hash));
    });

	// open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNavigation.toggleClass('open');
    });

	function checkScroll() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
		}
	}

	function updateSections() {
		var halfWindowHeight = $(window).height()/2,
			scrollTop = $(window).scrollTop();
		contentSections.each(function(){
			var section = $(this),
				sectionId = section.attr('id'),
				navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');
			( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) )
				? navigationItem.addClass('active')
				: navigationItem.removeClass('active');
		});
		scrolling = false;
	}
	
	function updateFixedSection(id) {
		var urlPath = String.format('url(img/topics/{0}.jpg', id);
		var idNumber = id.substr(7,1);
		var sectionHeader = "";
		
		debugger
		switch (parseInt(idNumber)) {
			default: 
				sectionHeader = "Default";
				break;
			case 2:
				sectionHeader = "About";
				$('#section2-content').removeClass("hover");
				$('#section2-content').toggleClass("hover");
				break; 
			case 3:
				sectionHeader = "Work";
				$('#section3-content').removeClass("hover");
				$('#section3-content').toggleClass("hover");
				break; 
			case 4:
				sectionHeader = "Contact";
				$('#section4-content').removeClass("hover");
				$('#section4-content').toggleClass("hover");
				break; 
		}
		
		// $('#right-image-fixed').css('background-image', urlPath);
		$('.trigger-headline').html( getSectionHeaderHtml(sectionHeader));
		// $('.snip1576').css('bottom', '95%');
		// $('.snip1576').trigger("mouseover");
		// $('.snip1576').toggleClass("hover");
		
	}
	
	function getSectionHeaderHtml(header) {
		var headerHtml = "";
		
		for (var x = 0; x < header.length; x++)
		{
			var c = header.charAt(x);
			headerHtml += String.format("<span>{0}</span>", c);
		}
		
		return headerHtml;
	}

	function smoothScroll(target) {
		// alert(target.attr('id'));
		// segmenter.animate();
		
		updateFixedSection(target.attr('id'));
		
		var	segmenter = new Segmenter(document.querySelector('#right-image-fixed'),	{
				pieces: 8,
				positions: [
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100},
					{top: 0, left: 0, width: 100, height: 100}
				],
				shadows: false,
				parallax: true,
				parallaxMovement: {min: 10, max: 30},
				animation: {
					duration: 2500,
					easing: 'easeOutExpo',
					delay: 0,
					opacity: .1,
					translateZ: {min: 10, max: 25}
				},
				onReady: function() {
					segmenter.animate();
					headline.classList.remove('trigger-headline--hidden');
					trigger.classList.remove('btn--hidden');
					trigger.addEventListener('click', function() {
						segmenter.animate();
						headline.classList.remove('trigger-headline--hidden');
						this.classList.add('btn--hidden');
					});
				},
				onAnimationComplete: function() { 
				// alert('hey');
				// $('.snip1576').toggleClass("hover");
				return false; 
				}
			});
		
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	500
        );
	}
	
	
});