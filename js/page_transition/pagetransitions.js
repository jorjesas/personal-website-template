var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$iterate = $( '#button_display_events' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		// $pages.each( function() {
			// var $page = $( this );
			// $page.data( 'originalClassList', $page.attr( 'class' ) );
		// } );

		// $pages.eq( current ).addClass( 'pt-page-current' );

		// $( '#dl-menu' ).dlmenu( {
			// animationClasses : { in : 'dl-animate-in-2', out : 'dl-animate-out-2' },
			// onLinkClick : function( el, ev ) {
				// ev.preventDefault();
				// nextPage( el.data( 'animation' ) );
			// }
		// } );

		$iterate.on( 'click', function() {
			debugger
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67 ) {
				animcursor = 1;
			}
			nextPage2( animcursor );
			++animcursor;
		} );
		
		$("#back_to_main_page").on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67 ) {
				animcursor = 1;
			}
			previousPage2( animcursor );
			++animcursor;
		} );

	}
	
	function nextPage2(options ) {
		$(".section-content-details").css("height", "100%");
		$(".section-content-details").css("visibility", "visible");
		
	}
	
	function previousPage2(options ) {
		$(".section-content-details").css("height", "0vw");
		// $(".section-content-details").css("visibility", "hidden");
		
	}

	function nextPage(options ) {
		var animation = (options.animation) ? options.animation : options;
		// if( isAnimating ) {
			// return false;
		// }

		isAnimating = true;
		
		var $currPage = $("#main_page");
		// var $currPage = $("#events_page_details_1");
		var $nextPage = $("#events_page_details");

		outClass = 'pt-page-moveToRight';
		inClass = 'pt-page-moveFromLeft';
		
		$("#events_page_details").show();
		$(".cd-vertical-nav").hide();
		// $(".pt-page").css("background-color", "blue");
		$('html,body').scrollTop(0);
		$('html,body').scrollLeft(0);
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				// $currPage.show();
				$("#events_page_details").show();
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}
	
	function previousPage(options ) {
		var animation = (options.animation) ? options.animation : options;

		// if( isAnimating ) {
			// return false;
		// }

		// isAnimating = true;
		
		var $nextPage = $("#main_page");
		// var $currPage = $("#events_page_details_1");
		var $currPage = $("#events_page_details");

		outClass = 'pt-page-moveToLeft';
		inClass = 'pt-page-moveFromRight';
		
		$("#events_page_details").hide();
		$(".cd-vertical-nav").show();
		// window.location.href = "#section2";
		$('html,body').scrollLeft(0);
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};

})();