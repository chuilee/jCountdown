/* 
* jCountdown 1.4.2 jQuery Plugin
* Copyright 2012 Tom Ellis http://www.webmuse.co.uk | MIT Licensed (license.txt)
*/
(function($) {
$.fn.countdown = function( method /*, options*/ ) {

	var defaults = {
			date: null,
			updateTime: 1E3,
			htmlTemplate: "%d <span class='cd-time'>days</span> %h <span class='cd-time'>hours</span> %i <span class='cd-time'>mins</span> %s <span class='cd-time'>sec</span>",
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
			hours: false,
			yearsAndMonths: false,
			direction: "down"
		},
		slice = [].slice,
		clear = window.clearInterval,
		floor = Math.floor,
		ceil = Math.ceil,
		msPerHr = 36E5,
		msPerDay = 864E5,
		rDate = /(%y|%m|%d|%h|%i|%s)/g,
		rYears = /%y/,
		rMonths = /%m/,
		rDays = /%d/,
		rHrs = /%h/,
		rMins = /%i/,
		rSecs = /%s/,
		Y = 0, // Years
		O = 1, // Months
		//W = 2, // Weeks
		D = 2, // Days
		H = 3, // Hours
		M = 4, // Minutes
		S = 5, // Seconds
		getDaysInMonth = function(year, month) {
			return 32 - new Date(year, month, 32).getDate();
		},
		getSecs = function(date) {
			return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
		},
		getTZDate = function( offset, difference ) {					
			
			var hrs,
				dateMS,
				extra,
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
				yearsLeft,
				monthsLeft,
				eDaysLeft,
				daysLeft,
				eHrsLeft,
				hrsLeft,
				minsLeft,					
				eMinsleft,
				secLeft,
				time = "",
				diff,
				timeSections = [0,0,0,0,0,0,0],
				/*
				timeSections = {
					"years" : 0,
					"months" : 0,
					"days" : 0,
					"hours" : 0,
					"minutes" : 0,
					"seconds" : 0
				},
				timeMax = {
					"years" : 1,
					"months" : 12,
					"days" : 30, //May change
					"hours" : 24,
					"minutes" : 60,
					"seconds" : 60
				},
				*/
				extractPeriod = function( numSecs ) {
					var amount;
	
					amount = Math.floor(diff / numSecs);
					diff -= amount * numSecs;
					
					return amount;
				},
				settings = $this.data("jcdData");
				
			if( !settings ) {
				return false;
			}
			
			template = settings.htmlTemplate;
			
			if( settings.offset === null && settings.servertime === null ) {
				now = new Date();
			} else if( settings.offset !== null ) {
				now = getTZDate( settings.offset );
			} else {
				now = getTZDate( null, settings.difference ); //Date now
			}
			
			
			now.setMilliseconds(0);
			
			date = new Date( settings.date ); //Date to countdown to
			
			date.setMilliseconds(0);
			
			timeLeft = ( settings.direction === "down" ) ? date.getTime() - now.getTime() : now.getTime() - date.getTime();
			
			//console.log( timeLeft );
			
			//Was: diff = floor( timeLeft / 1000 ); wasn't accurate enough
			diff = Math.round( timeLeft / 1000 );
			

			daysLeft = extractPeriod( 86400 );
			timeSections[D] = daysLeft;
			//timeSections.days = daysLeft;
			
			//console.log( floor( daysLeft * 0.00273790926 ) );

			hrsLeft = extractPeriod( 3600 );
			timeSections[H] = hrsLeft;
			//timeSections.hours = daysLeft;
			
			minsLeft = extractPeriod( 60 );
			timeSections[M] = minsLeft;

			secLeft = extractPeriod( 1 );
			timeSections[S] = secLeft;
			//console.log( daysLeft, hoursLeft, minsLeft, secLeft );
			
			//console.log( diff );
			
			/*
			secLeft = diff % 60;
			diff = floor( diff / 60 );
			
			minsLeft = diff % 60;
			diff = floor( diff / 60 );
			
			hrsLeft = diff % 24;
			diff = floor( diff / 24 ); // days left
			*/
			
			//console.log( floor( (timeLeft / 1000) / diff ) );
			
			/*
			
			var months = Math.max(0,
							(date.getFullYear() - now.getFullYear()) * 12 + date.getMonth() - now.getMonth() +
							((date.getDate() < now.getDate() && !sameDay) ||
							(sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
							
			timeMax.days = getDaysInMonth( )
			
			var Y = 0; // Years
			var O = 1; // Months
			var W = 2; // Weeks
			var D = 3; // Days
			var H = 4; // Hours
			var M = 5; // Minutes
			var S = 6; // Seconds
			
			1 week = 604,800 seconds
			1 month = 2,592,000 seconds (30 days)
			1 month = 2,678,400 seconds (31 days)
			1 year = 31,536,000 seconds
			
			var extractPeriod = function(period, numSecs) {
				periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
				diff -= periods[period] * numSecs;
			};
			extractPeriod(W, 604800);
			extractPeriod(D, 86400);
			extractPeriod(H, 3600);
			extractPeriod(M, 60);
			extractPeriod(S, 1);

			if (diff > 0 && !inst._since) { // Round up if left overs
				var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
				var lastShown = S;
				var max = 1;
				for (var period = S; period >= Y; period--) {
					if (show[period]) {
						if (periods[lastShown] >= max) {
							periods[lastShown] = 0;
							diff = 1;
						}
						if (diff > 0) {
							periods[period]++;
							diff = 0;
							lastShown = period;
							max = 1;
						}
					}
					max *= multiplier[period];
				}
			}
			
			//Months with 30 days have 2,592,000 seconds

			//Months with 31 days have 2,678,400 seconds		
			*/
			
			//daysTemp = diff / 86400;
			
			
			//daysLeft = diff;
			

			//console.log( diff );
						
			if( settings.yearsAndMonths ) {
				//console.log( daysLeft * 86400 );
				//Add days back on so we can calculate years easier
				diff += (daysLeft * 86400);
				//timeSections[D] = 0;
				
				yearsLeft = extractPeriod( 31556926 );
				timeSections[Y] = yearsLeft;
				
				//monthsLeft = extractPeriod( Math.floor( 2629743.83 ) );
				monthsLeft = extractPeriod( 2629743.83 );
				
				//monthsLeft = extractPeriod( 2678400 );
				
				timeSections[O] = monthsLeft;
				
				
				daysLeft = extractPeriod( 86400 );
				timeSections[D] = daysLeft;
				
				/*
				diff += (hrsLeft * 3600);
				hrsLeft = extractPeriod( 3600 );
				timeSections[H] = hrsLeft;
				
				diff += (minsLeft * 60);
				minsLeft = extractPeriod( 60 );
				timeSections[M] = minsLeft;
				
				
				diff += (secLeft * 1);
				secLeft = extractPeriod( 1 );
				timeSections[S] = secLeft;
				*/
				
				/*
				hrsLeft = extractPeriod( 3600 );
				timeSections[H] = hrsLeft;
				//timeSections.hours = daysLeft;

				minsLeft = extractPeriod( 60 );
				timeSections[M] = minsLeft;

				secLeft = extractPeriod( 1 );
				timeSections[S] = secLeft;
				*/
			}
			
			//console.log( diff );
			/*
			
			40439.86999999732
			
			if( diff > 0 ) {
				
				if( diff > 0 && diff < 86400 ) {
					diff += (hrsLeft * 3600);
				
					timeSections[H] = 0;
				
					hrsLeft = extractPeriod( 3600 );
					
					timeSections[H] = hrsLeft;
				}
			}
			*/
			
			
			//tmp = new Date( timeLeft );
			
			//console.log( date.getFullYear(), date.getDate() );
			
			//diff = floor( diff );
			
			/*
			if( diff > 0 ) {
				
				while( diff >= 1 ) {
					diff--;
					if( timeSections[S] == 60) {
						timeSections[S] = 0;
						
						if( timeSections[M] == 60 ) {
							timeSections[M] = 0;
							
							if( timeSections[H] == 24 ) {
								
								timeSections[H] = 0;			
								timeSections[D]++;
								
							} else {
								timeSections[H]++;
							}
							
						} else {
							timeSections[M]++;
						}
						
					} else {
						timeSections[S]++;
					}	
				}
			}
			*/
			
			
			//console.log( diff );
						
			/*
				40439.86999999732 = 11.2332972 hours
				40439.86999999732 = 
				console.log( "Remaining: " + diff );
			*/
			
			/*
			while( diff > 0 ) {
				
				if( diff > 0 && diff <= 60 ) {
					//Seconds
					temp = extractPeriod( 1 );
					
					if( (secLeft + temp ) > 60 ) {
						
						secLeft = 0;
						if( minsLeft + ( (secLeft + temp ) - 60 ) > 60 ) {
							minsLeft = 0;
							
							if( ) {
								
							}
							
						} else {
							minsLeft++;
						}
						
					} else {
						secLeft += temp;
					}
					
				} else if( diff > 60 && diff <= 3600 ) {
					//Minutes
					//between 1 minutes and an hour
					
					minsLeft += extractPeriod( 60 );
					
				} else if( diff > 3600 && diff <= 86400 ) {
					//between 1 hour and a day
				} else if( diff > 3600 && diff <= 86400 ) {
					//between 1 hour and a day
				}
				
				//console.log( diff );
			}
			*/
			
			
			/*
			if ( diff > 0 ) { // Round up if left overs
				//var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
				var multiplier = [1 /*years, 12 /*months, 30 /*days, 24 /*hours, 60 /*minutes, 60 /*seconds];
				var lastShown = S;
				var max = 1;
				for (var period = S; period >= Y; period--) {
					//if (show[period]) {
					
					//console.log(period);
					
					if ( timeSections[lastShown] >= max ) {
						timeSections[lastShown] = 0;
						diff = 1;
					}
					if ( diff > 0 ) {
						timeSections[period]++;
						diff = 0;
						lastShown = period;
						max = 1;
						
						//console.log( timeSections[period] );
					}

					//}
					max *= multiplier[period];
				}
			}
			*/
			
			
			
			//timeSections[S] = secLeft;
			
			yearsLeft = timeSections[Y];
			monthsLeft = timeSections[O];
			daysLeft = timeSections[D];
			
			
			hrsLeft = timeSections[H];
			minsLeft = timeSections[M];
			secLeft = timeSections[S];
			
			//console.log( timeSections[S] );
			
			//Now check if any left over


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
				daysLeft = 0;
				hrsLeft = 0;
			}

			//Assumes you are only using dates in the near future 
			//as years, months and days aren't taken into account
			if( settings.secsOnly ) {
				secLeft += ( minsLeft * 60 );
				daysLeft = 0;
				hrsLeft = 0;
				minsLeft = 0;
			}
									
			settings.yearsLeft = yearsLeft;
			settings.monthsLeft = monthsLeft;
			settings.daysLeft = daysLeft;
			settings.hrsLeft = hrsLeft;
			settings.minsLeft = minsLeft;
			settings.secLeft = secLeft;
			
			if( secLeft === 60 ) { 
				secLeft = 0;
			}
			
			if ( settings.leadingZero ) {			
				if ( daysLeft < 10 && !settings.hoursOnly ) {
					daysLeft = "0" + daysLeft;
				}

				if ( yearsLeft < 10 ) {
					yearsLeft = "0" + yearsLeft;
				}
				
				if ( monthsLeft < 10 ) {
					monthsLeft = "0" + monthsLeft;
				}
				
				if ( hrsLeft < 10 ) {
					hrsLeft = "0" + hrsLeft;
				}
				if ( minsLeft < 10 ) {
					minsLeft = "0" + minsLeft;
				}
				if ( secLeft < 10 ) {
					secLeft = "0" + secLeft;
				}
			}

			if ( ( settings.direction === "down" && ( now < date || settings.minus ) ) || ( settings.direction === "up" && ( date < now || settings.minus )  ) ) {
				time = template.replace( rYears, yearsLeft ).replace( rMonths, monthsLeft );
				time = time.replace( rDays, daysLeft ).replace( rHrs, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
			} else {
				time = template.replace( rDate, "00");
				settings.hasCompleted = true;
			}
							
			$this.html( time ).trigger("change.jcdevt", [settings] );
						
			if ( settings.hasCompleted ) {
				$this.trigger("complete.jcdevt");
				clear( settings.timer );
			}
		},			
		methods = {		
			init: function( options ) {
				
				var opts = $.extend( {}, defaults, options ),
					template = opts.htmlTemplate,
					local,
					testDate;
				
				return this.each(function() {
					var $this = $(this),
						settings = {},
						func;

					//If this element already has a countdown timer, just change the settings
					if( $this.data("jcdData") ) {
						$this.countdown("changeSettings", options, true);
						opts = $this.data("jcdData");
					}
					
					if( opts.date === null ) {
						$.error("No Date passed to jCountdown. date option is required.");
						return true;
					}
					
					testDate = new Date(opts.date);
					
					if( testDate.toString() === "Invalid Date" ) {
						$.error("Invalid Date passed to jCountdown: " + opts.date);
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
					
					settings = {
						originalHTML : $this.html(),
						date : opts.date,
						yearsAndMonths: opts.yearsAndMonths,
						hoursOnly : opts.hoursOnly,
						minsOnly : opts.minsOnly,
						secsOnly : opts.secsOnly,
						leadingZero : opts.leadingZero,
						updateTime : opts.updateTime,
						direction : opts.direction,
						template : opts.htmlTemplate,
						htmlTemplate : opts.htmlTemplate,
						minus : opts.minus,
						offset : opts.offset,
						servertime: opts.servertime,
						difference: null,
						onChange : opts.onChange,
						onComplete : opts.onComplete,
						onResume : opts.onResume,
						onPause : opts.onPause,
						hasCompleted : false,
						timer : 0	
					};
					
					if( opts.servertime !== null ) {
						var tempTime;
						local = new Date();
						
						tempTime = ( $.isFunction( settings.servertime ) ) ? settings.servertime() : settings.servertime;
						settings.difference = local.getTime() - tempTime;
					}

					func = $.proxy( timerFunc, $this );
					settings.timer = setInterval( func, settings.updateTime );

					$this.data( "jcdData", settings );
					
					func();
				});
			},
			changeSettings: function( options, internal /* used internally */) {
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

					$this.data("jcdData", settings).trigger("resume.jcdevt");
					//We only want to resume a countdown that hasn't finished
					if( !settings.hasCompleted ) {
						settings.timer = setInterval( func, settings.updateTime );						
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
					//Clear interval (Will be started on resume)
					clear( settings.timer );
					//Trigger pause event handler
					$this.data("jcdData", settings).trigger("pause.jcdevt");					
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
					$this.data("jcdData", settings).trigger("complete.jcdevt").off(".jcdevt");
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

})(jQuery);