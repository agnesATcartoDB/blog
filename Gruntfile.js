module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.sass-cache',
            '.tmp',
            '_site'
          ]
        }]
      }
    },
    connect: {
      server: {
        options: {
          base: '_site/',
          port: 4002,
          open: true,
          hostname: '0.0.0.0'
        }
      }
    },
    shell: {
      prod: {
        command: "jekyll build --config '_config-prod.yml'",
        options: {
          async: false
        }
      },
      dist: {
        command: "jekyll build --limit_posts 20", // make it fast
        options: {
          async: false
        }
      }
    },
    watch: {
      css: {
        files: ['_lib/scss/*.scss'],
        tasks: ['compass:dist'],
      },
      js: {
        files: ['_lib/js/{,*/}*.js'],
        tasks: ['copy:dist'],
      },
      html: {
        files: [
          '{,*/}*.html',
          '{,*/}*.md',
          'img/**/*.*'
        ],
        tasks: ['shell:dist', 'compass:dist', 'copy:dist']
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          cssDir: '_site/css'
        }
      },
      prod: {
        options: {
          config: 'config.rb',
          cssDir: '.tmp/css'
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: '_lib/js/',
        src: '{,*/}*.*',
        dest: '_site/js/'
      },
      prod: {
        files : [
          {
            expand: true,
            cwd: '.tmp/',
            dest: '_site/',
            src: [
              '*.{ico,png,txt}',
              'fonts/{,*/}*.*',
              '**/*.html',
              'img/**/*.*'
            ]
          },
          {
            src: '_lib/js/vendor/modernizr-2.6.2.min.js',
            dest: '_site/js/vendor/modernizr-2.6.2.min.js'
          }
        ]
      },
    },
    concat: {
      index: {
        src: [
          '_lib/js/vendor/jquery-1.11.1.min.js',
          '_lib/js/vendor/underscore-min.js',
          '_lib/js/vendor/backbone-min.js',
          '_lib/js/app.js',
          '_lib/js/ui/navbar.js'
        ],
        dest: '.tmp/js/blog.js',
      }
    },
    uglify: {
      prod: {
        files: {
          '_site/js/blog.min.js': ['.tmp/js/blog.js'],
          '_site/js/index.min.js': ['_lib/js/index.js'],
          '_site/js/post.min.js': ['_lib/js/post.js']
        }
      },
    },
    cssmin: {
      prod: {
        files: {
          '_site/css/blog.min.css': [
            '.tmp/**/*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '**/*.html',
          dest: '_site/'
        }]
      }
    },
    concurrent: {
      prod: [
        'cssmin',
        // 'htmlmin'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    },
    hashres: {
      options: {
        fileNameFormat: '${name}.${hash}.${ext}',
      },
      prod: {
        src: [
          '_site/css/blog.min.css',
          '_site/js/*.js'
        ],
        dest: '_site/**/*.html'
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'shell:prod',
    'compass:prod',
    'copy:prod',
    'concat',
    'uglify',
    'concurrent:prod',
    'hashres'
  ]);

  grunt.registerTask('default', [
    // 'test',
    'clean',
    'shell:dist',
    'concurrent:dist',
    'connect',
    'watch'
  ]);
};