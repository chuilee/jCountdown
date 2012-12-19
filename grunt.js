/*global module:false*/
module.exports = function(grunt) {



	// readOptionalJSON
	// by Ben Alman
	// https://gist.github.com/2876125
	function readOptionalJSON( filepath ) {
		var data = {};
		try {
			data = grunt.file.readJSON( filepath );
			grunt.verbose.write( "Reading " + filepath + "..." ).ok();
		} catch(e) {}
		return data;
	}
	
	
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		concat: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		lint: {
			files: ['src/*.js']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},
		// Before generating any new files, remove any previously-created files.
		clean: {
			blah: ['tmp']
		},
		compress: {
			zip: {
				files: {
					"tmp/result.zip": "demo/*", // includes files in dir
					"tmp/result.zip": "demo/**/*", // includes files in dir

/*
		"path/to/another.tar": "path/to/source/**", // includes files in dir and subdirs
		"path/to/final.tgz": ["path/to/sources/*.js", "path/to/more/*.js"], // include JS files in two diff dirs
		"path/to/single.gz": "path/to/source/single.js", // gzip a single file
		"path/to/project-<%= pkg.version %>.zip": "path/to/source/**" // variables in destination*/
				}
			}
		},
		jshint: (function() {
			function jshintrc( path ) {
				return readOptionalJSON( (path || "") + ".jshintrc" ) || {};
			}

			return {
				grunt: jshintrc(),
				dist: jshintrc( "src/" )/*,
				tests: jshintrc( "test/" )*/
			};
		})(),
		uglify: {
			codegen: {
				ascii_only: true
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
		
	grunt.registerTask('blah', 'clean');
	//qunit
	
	// Default task.
	grunt.registerTask('default', 'lint concat min');
	//grunt.registerTask('default', 'lint concat min blah compress');
	grunt.registerTask('dev', 'lint');
};