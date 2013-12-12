/*jslint sloppy: true */
/*global module: false */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/jquery.formsearch.js',
                    'src/jquery.drugsearch.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true,
                compress: true
            },
            dist: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            customTemplate: {
                src: [
                    'src/jquery.formsearch.js',
                    'src/jquery.drugsearch.js',
                    'src/jquery.createrequest.js',
                    'src/jquery.dashboard.js'
                ],
                options: {
                    specs: 'spec/*Spec.js',
                    vendor: [
                        'src/config.js',
                        'lib/base64.js',
                        'bower_components/jquery/jquery.js',
                        'bower_components/typeahead.js/dist/typeahead.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js',
                        'bower_components/underscore/underscore.js'
                    ],
                    keepRunner: true
                }
            }
        },
        jslint: {
          client: {
            src: [
              'src/*.js',
              'spec/*.js'
            ]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jslint');

    // Default task
    grunt.registerTask('default', ['jasmine']);
    grunt.registerTask('distribute', ['concat', 'uglify']);
    grunt.registerTask('lint', 'jslint');
};
