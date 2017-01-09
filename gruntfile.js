module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/* stylesheet */

		sass: {
			options:{				
				outputStyle: 'compressed'
			},
			build: {
				files: {
					'deploy/css/screen.css': ['source/stylesheet/main.scss']
				}
			}
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: 'last 5 versions'}),
					require('cssnano')()
				]
			},
			build: {
				files: {
					'build/css/screen.css': 'build/css/screen.css'
				}
			}
		},

		/* javascript */

		uglify: {
			build: {
				files: {
					'build/js/bundle.js': [
						'source/javascript/vendor/*.js',
						'source/javascript/components/*.js',
						'source/javascript/*.js'
					]
				}
			}
		},

		/* utility */

		watch: {
			options: {
      			livereload: true,
    		},
			stylesheet: {
				files: ['source/stylesheet/**/*.scss'],
				tasks: ['sass', 'postcss']
			},

			javascript: {
				files: ['source/javascript/**/*.js'],
				tasks: ['uglify']
			}
		}
	});

	/* dependencies */

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	/* tasks */

	grunt.registerTask('default', ['sass', 'postcss', 'uglify']);
};