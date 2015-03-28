var ShortcodeStopwatch = {
	setup: function($stopwatch) {
		var $actionPause = $stopwatch.find('.shortcode-stopwatch-actions-pause'),
			$actionStart = $stopwatch.find('.shortcode-stopwatch-actions-start'),
			$actionStop  = $stopwatch.find('.shortcode-stopwatch-actions-stop'),
			$timeHours   = $stopwatch.find('.shortcode-stopwatch-time-hours'),
			$timeMinutes = $stopwatch.find('.shortcode-stopwatch-time-minutes'),
			$timeSeconds = $stopwatch.find('.shortcode-stopwatch-time-seconds'),
			interval     = null,
			elapsedMs    = 0,
			previousDate = null,
			_elapseTime  = null,
			_interval    = null,
			_timeDisplay = null;

		_interval = function() {
			_elapseTime();
			_timeDisplay();
		};

		_elapseTime = function() {
			var currentDate = new Date();

			if(null !== previousDate) {
				elapsedMs = elapsedMs + (currentDate.getTime() - previousDate.getTime());
			}

			previousDate = currentDate;
		};

		_timeDisplay = function() {
			var hours, minutes, seconds, totalSeconds;

			totalSeconds = Math.round(elapsedMs / 1000);

			seconds = (totalSeconds % 60).toString();
			seconds = seconds.length < 2 ? '0' + seconds : seconds;

			minutes = (Math.floor(totalSeconds / 60 % 60)).toString();
			minutes = minutes.length < 2 ? '0' + minutes : minutes;

			hours   = (Math.floor(totalSeconds / 3600)).toString();
			hours   = hours.length < 2 ? '0' + hours : hours;

			$timeHours.text(hours);
			$timeMinutes.text(minutes);
			$timeSeconds.text(seconds);
		};

		$actionPause.click(function() {
			event.preventDefault();

			clearInterval(interval);
			_interval();

			interval     = null;
			previousDate = null;

			$actionPause.hide();

			$actionStart.show();
		});

		$actionStart.click(function(event) {
			event.preventDefault();

			_interval();
			interval = setInterval(_interval, 1000);

			$actionStart.hide();

			$actionPause.show();
			$actionStop.show();
		});

		$actionStop.click(function(event) {
			event.preventDefault();

			clearInterval(interval);

			elapsedMs    = 0;
			interval     = null;
			previousDate = null;

			_timeDisplay();

			$actionPause.hide();
			$actionStop.hide();

			$actionStart.show();
		});

		$actionPause.hide();
		$actionStop.hide();

		return $stopwatch;
	}
};

jQuery(document).ready(function($) {
	$('.shortcode-stopwatch').each(function(index, stopwatch) {
		var $stopwatch = $(stopwatch);

		ShortcodeStopwatch.setup($stopwatch);
	});
});
