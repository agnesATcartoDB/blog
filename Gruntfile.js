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
        headers: {
          "CacheControl": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        },
        gzip: true,
        src: ["css/{,*/}*", "js/{,*/}*", "fonts/{,*/}*", "img/**/*"]
      },
      staging: {
        options: {
          bucket: '<%= aws.stagingBucket %>'
        },
        cwd: "<%= config.dist %>",
        src: "**"
      },
      production: {
        options: {
          bucket: '<%= aws.productionBucket %>'
        },
        cwd: "<%= config.dist %>",
        src: "**"
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
        files: ['_lib/scss/*.scss'],
        tasks: ['compass:server'],
      },
      js: {
        files: ['_lib/js/{,*/}*.js'],
        tasks: ['copy:server'],
      },
      html: {
        files: [
          '{,*/}*.html',
          '{,*/}*.md',
          'img/**/*'
        ],
        tasks: ['shell:server', 'compass:server', 'copy:server']
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
          '_lib/scss/*.scss'
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
          '<%= config.dist %>/img/**/*.*',
          '<%= config.dist %>/fonts/{,*/}*.*',
          '<%= config.dist %>/*.{ico,png}'
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/css/main.css': [
            '_lib/scss/{,*/}*.css',
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
          '_site/js/index.js': ['_lib/js/index.js'],
          '_site/js/post.js': ['_lib/js/post.js']
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
            '_lib/js/app.js',
            '_lib/js/index.js',
            '_lib/js/ui/navbar.js',
            '_lib/js/ui/tooltip.js'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.dist %>/**/*.html',
      css: '<%= config.app %>/css/{,*/}*.css'
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
          cssDir: '<%= config.dist %>/css'
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
          cwd: '_lib/scss',
          dest: '<%= config.dist %>/css/',
          src: '{,*/}*.css'
        }, {
          expand: true,
          dot: true,
          cwd: '_lib/js',
          src: ['{,*/}*.*'],
          dest: '<%= config.dist %>/js/'
        },
        {
          src: 'bower_components/jquery/dist/jquery.js',
          dest: '<%= config.dist %>/js/vendor/jquery.js'
        },
        {
          src: 'bower_components/underscore/underscore.js',
          dest: '<%= config.dist %>/js/vendor/underscore.js'
        },
        {
          src: 'bower_components/backbone/backbone.js',
          dest: '<%= config.dist %>/js/vendor/backbone.js'
        },
        {
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
            '**/*.html',
            'fonts/{,*/}*.*',
            'img/**/*.{gif,jpeg,jpg,png}'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '_lib/scss',
        dest: '<%= config.app %>/css/',
        src: '{,*/}*.css'
      },
      scripts: {
        files: [{
          expand: true,
          dot: true,
          cwd: '_lib/js',
          src: ['{,*/}*.*'],
          dest: '<%= config.app %>/js/'
        },
        {
          src: 'bower_components/modernizr/modernizr.js',
          dest: '<%= config.dist %>/js/vendor/modernizr.js'
        }]
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:styles',
        'copy:server'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'copy:scripts'
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
    // 'htmlmin'
  ]);

  grunt.registerTask('deploy:staging', [
    'build',
    's3:staging'
  ]);

  grunt.registerTask('deploy:production', [
    'build',
    's3:production'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
}
