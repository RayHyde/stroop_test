$(document).ready(function () {
	var colorText, colorHue, colorName, colorCode, clicked, buttonCounter = 0,
		counter = 0,
		//		colors = ['blue', 'red', 'green', 'pink', 'brown', 'orange', 'yellow'],
		ticker = 0,
		timerMin, timerSec,

		colors = [
			{
				'name': 'blue',
				'nl_name': 'blauw',
				'hue': 'blue',
				'code': 'slateblue'
			},
			{
				'name': 'red',
				'nl_name': 'rood',
				'hue': 'red',
				'code': 'red'
			},
			{
				'name': 'green',
				'nl_name': 'groen',
				'hue': 'green',
				'code': 'forestgreen'
			},
			{
				'name': 'pink',
				'nl_name': 'roze',
				'hue': 'pink',
				'code': 'neonpink'
			},
			{
				'name': 'brown',
				'nl_name': 'bruin',
				'hue': 'brown',
				'code': 'cinnamon'
			},
			{
				'name': 'orange',
				'nl_name': 'oranje',
				'hue': 'orange',
				'code': 'orange'
			},
			{
				'name': 'yellow',
				'nl_name': 'geel',
				'hue': 'yellow',
				'code': 'gold'
			}
		];

	for (var i = 0; i < colors.length; i++) {
		var effe;
		if ($('html').attr('lang') == 'nl') {
			effe = colors[i].nl_name;
			$('#question').text('Wat is de werkelijke kleur van het woord?');
		} else {
			effe = colors[i].name;
		}
		$('#result-color').append('<li><input type="radio" name="resultColor" id="' + colors[i].name + '"><label for="">' + effe + '</label></li>');
	}

	function timer() {
		ticker++;
		timerMin = Math.floor(ticker / 60);
		timerSec = ticker - timerMin * 60;
		$('#timer').text(timerMin + " min, " + timerSec + ' sec');
	}

	function showColors() {
		var effe = Math.floor(Math.random() * colors.length);
		colorText = colors[effe].name;
		var colorTextNl = colors[effe].nl_name;
		colorHue;

		function makeHue() {
			var effe = Math.floor(Math.random() * colors.length);
			colorName = colors[effe].hue;
			colorCode = colors[effe].code;

			while (colorText == colorName) {
				makeHue();
			}
		}
		makeHue();
		if ($('html').attr('lang') == 'nl') {
			$('#show').text(colorTextNl).css('color', colorCode);
		} else {
			$('#show').text(colorText).css('color', colorCode);
		}

	}
	showColors();

	$('#result-color li').click(function () {
		clicked = $(this).find('input').attr('id');
		if (clicked == colorName) {
			showColors();
			counter++;
			if (counter == 5) {
				clearInterval(timer);
				$('#result-color').fadeOut();
				$('#result').fadeIn();
			}
		}
	});

	setInterval(function () {
		timer();
	}, 1000);


});