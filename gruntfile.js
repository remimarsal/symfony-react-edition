module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/** Copy Assets Task **/
		copy: {
			javascript: {
				expand: true,
				cwd: 'app/Resources/js/',
				src: '**',
				dest: 'web/js/',
				filter: 'isFile',
			},
			fonts: {
				expand: true,
				cwd: 'app/Resources/font/',
				src: '**',
				dest: 'web/font/',
				filter: 'isFile',
			}
		},
		/** Copy Bower Assets Task **/
		bowercopy: {
			options: {
				srcPrefix: 'bower_modules',
				destPrefix: 'web/',
			},
			fonts: {
				files: {
					'font/material' : 'materialize/dist/font/material-design-icons/*'
				}
			},
			javascript: {
				files: {
					'js/vendor/' : 'materialize/dist/js/materialize.js'
				}
			}
		},
		/** Browserify Task **/
		browserify: {
			options: {
				debug: true,
				external: [
					'jquery',
					'react',
					'react-router',
					'underscore'
				]
			},
			dist: {
				files: {
					'web/js/app.js' : ['app/Resources/jsx/app.jsx']
				}
			}
		},
		/** Browserify / Sassify Task **/
		shell: {
			options: {
				stderr: false
			},
			fos_js_routing: {
				command: 'php app/console fos:js-routing:dump'
			},
			sass: {
				command: 'sass app/Resources/sass/main.scss web/css/app.css --cache-location=app/Resources/sass/.sass-cache'
			},
			browserify: {
				command: 'browserify --debug -t sassify app/Resources/jsx/app.jsx > web/js/app.js'
			}
		},
		/** Watch Task **/
		watch: {
			options: {
				livereload: true,
			},
			sass: {
				files: ['app/Resources/sass/**/*.scss'],
				tasks: ['shell:sass']
			},
			jsx: {
				files: ['app/Resources/jsx/**/*.jsx', 'app/Resources/jsx/**/*.js'],
				tasks: ['shell:browserify']
			},
			templates: {
				files: ['app/Resources/views/**/**/*'],
				tasks: ['shell:fos_js_routing']
			},
			fonts: {
				files: ['app/Resources/fonts/*'],
				tasks: ['copy:fonts']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['bowercopy', 'copy', 'shell:sass', 'shell:fos_js_routing', 'shell:browserify', 'watch']);
};