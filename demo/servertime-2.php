<?php
# Set default timezone
//date_default_timezone_set('Europe/London');

date_default_timezone_set('America/Los_Angeles'); // 8 hours behind UTC

//echo -((date('Z') / -60) / 60); //8 hours behind

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>jCountdown - jQuery Countdown Plugin Demos</title>
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">
<link rel="stylesheet" href="css/reset.css" />
<link rel="stylesheet" href="css/style.css" />
<script src="js/jquery.js"></script>
<script src="../src/jquery.jcountdown.js"></script>
<script type="text/javascript">
$(document).ready(function() {

	<?php
	
	$date = "January 5, 2013 12:00:00";

	$server_time = (time() * 1000 );
	$server_time_end = (strtotime( $date ) * 1000 );
	
	$diff = $server_time_end - $server_time;

	?>
	
	$("#time").countdown({
		date: "<?php echo $date;?>",
		serverDiff: <?php echo $diff;?>
	});

});
</script>
</head>
<body>
	<header>
		<h1>jCountdown - jQuery Countdown Plugin Demos</h1>
	</header>
	<div>	
		<section id="demos" class="fix">
			<h2>Server Time Demo - PHP Method</h2>
			
			
			<p id="time" class="time"></p>
			
<pre>
&lt;?php

$date = "January 5, 2013 12:00:00";

$server_time = (time() * 1000 );
$server_time_end = (strtotime( $date ) * 1000 );

$diff = $server_time_end - $server_time;

?&gt;

$("#time").countdown({
	date: "&lt;?php echo $date;?&gt;",
	serverDiff: &lt;?php echo $diff;?&gt;
});	
</pre>
						
			

		</section>
	</div>
</body>
</html>