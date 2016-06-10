$(document).ready(function () {
	var $tip = $('.tip'),
			$tipText = $tip.find('.tip-text'),
			$tipA = $tip.find('a'),
			tipLink,
			counter = 0,
			stations = [
			{
				tipLink: 'h1 span:nth-child(3)',
				tipText: '1. The colours of the header are automatically generated based on the same colours as defined for the test itself.',
				size: 150
				},
			{
				tipLink: '#countdown',
				tipText: '2. A simple counter tells the user how many turns remain in the test.',
				size: 150
				},
			{
				tipLink: '#timer',
				tp: 'center',
				lp: 'center',
				tipText: '3. This is the all-important bit. This is the outcome of the test: how long does it take to actually name the right colours',
				size: 150
				},
			{
				tipLink: '#show',
				tipText: '4. Think big. This is the place where all the user\'s attention is focussed',
				size: 300
				},
			{
				tipLink: '#result-color',
				tipText: '5. Again, think big. The actual radio inputs are hidden and replace by a CSS :before on the label.',
				size: 200
				},
			{
				tipLink: '#explain .extra-padding',
				tipText: '6. This is my standard sign-off block. Please visit my playgraound at www.rayhyde.nl!',
				size: 200
				}
			];

	tipLink = stations[counter].tipLink;
	positionTip(tipLink);
	
	function positionTip(tipLink) {
		var el = $(tipLink),
				offset = el.offset(),
				elW = el.width(),
				elH = el.height(),
				posY = (offset.top - $(window).scrollTop()) + (elH / 2),
				posX = (offset.left - $(window).scrollLeft()) + (elW / 2),
				size = stations[counter].size,
				marginAdjust = (size / 2) * -1,
				th = $tip.find('.text').height();		

		$tipText.text(stations[counter].tipText);
		
		$tip.find('.spot').css({
				left: posX,
				top: posY,
				marginLeft: marginAdjust,
				marginTop: marginAdjust,
				width: size,
				height: size,
			});
		
		var ww = $(window).width(),
				wh = $(window).height(),
				textWidth = $tip.find('.text').width(),
				textHeight = $tip.find('.text').height();
		// switch the explanatory text to the other side if past window margin
		if ( (posX + size + textWidth) <= ww) {
			posX = posX + (size / 2);
		} else {			
			posX = posX - ((size/2) + textWidth);
		}
		
		// here the text is set back at the top of the page when it is too high
		if ( posY - (th / 2) < 0 ) {
			posY = 0;
		} else {
			posY = posY - (th / 2);
		}
		if ( (posY + textHeight) > wh ) {
			posY = wh - textHeight;
		} 
		
		$tip.find('.text').css({
			left: posX,
			top: posY,
		});
	}

	$tipA.click(function () {
		if ( $(this).hasClass('spotlight-again') ) {
			counter = 0;
			tipLink = stations[counter].tipLink;
			positionTip(tipLink);
			$tipA.removeClassClass('spotlight-again').text('Next');
		} else {
			counter++;
			if (counter < stations.length) {
				tipLink = stations[counter].tipLink;
				positionTip(tipLink);
				if (counter == stations.length - 1) {
					$tipA.addClass('spotlight-again').text('Again?');
				}
			}
		}

		return false;
	});
});