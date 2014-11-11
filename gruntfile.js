module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            library : {
                files: {
                    'dist/awesomeRating.js': ['src/awesomeRating.js'],
                    'dist/awesomeRating-angular.js': ['src/awesomeRating.js', 'src/awesomeRating-angular.js']
                }
            }
        },
        uglify: {
            library: {
                files: {
                    'dist/awesomeRating.min.js': ['dist/awesomeRating.js'],
                    'dist/awesomeRating-angular.min.js': ['dist/awesomeRating-angular.js']
                }
            }
        },
        cssmin: {
            styles: {
                files: [{
                    expand  : true,
                    cwd     : 'src/',
                    src     : [ '*.css' ],
                    dest    : 'dist',
                    ext     : '.min.css'
                }]
            }
        }
    });
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};