(function($) {
$.fn.countdown = function( method /*, options*/ ) {

	var slice = Array.prototype.slice,
		clear = window.clearInterval,
		floor = Math.floor,
		msPerHr = 3600000,
		secPerYear = 31556926,
		secPerMonth = 2629743.83,
		secPerWeek = 604800,
		secPerDay = 86400,
		secPerHr = 3600,
		secPerMin = 60,
		secPerSec = 1,
		local_number = function( numToConvert, settings ) {
			
			var arr = numToConvert.toString().match(/\d/g),
				localeNumber = "";
			
			$.each( arr, function(i,num) {
				num = Number(num);				
				localeNumber += (""+ settings.digits[num]) || ""+num;
			});
			
			return localeNumber;
		},
		generate_template = function( settings ) {
			
			var template = '',
				$parent = $('<div>'),
				$timeWrapElement = $("<"+settings.timeWrapElement+">").addClass( settings.timeWrapClass ),
				$textWrapElement = $("<"+settings.textWrapElement+">").addClass( settings.textWrapClass ),
				
				yearsLeft = settings.yearsLeft,
				monthsLeft = settings.monthsLeft,
				weeksLeft = settings.weeksLeft,
				daysLeft = settings.daysLeft,
				hrsLeft = settings.hrsLeft,
				minsLeft = settings.minsLeft,
				secLeft = settings.secLeft,
				
				hideYears = false,
				hideMonths = false,
				hideWeeks = false,
				hideDays = false,
				hideHours = false,
				hideMins = false,
				hideSecs = false,
				timeTasks = [];
						
			if( settings.omitZero ) {
				
				if( settings.yearsAndMonths ) {

					if( !settings.yearsLeft ) {
						hideYears = true;
					}
					if( !settings.monthsLeft ) {
						hideMonths = true;
					}				
				}
			
				if( settings.weeks && ( ( settings.yearsAndMonths && hideMonths && !settings.weeksLeft ) || ( !settings.yearsAndMonths && !settings.weeksLeft ) ) ) {	
					hideWeeks = true;
				}
			
				if( hideWeeks && !daysLeft ) {
					hideDays = true;
				}

				if( hideDays && !hrsLeft ) {
					hideHours = true;
				}
								
				if( hideHours && !minsLeft ) {
					hideMins = true;
				}
							
			}		
			
			if( settings.leadingZero ) {
				
				if( yearsLeft < 10 ) {
					yearsLeft = "0" + yearsLeft;
				}

				if( monthsLeft < 10 ) {
					monthsLeft = "0" + monthsLeft;
				}

				if( weeksLeft < 10 ) {
					weeksLeft = "0" + weeksLeft;
				}
				
				if( daysLeft < 10 ) {
					daysLeft = "0" + daysLeft;
				}
				
				if( hrsLeft < 10 ) {
					hrsLeft = "0" + hrsLeft;
				}
				
				if( minsLeft < 10 ) {
					minsLeft = "0" + minsLeft;
				}
				
				if( secLeft < 10 ) {
					secLeft = "0" + secLeft;
				}								
			}	
			
			yearsLeft = local_number( yearsLeft, settings );
			monthsLeft = local_number( monthsLeft, settings );
			weeksLeft = local_number( weeksLeft, settings );
			daysLeft = local_number( daysLeft, settings );
			hrsLeft = local_number( hrsLeft, settings );
			minsLeft = local_number( minsLeft, settings );
			
			
			//secLeft2 = local_number( secLeft, settings );
			secLeft = local_number( secLeft, settings );
			
			//console.log( secLeft2, secLeft );
			
			if( settings.yearsAndMonths ) {
								
				if( !settings.omitZero || !hideYears  ) {
					//$parent.append( $timeWrapElement.clone().html( yearsLeft + " " ) );
					//$parent.append( $textWrapElement.clone().html( settings.yearText  + " " ) );
					
					
					timeTasks.push(function() {
						$parent.append( $timeWrapElement.clone().html( yearsLeft + " " ) );
					});
					timeTasks.push(function() {
						$parent.append( $textWrapElement.clone().html( settings.yearText  + " " ) );	
					});
				}
				
				//Only hide months if years is at 0 as well as months
				if( !settings.omitZero || ( !hideYears && monthsLeft ) || ( !hideYears && !hideMonths )  ) {
					//$parent.append( $timeWrapElement.clone().html( monthsLeft + " " ) );
					//$parent.append( $textWrapElement.clone().html( settings.monthText + " " ) );
					
					timeTasks.push(function() {
						$parent.append( $timeWrapElement.clone().html( monthsLeft + " " ) );
					});
					timeTasks.push(function() {
						$parent.append( $textWrapElement.clone().html( settings.monthText + " " ) );						
					});
				}
			}
			
			if( settings.weeks && !hideWeeks ) {
				//$parent.append( $timeWrapElement.clone().html( weeksLeft + " " ) );
				//$parent.append( $textWrapElement.clone().html( settings.weekText + " " ) );
				
				timeTasks.push(function() {
					$parent.append( $timeWrapElement.clone().html( weeksLeft + " " ) );
				});
				timeTasks.push(function() {
					$parent.append( $textWrapElement.clone().html( settings.weekText + " " ) );
				});
			}

			if( !hideDays ) {
				timeTasks.push(function() {
					$parent.append( $timeWrapElement.clone().html( daysLeft + " " ) );
				});
				timeTasks.push(function() {
					$parent.append( $textWrapElement.clone().html( settings.dayText + " " ) );
				});
			}

			if( !hideHours ) {
				timeTasks.push(function() {
					$parent.append( $timeWrapElement.clone().html( hrsLeft + " " ) );
				});
				timeTasks.push(function() {
					$parent.append( $textWrapElement.clone().html( settings.hourText + " " ) );
				});
			}
			
			if( !hideMins ) {
				timeTasks.push(function() {
					$parent.append( $timeWrapElement.clone().html( minsLeft + " " ) );
				});
				timeTasks.push(function() {
					$parent.append( $textWrapElement.clone().html( settings.minText + " ") );
				});
			}
			
			timeTasks.push(function() {
				$parent.append( $timeWrapElement.clone().html( secLeft + " " ) );
			});
			
			timeTasks.push(function() {
				$parent.append( $textWrapElement.clone().html( settings.secText + " " ) );
			});
			
			if( settings.isRTL === true ) {
				timeTasks.reverse();
			}
			
			$.each( timeTasks, function(i,task ){
				task();
			});
			
			template = $parent.html();			
			
			return template;
		},
		dateNow = function( $this ) {
			var now = new Date(),
				settings = $this.data("jcdData");
			
			if( !settings ) {
				return new Date();
			}
			
			if( settings.offset !== null ) {
				now = getTZDate( settings.offset );
			} else {
				now = getTZDate( null, settings.difference ); //Date now
			}
			
			now.setMilliseconds(0);
			
			return now;
		},
		getTZDate = function( offset, difference ) {		
			var hrs,
				dateMS,
				curHrs,
				tmpDate = new Date();
			
			if( offset === null ) {
				dateMS = tmpDate.getTime() - difference;
			} else {				
				hrs = offset * msPerHr;
				curHrs = tmpDate.getTime() - ( ( -tmpDate.getTimezoneOffset() / 60 ) * msPerHr ) + hrs;
				dateMS = tmpDate.setTime( curHrs );
			}
			return new Date( dateMS );
		},			
		timerFunc = function() {
			//Function runs at set interval updating countdown
			var $this = this,
				template,
				now,
				date,
				timeLeft,
				yearsLeft = 0,
				monthsLeft = 0,
				weeksLeft = 0,
				daysLeft = 0,
				hrsLeft = 0,
				minsLeft = 0,
				secLeft = 0,
				time = "",
				diff,
				extractSection = function( numSecs ) {
					var amount;
	
					amount = floor( diff / numSecs );
					diff -= amount * numSecs;
					
					return amount;
				},
				settings = $this.data("jcdData");
				
			if( !settings ) {
				return false;
			}
			
			template = settings.htmlTemplate;
			now = dateNow( $this );
			
			if( settings.servertime !== null ) {
				date = new Date( settings.servertimeEnd - settings.servertime + settings.clientdateNow.getTime() );
				date.setMilliseconds(0);
			} else {
				//date = new Date( settings.dateObj ); //Date to countdown to
				date = settings.dateObj; //Date to countdown to
				date.setMilliseconds(0);
			}
			
			//console.log( date );
			
			timeLeft = ( settings.direction === "down" ) ? date.getTime() - now.getTime() : now.getTime() - date.getTime();
					
			diff = Math.round( timeLeft / 1000 );

			daysLeft = extractSection( secPerDay );			
			hrsLeft = extractSection( secPerHr );			
			minsLeft = extractSection( secPerMin );
			secLeft = extractSection( secPerSec );
												
			if( settings.yearsAndMonths ) {

				//Add days back on so we can calculate years easier
				diff += ( daysLeft * secPerDay );
				
				yearsLeft = extractSection( secPerYear );				
				monthsLeft = extractSection( secPerMonth );				
				daysLeft = extractSection( secPerDay );
			}

			if( settings.weeks ) {
				//Add days back on so we can calculate weeks easier				
				diff += ( daysLeft * secPerDay );

				weeksLeft = extractSection( secPerWeek );
				daysLeft = extractSection( secPerDay );
			}
						
			//Assumes you are using dates within a month 
			//as years and months aren't taken into account
			if( settings.hoursOnly ) {
				hrsLeft += daysLeft * 24;
				daysLeft = 0;
			}
			
			//Assumes you are only using dates in the near future 
			//as years and months aren't taken into account
			if( settings.minsOnly ) {
				minsLeft += ( hrsLeft * 60 ) + ( ( daysLeft * 24 ) * 60 );
				daysLeft = hrsLeft = 0;
			}

			//Assumes you are only using dates in the near future 
			//as years, months and days aren't taken into account
			if( settings.secsOnly ) {
				secLeft += ( minsLeft * 60 );
				daysLeft = hrsLeft = minsLeft = 0;
			}
						
			settings.yearsLeft = yearsLeft;
			settings.monthsLeft = monthsLeft;
			settings.weeksLeft = weeksLeft;
			settings.daysLeft = daysLeft;
			settings.hrsLeft = hrsLeft;
			settings.minsLeft = minsLeft;
			settings.secLeft = secLeft;
			
			
			//console.log( settings );
			
			if ( ( settings.direction === "down" && ( now < date || settings.minus ) ) || ( settings.direction === "up" && ( date < now || settings.minus )  ) ) {
				time = generate_template( settings );
			} else {
				settings.yearsLeft = settings.monthsLeft = settings.weeksLeft = settings.daysLeft = settings.hrsLeft = settings.minsLeft = settings.secLeft = 0;
								
				time = generate_template( settings );
				settings.hasCompleted = true;
			}
							
			$this.html( time ).triggerMulti("change.jcdevt,countChange", [settings]);
			
			if ( settings.hasCompleted ) {
				$this.triggerMulti("complete.jcdevt,countComplete");
				clear( settings.timer );
			}
			
			$this.data("jcdData", settings);
		},			
		methods = {		
			init: function( options ) {
				
				var opts = $.extend( {}, $.fn.countdown.defaults, options ),
					local = null,
					testDate,
					testString;
				
				return this.each(function() {
					var $this = $(this),
						settings = {},
						func;

					//If this element already has a countdown timer, just change the settings
					if( $this.data("jcdData") ) {
						$this.countdown("changeSettings", options, true);
						opts = $this.data("jcdData");
					}
					//console.log( opts.dataAttr );
					
					if( opts.date === null && opts.dataAttr === null ) {
						$.error("No Date passed to jCountdown. date option is required.");
						return true;
					}
					
					if( opts.date ) {					
						testString = opts.date;
					} else {
						testString = $this.data(opts.dataAttr);
					}
					
					//console.log( testString );
					
					testDate = new Date(testString);
					
					if( testDate.toString() === "Invalid Date" ) {
						$.error("Invalid Date passed to jCountdown: " + testString);
					}
					
					testDate = null;
					
					//Add event handlers where set
					if( opts.onChange ) {
						$this.on("change.jcdevt", opts.onChange );
					}
					
					if( opts.onComplete ) {
						$this.on("complete.jcdevt", opts.onComplete );
					}
					
					if( opts.onPause ) {
						$this.on("pause.jcdevt", opts.onPause );
					}

					if( opts.onResume ) {
						$this.on("resume.jcdevt", opts.onResume );
					}
					
					settings = $.extend( {}, opts );
					
					//if( !settings.clientdateNow ) {
					settings.clientdateNow = new Date();
					settings.clientdateNow.setMilliseconds(0);
					//} else {
						
					//}
					
					settings.originalHTML = $this.html();
					settings.dateObj = new Date( testString );
					settings.dateObj.setMilliseconds(0);
					
					settings.hasCompleted = false;
					settings.timer = 0;
					settings.yearsLeft = settings.monthsLeft = settings.weeksLeft = settings.daysLeft = settings.hrsLeft = settings.minsLeft = settings.secLeft = 0;
					settings.difference = null;
					
					testString = null;
					
					if( opts.servertime !== null ) {
						var tempTime;
						local = new Date();
						local.setMilliseconds(0);
						
						tempTime = ( $.isFunction( settings.servertime ) ) ? settings.servertime() : settings.servertime;
						
						settings.difference = local.getTime() - tempTime;
						
						tempTime = null;
					}

					func = $.proxy( timerFunc, $this );
					settings.timer = setInterval( func, settings.updateTime );

					$this.data( "jcdData", settings );
					
					func();
				});
			},
			changeSettings: function( options, internal ) {
				//Like resume but with resetting/changing options				
				return this.each(function() {
					var $this  = $(this),
						settings,
						testDate,
						func = $.proxy( timerFunc, $this );
						
					if( !$this.data("jcdData") ) {
						return true;
					}
					
					settings = $.extend( {}, $this.data("jcdData"), options );

					if( options.hasOwnProperty("date") ) {
						testDate = new Date(options.date);
						
						if( testDate.toString() === "Invalid Date" ) {
							$.error("Invalid Date passed to jCountdown: " + options.date);
						}
					}
					
					settings.completed = false;
					settings.dateObj  = new Date( options.date );
					
					//Clear the timer, as it might not be needed
					clear( settings.timer );					
					$this.off(".jcdevt").data("jcdData", settings);	
					
					//As this can be accessed via the init method as well,
					//we need to check how this method is being accessed
					if( !internal ) {
						
						if( settings.onChange ) {
							$this.on("change.jcdevt", settings.onChange);
						}

						if( settings.onComplete ) {
							$this.on("complete.jcdevt", settings.onComplete);
						}
				
						if( settings.onPause ) {
							$this.on("pause.jcdevt", settings.onPause );
						}

						if( settings.onResume ) {
							$this.on("resume.jcdevt", settings.onResume );
						}
				
						settings.timer = setInterval( func, settings.updateTime );
						$this.data("jcdData", settings);
						func(); //Needs to run straight away when changing settings
					}
					
					settings = null;
				});
			},
			resume: function() {			
				//Resumes a countdown timer
				return this.each(function() {
					var $this = $(this),
						settings = $this.data("jcdData"),
						func = $.proxy( timerFunc, $this );
					
					if( !settings ) {
						return true;
					}

					$this.data("jcdData", settings).trigger("resume.jcdevt", [settings] ).trigger("countResume", [settings] );
					//We only want to resume a countdown that hasn't finished
					if( !settings.hasCompleted ) {
						settings.timer = setInterval( func, settings.updateTime );						
																		
						if( settings.stopwatch && settings.direction === "up" ) {

							var t = dateNow( $this ).getTime() - settings.pausedAt.getTime(),
								d = new Date();
							d.setTime( settings.dateObj.getTime() + t );
							
							settings.dateObj = d; //This is internal date
						}					
						
						func();
					}
				});
			},
			pause: function() {	
				//Pause a countdown timer			
				return this.each(function() {
					var $this = $(this),
						settings = $this.data("jcdData");

					if( !settings ) {
						return true;
					}
					
					if( settings.stopwatch ) {
						settings.pausedAt = dateNow( $this );
					}
					//Clear interval (Will be started on resume)
					clear( settings.timer );
					//Trigger pause event handler
					$this.data("jcdData", settings).triggerMulti("pause.jcdevt,countPause", [settings] );		
				});
			},
			complete: function() {
				return this.each(function() {
					var $this = $(this),
						settings = $this.data("jcdData");

					if( !settings ) {
						return true;
					}
					//Clear timer
					clear( settings.timer );
					settings.hasCompleted = true;
					//Update setting, trigger complete event handler, then unbind all events
					//We don"t delete the settings in case they need to be checked later on

					$this.data("jcdData", settings).triggerMulti("complete.jcdevt,countComplete", [settings]).off(".jcdevt");
					
				});		
			},
			destroy: function() {
				return this.each(function() {
					var $this = $(this),
						settings = $this.data("jcdData");
					
					if( !settings ) {
						return true;
					}
					//Clear timer
					clear( settings.timer );
					//Unbind all events, remove data and put DOM Element back to its original state (HTML wise)
					$this.off(".jcdevt").removeData("jcdData").html( settings.originalHTML );
				});
			},
			getSettings: function( name ) {
				var $this = $(this),
					settings = $this.data("jcdData");
				
				//If an individual setting is required
				if( name && settings ) {
					//If it exists, return it
					if( settings.hasOwnProperty( name ) ) {
						return settings[name];
					}
					return undefined;
				}
				//Return all settings or undefined
				return settings;
			},
			changeLocale: function( locale ) {
				var $this = $(this),
					settings = $this.data("jcdData");
				
				// If no locale exists error and return false
				if( !$.fn.countdown.locale[locale] ) {
					$.error("Locale '" + locale + "' does not exist");
					return false;
				}
					
				$.extend( settings, $.fn.countdown.locale[locale] );
				
				$this.data("jcdData", settings);
				return true;
			}
		};
	
	if( methods[ method ] ) {
		return methods[ method ].apply( this, slice.call( arguments, 1 ) );
	} else if ( typeof method === "object" || !method ) {
		return methods.init.apply( this, arguments );
	} else {
		$.error("Method "+ method +" does not exist in the jCountdown Plugin");
	}
};




$.fn.countdown.defaults = {
	date: null,
	dataAttr: null,
	updateTime: 1000,			
	yearText: 'years',
	monthText: 'months',
	weekText: 'weeks',
	dayText: 'days',
	hourText: 'hours',
	minText: 'mins',
	secText: 'sec',
	digits : [0,1,2,3,4,5,6,7,8,9],
	timeWrapElement: 'span',
	textWrapElement: 'span',
	timeWrapClass: '',
	textWrapClass: 'cd-time',
	timeSeparator: '',
	isRTL: false,
	minus: false,
	onChange: null,
	onComplete: null,
	onResume: null,
	onPause: null,
	leadingZero: false,
	offset: null,
	servertime:null,
	hoursOnly: false,
	minsOnly: false,
	secsOnly: false,
	weeks: false,
	hours: false,
	yearsAndMonths: false,
	direction: "down",
	stopwatch: false,
	omitZero: false
};


$.fn.countdown.locale = [];

/*

i10n
$.fn.countdown.locale = [];
$.fn.countdown.locale['en'] = {
	yearText: 'years',
	monthText: 'months',
	weekText: 'weeks',
	dayText: 'days',
	hourText: 'hours',
	minText: 'mins',
	secText: 'sec',
	timeSeparator: ':', 
	isRTL: false
};

$.extend( $.fn.countdown.defaults, $.fn.countdown.locale['en'] );

*/

$.fn.triggerMulti = function( eventTypes, extraParameters ) {
	var events = eventTypes.split(",");
		
	return this.each(function() {
		var $this = $(this);

		for( var i = 0; i < events.length; i++) {
			$this.trigger( events[i], extraParameters );
		}	
	});
};

})(jQuery);