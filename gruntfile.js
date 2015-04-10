module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/** Clean Assets Task **/
		clean: ['web/css/*', 'web/font/*', 'web/js/*'],

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
		/** Browserify / Sassify Task **/
		shell: {
			options: {
				stderr: false
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
				tasks: ['']
			},
			fonts: {
				files: ['app/Resources/fonts/*'],
				tasks: ['copy:fonts']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['bowercopy', 'copy', 'shell:sass', 'shell:browserify', 'watch']);
};