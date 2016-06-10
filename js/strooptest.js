/* ----------------------------------------------------------------------
* File name:		strooptest.js
* Version:			1.0
* Description:	generate a Stroop test
* Website:			www.rayhyde.nl
* Version:			6-1-2016
* Author:				Ray Hyde - www.rayhyde.nl
---------------------------------------------------------------------- */


$(document).ready(function () {
	var colorText, colorName, colorCode, clicked, timerMin, timerSec, realColor, nre, effe, countdown,
			counter = 0,
			testLength = 20,
			ticker = 0,

			colors = [
				{
					'name': 'blue',
					'code': 'slateblue'
				},
				{
					'name': 'green',
					'code': 'forestgreen'
				},
				{
					'name': 'orange',
					'code': 'darkorange'
				},
				{
					'name': 'pink',
					'code': 'hotpink'
				},
				{
					'name': 'red',
					'code': 'red'
				},
				{
					'name': 'yellow',
					'code': 'gold'
				}
			];

	countdown = testLength;
	$('#countdown').text(countdown + ' words left');
	// first create a list of checkboxes from the colors object 
	for (var i = 0; i < colors.length; i++) {
		effe = colors[i].name;
		$('#result-color').append('<li class="col-xs-12 col-sm-6 col-md-4"><input type="radio" name="resultColor" id="' + colors[i].name + '"><label for="">' + effe + '</label></li>');
	}
	// colorize the header
	var $h1 = $('h1');
	var h1 = $h1.text().split(' ')[0].split('');
	$h1.text('');
	
	for ( var i=0;i< h1.length;i++ ) {
		$h1.append('<span style="color: '+colors[i].code +'">'+ h1[i] + '</span>');
		
	}
	$h1.append(' Test');
	
	// make the white wrapper stay the same height, that looks nicer
	$('.wrap').height($('.wrap').height());
	
	// this is the stopwatch
	function timer() {
		ticker++;
		timerMin = Math.floor(ticker / 60);
		timerSec = ticker - timerMin * 60;
		$('#timer').text(timerMin + " min, " + timerSec + ' sec');
	}

	// this makes the big coloured word
	function showColors() {
		effe = Math.floor(Math.random() * colors.length);
		colorText = colors[effe].name;

		function makeHue() {
			effe = Math.floor(Math.random() * colors.length);
			colorName = colors[effe].name;
			colorCode = colors[effe].code;
			
			// make sure the colour if the word is different from its text: 
			while (colorText == colorName) { 
				makeHue();
			}
		}
		makeHue();
		
		$('#show').text(colorText).attr('data-realcolor', colorName).css('color', colorCode);
	}
	function start() {
		showColors();
		nre = setInterval(timer, 1000);
	}
	start();

	// this happens when a checkbox is clicked
	$('#result-color li').click(function () {
		clicked = $(this).find('input').attr('id');
		var realColor = $('#show').attr('data-realcolor');
		
		// if the right one is clicked:
		if (clicked == realColor) {
			counter++;
			countdown--;
			if ( countdown == 1) {
				$('#countdown').text(countdown + ' word left');
			} else {
				$('#countdown').text(countdown + ' words left');				
			}
			
			// check if we are at the end of the test
			if (counter == testLength) {
				// stop the timer
				clearInterval(nre); 
				
				// then hide the test itself
				$('#result-color, #question, #show, .header-info').fadeOut();
				
				// then show the results
				$('#result .done').html('<h2>Done! It took you '+ $('#timer').text() + ' to name '+ testLength + ' colours.</h2>');
				$('#result').fadeIn();
			} else {
				showColors();
			}
		}
	});
	
	$('.again').click(function() {
		('#countdown, #timer').text('');
		$('#result').fadeOut();
		$('#result-color, #question, #show, .header-info').fadeIn();
		start();
	});

});