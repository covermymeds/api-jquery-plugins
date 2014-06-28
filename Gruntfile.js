/*jslint sloppy: true */
/*global module: false */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            options: {
                bundleOptions: {
                    standalone: 'CoverMyMeds'
                }
            },
            dist: {
                files: {
                    'distribution/plugins.js': ['app/plugins.js']
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
                // src: 'dist/<%= pkg.name %>.js',
                // dest: 'dist/<%= pkg.name %>.min.js'
                src: 'distribution/plugins.js',
                dest: 'distribution/plugins.min.js'
            }
        },
        jasmine: {
            customTemplate: {
                src: ['distribution/plugins.js'],
                options: {
                    specs: 'spec/*Spec.js',
                    vendor: [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/underscore/underscore-min.js',
                        'node_modules/select2/select2.js',
                        'node_modules/bootstrap/dist/js/bootstrap.js'
                    ],
                    keepRunner: true
                }
            }
        },
        jst: {
            'app/templates/compiled.js': ['app/templates/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    // grunt.registerTask('default', 'browserify');
    grunt.registerTask('default', ['jst', 'browserify'/*, 'uglify'*/]);
    grunt.registerTask('test', 'jasmine');
};
