# jCountdown - jQuery Countdown Plugin


##Current Version - 2.0.1

## Installation

### Bower

```
bower install jcountdown --save
```

### Download

Get any of the release from https://github.com/tomgrohl/jCountdown/releases


## Options

	template - Default: '%y %ty : %m %tm : %h %th : %i %ti : %s %ts'
		Main template.
		Time placeholders available: %y = years, %m = months, %w = weeks, %d = days, %h = hours, %i = minutes, %s = seconds
			e.g 2015
		Time Text placeholders available: %ty = years, %tm = months, %tw = weeks, %td = days, %th = hours, %ti = minutes, %ts = seconds
			e.g Years

	rtlTemplate - Default: '%ts %s : %ti %i : %th %h : %tm %m : %ty %y'
		Template for when isRTL is true

	dataAttr - Default null
		Can be used instead of date option when you want to specify the date on a data-* attribute on an element. 
		Just pass the name here.
		Example: If attribute is data-cdate, pass "cdate"
			
	date - Default: null
		(Must be a valid date string or Date object)

	offset - Default: null
		int or float (Offset in hours, can be used for setting countdown time to match server time)

	serverDiff - Default: null
		int (difference in servertime from end date/time in milliseconds.
		e.g (strtotime('2015-12-01') * 1000 ) - (time() * 1000 )

	digits - Default: [0,1,2,3,4,5,6,7,8,9]
		(Array of numbers used for digits in countdown)
		Example: Arabic would be ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
	
	direction - Default: "down"
		Countdown Direction, "down" for down to a date, and up for "up" from a date

	yearText - Default: 'years'
		Used by template
	
	monthText - Default: 'months'
		Used by template
	
	weekText - Default: 'weeks'
		Used by template
		
	dayText - Default: 'days'
		Used by template
		
	hourText - Default:  'hours'
		Used by template
		
	minText - Default:  'mins'
		Used by template
		
	secText - Default: 'sec'
		Used by template

	yearSingularText - Default: 'year'
		Used by template

	monthSingularText - Default: 'month'
		Used by template

	weekSingularText - Default: 'week'
		Used by template

	daySingularText - Default: 'day'
		Used by template

	hourSingularText - Default:  'hour'
		Used by template

	minText - Default:  'min'
		Used by template

	secText - Default: 'sec'
		Used by template

	yearsAndMonths - Default: false
		(Boolean. If set to true, jCountdown counts down the years/months as well)
	
	***The 3 options below shouldn't be used together***

	hoursOnly - Default: false
		(Boolean. If set to true, jCountdown ignores days left and add converts to hours and adds this to the hours left)
				
	minsOnly - Default: false
		(Boolean. If set to true, jCountdown ignores days/hours and add converts to minutes and adds this to the minutes left)
				
	secsOnly - Default: false
		(Boolean. If set to true, jCountdown ignores days/hours/minutes left and converts to seconds and adds this to seconds left)

	***The 3 options above shouldn't be used together***

	weeks - Default: false
		(Boolean. When set to true, after months left are calculated, weeks left will be calculated.)
	
	updateTime - Default: 1000
		(Interval in milliseconds when the Countdown should update the time)
	
	minus - Default: false
		(Boolean. Whether the Countdown should have to go into minus figures, especially when counting down to a date)

	onStart - Default: null
		(Callback function for when the Countdown first starts)
			
	onChange - Default: null
		(Callback function for when the Countdown time updates)

	onLocaleChange - Default: null
		(Callback function for when the Countdown locale is changed)	

	onComplete - Default: null
		(Callback function for when the Countdown time updates)

	onPause - Default: null
		(Callback function for when the Countdown Plugin is paused )

	onResume - Default: null
		(Callback function for when the Countdown Plugin is resumed from pause)

	leadingZero - Default: false
		(Boolean. Whether time values should have a leading zero for values < 10. e.g 09)

	omitZero - Default: false
		(When set to true, if one of the time values is 0, it will be hidden)   

	stopwatch - Default: false
		(Boolean. When set to true, when has countdown is resumed from being paused, it carries on from the date it paused at, not the date it resumes from.)
	
	isRTL - Default: false
		(Boolean). Set to true when using a Right-To-Left language

## Methods

	changeLocale - Accepts a string
	    Example: $("#time").countdown("changeLocale", "fr");

	changeSettings - Accepts an object map, the same as when first initialising the plugin
	    Example: $("#time").countdown("changeSettings", options);

	getSettings - Returns setting/settings from countdown plugin, as well as the timer
	    Example: var currentSettings = $("#time").countdown("getSettings");
	    Example: var dateSetting = $("#time").countdown("getSettings", "date");

	resume - Resumes the countdown, if previously pauses, otherwise this method does nothing
	    Example: $("#time").countdown("resume");

	pause - Pauses the countdown, simple as
	    Example: $("#time").countdown("pause");

	complete - Triggers the complete event and ends the countdown early. Also removes timer and unbinds any events.
	    Example: $("#time").countdown("complete");

	destroy - Removes timer and unbinds any events, puts the DOM Element back to its original HTML state
	    Example: $("#time").countdown("destroy");


	Settings you can access in all events through settings object:

	daysLeft
	hrsLeft
	minsLeft
	secLeft
	timer (id for Interval)
	offset
	updateTime
	hoursOnly (boolean)
	yearsAndMonths (boolean)
	date
	minus (boolean)
	htmlTemplate

## Events

You can bind/unbind to these events using .on and .off()
	
	- countStart
	- countChange
	- countComplete
	- countPause
	- countResume
	- localeChange

## Usage

```javascript

//Simple
$(document).ready(function(){
	$("#time").countdown({
	    "date" : "july 30, 2011"
	});
});
```

## License

This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2015 [Tom Ellis](http://www.webmuse.co.uk)
