/*jslint sloppy: true */
/*global module: false */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'distribution/js/cover-my-meds-api-plugins.js': ['app/plugins.js']
                }
            }
        },
        clean: ['app/stylesheets/main.css', 'app/stylesheets/old-ie.css'],
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/select2-browserify/select2/select2-spinner.gif',
                            'node_modules/select2-browserify/select2/select2.png'
                        ],
                        dest: 'distribution/css/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: ['app/vendor/html5shiv.min.js'],
                        dest: 'distribution/js/vendor/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/bootstrap/dist/fonts/**'],
                        dest: 'distribution/fonts/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    'distribution/css/stylesheet.css': [
                        'app/stylesheets/main.css',
                        'node_modules/bootstrap/dist/css/bootstrap.css',
                        'node_modules/select2-browserify/select2/select2.css',
                        'node_modules/select2-browserify/select2/select2-bootstrap.css'
                    ]
                }
            },
            minify: {
                src: ['app/stylesheets/old-ie.css'],
                dest: 'distribution/css/old-ie.css'
            }
        },
        jasmine: {
            customTemplate: {
                src: ['distribution/js/cover-my-meds-api-plugins.js'],
                options: {
                    specs: 'spec/*-spec.js',
                    vendor: [
                        'node_modules/jquery/dist/jquery.min.js',
                        'spec/vendor/mock-ajax.js'
                    ],
                    keepRunner: false
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["app/stylesheets"]
                },
                files: {
                    "app/stylesheets/main.css": "app/stylesheets/main.less",
                    "app/stylesheets/old-ie.css": "app/stylesheets/old-ie.less"
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
                src: 'distribution/js/cover-my-meds-api-plugins.js',
                dest: 'distribution/js/cover-my-meds-api-plugins.min.js'
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

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'watch');
    grunt.registerTask('css', ['copy', 'less', 'cssmin']);
    grunt.registerTask('distribute', ['copy', 'less', 'cssmin', 'clean', 'browserify', 'uglify']);
    grunt.registerTask('test', ['browserify', 'jasmine']);
};
