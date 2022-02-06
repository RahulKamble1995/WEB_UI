'use strict';

module.exports = function(grunt){

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
      });

    grunt.initconfig({
        sass:{
            dist:{
                files:{
                    'css/styles.css' : 'css/styles.scss'
                }
            }
        },
        copy:{
            html:{
                files:[             
                   {
                       //for html files
                       expanded : true,
                       dot : true,
                       cwd : './',
                       src : ['*.html'],
                       dest : 'dist'
                   } 
                ]
            },
            fonts:{
                files:[
                    {
                        // for font awesome files
                        expanded: true,
                        dot: true,
                        cwd: 'node_modules/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        },
        clean:{
            build:{
                src: ['dist/']
            }
        },
        imagemin:{
            dynamic:{
                files:[
                    {
                        // for image files
                        expanded: true,
                        dot: true,
                        cwd: './',
                        src: ['img/*.{png,jpg,gif}'],
                        dest:'dist/'
                    }
                ]
            }
        },
        watch:{
            'files':'css/*.css',
            'tasks': ['sass']
        },
        useminPrepare:{
                foo : {
                    dest : "dist",
                    src : ['contactus.html','aboutus.html','index.html']
                },
                options:{
                    flow:{
                        steps:{
                            css:['cssmin'],
                            js:['uglify']
                        },
                        post:{
                            css:[{
                                name: 'cssmin',
                                createConfig : function (context, block){
                                    var generated = context.options.generated;

                                        generated.options = {
                                            keepSpecialComments: 0, rebase: false
                                        };
                                }
                            }]
                        }
                    }
                }
        },

        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options:{
                    watchTask: true,
                    server:{
                        baseDir: "./"
                    }
                }
            }
        },     
        
        // concat 
        conact:{
            options:{
                separator:';'
            },
            dist:{}
        },

        // uglify

        usemin:{
            dist:{}
        },
        cssmin: {
            dist: {}
        },

        //FileRev

        filerev:{
            options:{
                encoding : 'utf8',
                algorithm : 'md5',
                lenght : 20
            },
            release:{
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        
        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths

        usemin:{
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        },

        htmlmin:{
            dist:{
                options:{
                    collapseWhitespace:true
                }
            },
            files: {                                   // Dictionary of files
                'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                'dist/contactus.html': 'dist/contactus.html',
                'dist/aboutus.html': 'dist/aboutus.html',
            }
        }

    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};