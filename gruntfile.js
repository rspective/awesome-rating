module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            library: {
                src: [
                    'src/awesomeRating.js'
                ],
                dest: 'dist/awesomeRating.js'
            }
        },

        uglify: {
            library: {
                files: {
                    'dist/awesomeRating.min.js': ['dist/awesomeRating.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['concat', 'uglify']);

};