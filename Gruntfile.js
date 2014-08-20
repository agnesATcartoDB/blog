module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var config = {
    app: '.tmp',
    dist: '_site'
  };

  grunt.initConfig({
    config: config,

    aws: grunt.file.readJSON('grunt-aws.json'),
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
      },
      staging: {
        options: {
          bucket: '<%= aws.stagingBucket %>'
        },
        cwd: "<%= config.dist %>",
        src: [
          '*.{ico,png}',
          'feed.*',
          '**/*.html'
        ]
      },
      stagingAssets: {
        options: {
          bucket: '<%= aws.stagingBucket %>',
          headers: {
            "CacheControl": "max-age=630720000, public",
            "Expires": new Date(Date.now() + 63072000000).toUTCString()
          },
        },
        gzip: true,
        src: ["css/{,*/}*", "js/{,*/}*", "fonts/{,*/}*", "img/**/*.{gif,jpeg,jpg,png}"],
        cwd: "<%= config.dist %>"
      },
      stagingRobots: {
        options: {
          bucket: '<%= aws.stagingBucket %>'
        },
        src: "<%= config.dist %>/disallow-robots.txt",
        dest: "robots.txt"
      },
      production: {
        options: {
          bucket: '<%= aws.productionBucket %>'
        },
        cwd: "<%= config.dist %>",
        src: [
          '*.{ico,png}',
          'feed.*',
          '**/*.html'
        ]
      },
      productionAssets: {
        options: {
          bucket: '<%= aws.productionBucket %>',
          headers: {
            "CacheControl": "max-age=630720000, public",
            "Expires": new Date(Date.now() + 63072000000).toUTCString()
          },
        },
        gzip: true,
        src: ["css/{,*/}*", "js/{,*/}*", "fonts/{,*/}*", "img/**/*.{gif,jpeg,jpg,png}"],
        cwd: "<%= config.dist %>"
      },
      productionRobots: {
        options: {
          bucket: '<%= aws.productionBucket %>'
        },
        src: "<%= config.dist %>/allow-robots.txt",
        dest: "robots.txt"
      }
    },
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static(config.dist),
              connect().use('/bower_components', connect.static('./bower_components')),
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },
    watch: {
      css: {
        files: ['_scss/*.scss'],
        tasks: ['compass:server'],
      },
      js: {
        files: ['_js/{,*/}*.js'],
        tasks: ['copy:server'],
      },
      html: {
        files: [
          '{,*/}*.html',
          '{,*/}*.md',
          'img/**/*'
        ],
        tasks: ['shell:server', 'concurrent:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{,*/}*.html',
          '{,*/}*.md',
          'img/**/*',
          '_scss/*.scss'
        ]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.sass-cache',
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },
    shell: {
      server: {
        command: "jekyll build --limit_posts 20", // make it fast
        options: {
          async: false
        }
      },
      drafts: {
        command: "jekyll build --drafts --limit_posts 20", // make it fast
        options: {
          async: false
        }
      },
      test: {
        command: "jekyll build --config '_config-prod.yml'",
        options: {
          async: false
        }
      },
      dist: {
        command: "jekyll build --lsi --config '_config-prod.yml'",
        options: {
          async: false
        }
      }
    },
    filerev: {
      files: {
        src: [
          '<%= config.dist %>/js/**/*.js',
          '<%= config.dist %>/css/{,*/}*.css',
          '<%= config.dist %>/img/**/*.{gif,jpeg,jpg,png}',
          '<%= config.dist %>/fonts/{,*/}*.*'
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/css/main.css': [
            '_scss/{,*/}*.css',
            '<%= config.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '_site/js/main.js': ['.tmp/js/main.js'],
          '_site/js/vendor.js': ['.tmp/js/vendor.js'],
          '_site/js/post.js': ['_js/post.js']
        }
      },
    },
    concat: {
      dist: {
        files: {
          '.tmp/js/vendor.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js'
          ],
          '.tmp/js/main.js': [
            'bower_components/cdbui/js/cdbui/cdbui.js',
            'bower_components/cdbui/js/cdbui/cdbui.navbar.js',
            'bower_components/cdbui/js/cdbui/cdbui.tooltip.js',
            '_js/app.js',
            '_js/index.js'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.dist %>/**/*.html',
      css: '<%= config.dist %>/css/{,*/}*.css'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/img'],
        patterns: {
          css: [
            [/(fonts\/.*?\.(?:eot|woff|ttf|svg))/gm, 'Update the css to reference revved fonts'],
            [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the css to reference revved images']
          ]
        }
      },
      html: ['<%= config.dist %>/**/*.html'],
      css: ['<%= config.dist %>/css/{,*/}*.css']
    },
    compass: {
      server: {
        options: {
          config: 'config.rb',
          cssDir: '<%= config.dist %>/css',
          fontsDir: 'bower_components/cdbui/fonts'
        }
      },
      dist: {
        options: {
          config: 'config.rb',
          cssDir: '.tmp/css'
        }
      }
    },
    copy: {
      server: {
        files: [{
          expand: true,
          dot: true,
          cwd: '_scss',
          dest: '<%= config.dist %>/css/',
          src: '{,*/}*.css'
        }, {
          expand: true,
          dot: true,
          cwd: '_js',
          src: '{,*/}*.*',
          dest: '<%= config.dist %>/js/'
        }, {
          src: 'bower_components/jquery/dist/jquery.js',
          dest: '<%= config.dist %>/js/vendor/jquery.js'
        }, {
          src: 'bower_components/underscore/underscore.js',
          dest: '<%= config.dist %>/js/vendor/underscore.js'
        }, {
          src: 'bower_components/backbone/backbone.js',
          dest: '<%= config.dist %>/js/vendor/backbone.js'
        }, {
          src: 'bower_components/modernizr/modernizr.js',
          dest: '<%= config.dist %>/js/vendor/modernizr.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'feed.*',
            '**/*.html',
            'img/**/*.{gif,jpeg,jpg,png}'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/cdbui/fonts',
          dest: '<%= config.dist %>/fonts/',
          src: '{,*/}*.*',
        }, {
          src: 'bower_components/modernizr/modernizr.js',
          dest: '<%= config.dist %>/js/vendor/modernizr.js'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '_scss',
        dest: '<%= config.app %>/css/',
        src: '{,*/}*.css'
      },
      images: {
        expand: true,
        dot: true,
        cwd: 'img',
        src: '**/*.{gif,jpeg,jpg,png}',
        dest: '<%= config.dist %>/img/'
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:server',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles'
      ]
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean',
      'shell:server',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('drafts', [
    'clean',
    'shell:drafts',
    'concurrent:server',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'shell:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'filerev',
    'usemin',
    'copy:images'
    // 'htmlmin'
  ]);

  grunt.registerTask('test', [
    'clean',
    'shell:test',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'filerev',
    'usemin',
    'copy:images'
  ]);

  grunt.registerTask('deploy:staging', [
    'build',
    's3:staging',
    's3:stagingAssets',
    's3:stagingRobots'
  ]);

  grunt.registerTask('deploy:production', [
    'build',
    's3:production',
    's3:productionAssets',
    's3:productionRobots'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
}
