/*jslint sloppy: true */
/*global module: false */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'distribution/cover-my-meds-api-plugins.js': ['app/plugins.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true,
                compress: true
            },
            dist: {
                src: 'distribution/cover-my-meds-api-plugins.js',
                dest: 'distribution/cover-my-meds-api-plugins.min.js'
            }
        },
        jasmine: {
            customTemplate: {
                src: ['distribution/cover-my-meds-api-plugins.js'],
                options: {
                    specs: 'spec/*Spec.js',
                    vendor: [
                        'node_modules/jquery/dist/jquery.min.js'
                    ],
                    keepRunner: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/views/*.js', 'app/templates/*.html', 'spec/*.js'],
                tasks: ['browserify'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'watch');
    grunt.registerTask('distribute', ['browserify', 'uglify']);
    grunt.registerTask('test', ['browserify', 'jasmine']);
};
