module("jCountdown - jQuery Countdown Plugin");

var temp,
	pastDate,
	futureDate,
	future60Date,
	newSettings,
	settings,
	events;
	
$.fn.countdown.locale['de'] = {
	yearText: 'Jahre',
	monthText: 'Monate',
	weekText: 'Wochen',
	dayText: 'Tage',
	hourText: 'Stunden',
	minText: 'Minuten',
	secText: 'Sekunden',
	timeSeparator: ':', 
	isRTL: false
};

$.fn.countdown.locale['fr'] = {
	yearText: 'Années',
	monthText: 'Mois',
	weekText: 'Semaines',
	dayText: 'Jours',
	hourText: 'Heures',
	minText: 'Minutes',
	secText: 'Secondes',
	timeSeparator: ':', 
	isRTL: false
};
		
asyncTest("Events Fire", 6, function() {
	
	var $test = $("#test"),
	temp = new Date(),
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) ), //1 day in the past
	futureDate = new Date( temp.getTime() + ( 1000 ) );
	
	$test.countdown({
		date: pastDate,
		onStart: function( event, timer ) {
			ok( true, "Start Event Fired" );
		},
		onChange: function( event, timer ) {
			ok( true, "Change Event Fired" );
		},
		onPause: function( event ) {
			ok( true, "Paused Event Fired" );
		},
		onResume: function( event ) {
			ok( true, "Resumed Event Fired" );
		},	
		onComplete: function() {
			ok( true, "Complete Event Fired" );
			start();
		},
		onLocaleChange: function() {
			ok( true, "Locale Event Fired" );
			start();
		},
		leadingZero: true
	}).countdown('pause').countdown('resume').countdown('changeLocale', 'fr');
	
		
});

asyncTest("$('elem').on Events Fire", 6, function() {
	
	var $test = $("#test");
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) ); //1 day in the past
	futureDate = new Date( temp.getTime() + ( 1000 ) );
	
	$test.on("countStart", function() {
		ok( true, "countStart Event Fired" );
	}).on("countChange", function() {
		ok( true, "countChange Event Fired" );
	}).on("countResume", function() {
		ok( true, "countResume Event Fired" );
	}).on("countResume", function() {
		ok( true, "countResume Event Fired" );
	}).on("localeChange", function() {
		ok( true, "localeChange Event Fired" );
	}).on("countComplete", function() {
		ok( true, "countComplete Event Fired" );
		start();
	});
	
	$test.countdown({
		date: pastDate,
		leadingZero: true
	}).countdown('pause').countdown('resume').countdown('changeLocale', 'fr');
	
});

asyncTest("Triggering Events Fire", 2, function() {
	
	var $test = $("#test");
	
	$test.off("countComplete").countdown("destroy");
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) ); //1 day in the past
	futureDate = new Date( temp.getTime() + ( 3600 * 24  * 1000 ) ); //1 day in the future
	
	$test.on("countComplete", function() {
		ok( true, "countComplete Event Fired" );
		//start();
	});
	
	/*
	$test.on("countStart", function() {
		ok( true, "countStart Event Fired" );
	}).on("countChange", function() {
		ok( true, "countChange Event Fired" );
	}).on("countResume", function() {
		ok( true, "countResume Event Fired" );
	}).on("countResume", function() {
		ok( true, "countResume Event Fired" );
	}).on("localeChange", function() {
		ok( true, "localeChange Event Fired" );
	}).on("countComplete", function() {
		ok( true, "countComplete Event Fired" );
		start();
	});
	*/
	
	$test.countdown({
		date: futureDate,
		leadingZero: true,	
		onComplete: function() {
			ok( true, "Complete Event Fired" );
			start();
		},
	});
	
	
	//$test.countdown('complete');
	
	$test.trigger('complete');
	$test.trigger('countComplete');
	
	
});


asyncTest("Change Settings", 3, function() {
	
	$("#test").countdown('destroy');
	
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) ); //1 day in the past
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	$("#test").countdown({
		date: futureDate
	});

	$("#test").countdown('changeSettings',{
		date : futureDate,
		onComplete: function( event ) {
			$(this).html("Completed");
			ok( true, "Completed Event Fired after changeSettings method ran" );
			equal( $("#test").html(), "Completed", "returns proper value after change" );
			start();
		}
	});
	
	newSettings =  $("#test").countdown('getSettings');
	equal( newSettings.date, futureDate, "Settings changed successfully" );

});


test("Destroy Instance", 3, function() {

	temp = new Date();
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	$("#test").countdown({
		date: futureDate
	}).countdown('destroy');


	settings =  $("#test").countdown('getSettings');
			
	equal( settings, undefined, "Settings were removed" );
	
	events =  $("#test").data('events.jcdData');
	
	equal( events, undefined, "Events were removed" );
	
	equal( $("#test").html(), "Original Content", "Original content is put back after instance has been destroyed" );
	
	
});


asyncTest("Advanced Options - secOnly", 1, function() {
	
	temp = new Date();
	//1 sec into future
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	//1 day in the past
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) );
	
	future60Date = new Date( temp.getTime() + ( 60000 ) );
	
	$("#test").countdown({
		date: future60Date,
		secsOnly: true,
		onChange: function( e,settings ) {
			equal( settings.secLeft, 60, "Returns correct number of seconds when secsOnly option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});

	
});

asyncTest("Advanced Options - minsOnly", 1, function() {
	temp = new Date();
	future60Date = new Date( temp.getTime() + ( 60000 * 2 ) ); //60 secs * 2 minutes
	
	$("#test").countdown({
		date: future60Date,
		minsOnly: true,
		onChange: function( e,settings ) {
			equal( settings.minsLeft, 2, "Returns correct number of minutes when minsOnly option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});	
		
});

asyncTest("Advanced Options - hoursOnly", 1, function() {

	temp = new Date();
	future60Date = new Date( temp.getTime() + ( 3600 * 24  * 2000 ) ); //1 hour * 24 hours * 2 days
	//.setMilliseconds(0);
	
	$("#test").countdown({
		date: future60Date,
		hoursOnly: true,
		onChange: function( e,settings ) {
			equal( settings.hrsLeft, 48, "Returns correct number of hours when hoursOnly option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});	
		
});

	
asyncTest("Advanced Options - yearsAndMonths: Future Date", 2, function() {
	
	temp = new Date();
	//1 hour * 24 hours * 364 days * 2 years + 32 days
	future60Date = new Date( temp.getTime() + ( ( 86400 * 365000 * 2 ) + ( 86400 * 32000 ) ) );
	
	//console.log( future60Date );
	
	$("#test").countdown({
		date: future60Date,
		yearsAndMonths: true,
		onChange: function( e,settings ) {
			equal( settings.yearsLeft, 2, "Returns correct number of years when yearsAndMonths option is used" );
			equal( settings.monthsLeft, 1, "Returns correct number of months when yearsAndMonths option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});
		
});

asyncTest("Advanced Options - yearsAndMonths : Past Date", 2, function() {
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 2629743.83 * 11000 ) ); //11 months ago
	
	//pastDate.setTime( 126192080000 );
	//126192080000
	
	//console.log( future60Date );
	
	$("#test").countdown({
		date: pastDate,
		direction: "up",
		yearsAndMonths: true,
		onChange: function( e,settings ) {
			equal( settings.yearsLeft, 0, "Returns correct number of years when yearsAndMonths option is used" );
			equal( settings.monthsLeft, 10, "Returns correct number of months when yearsAndMonths option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});
		
});


asyncTest("Advanced Options - weeks", 1, function() {

	
	temp = new Date();
	//temp.setMonth( temp.getMonth() - 1);
	
	temp.setTime( temp.getTime() - ( 3600 * 24 * 28000 ) ); // 4 Weeks ago
	
	//temp.setDate(1);
		
	//servertime = new Date(2012, 1, 1, 0, 0, 0, 0); //Use February as this has < 30 days
	
	//serverMilliseconds = servertime.getTime();
	
	//date = new Date( servertime.getTime() + ( 3600 * 24 * 28000 ) ); //1 hour * 24 hours * 30 days
	
	
	
	$("#test").countdown({
		date: temp,
		direction: "up",
		//clientdateNow: new Date( serverMilliseconds ),
		//servertime: serverMilliseconds,
		weeks: true,
		onChange: function( e,settings ) {
			
			//console.log( settings );
			
			equal( settings.weeksLeft, 4, "Returns correct number of weeks when weeks option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});	
		
});


asyncTest("Advanced Options - stopwatch", 3, function() {
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 2629743.83 * 11000 ) ); //11 months ago
	
	var $test = $("#test"),
		hours;
	
	$("#test").countdown({
		date: pastDate,
		onPause: function( event ) {
			ok( true, "Paused Event Fired" );
		},
		onResume: function( event, s ) {
			ok( $test.countdown('getSettings').hrsLeft === hours, 'Hours left is correct');
			ok( true, "Resumed Event Fired" );
			start();
		}
	});
	
	$test.countdown('pause');
	
	hours = $test.countdown('getSettings').hrsLeft;
	//console.log( hours );
	
	setTimeout(function(){
		$test.countdown('resume');
	}, 2000)
		
});


test("Locale", 2, function() {
	
	var $test = $("#test"),
		temp = new Date(),
		future60Date = new Date( temp.getTime() + ( 60000 * 2 ) ); //60 secs * 2 minutes

	
	$.extend( $.fn.countdown.defaults, $.fn.countdown.locale['de'] );
		
	$test.countdown({
		date: future60Date
	});	
	
	ok( $test.countdown('getSettings').yearText === $.fn.countdown.locale['de'].yearText, 'Locale text has been set');
	
	
	
	$test.countdown('changeLocale', 'fr');
	
	ok( $test.countdown('getSettings').yearText === $.fn.countdown.locale['fr'].yearText, 'Locale text has been changed');
	
	//start();
		
});


test("omitZero Option", 1, function() {
	
	var $test = $("#test"),
		temp = new Date(),
		past60Date = new Date( temp.getTime() - ( 60000 * 2 ) ); //Date in past, so countdown completes
		
	$test.countdown({
		date: past60Date,
		omitZero: true
	});
	
	ok( $test.countdown('getSettings').omitZero === true, 'omitZero is set correctly');
		
});



test("isRTL - Right to Left", 1, function() {
	
	var $test = $("#test"),
		temp = new Date(),
		future60Date = new Date( temp.getTime() + ( 60000 * 2 ) ); //60 secs * 2 minutes
		
	$test.countdown({
		date: future60Date,
		isRTL: true
	});
	
	ok( $test.countdown('getSettings').isRTL === true, 'isRTL is set correctly');
		
});
