'use strict';

var
  _timeGrunt = require('time-grunt'),
  _loadGruntTasks = require('load-grunt-tasks');

module.exports = function gruntWrapper ( $grunt ) {

    var
      _$grunt__file = $grunt.file,
      _$grunt__registerTask = $grunt.registerTask,
      _cfg;

    _timeGrunt( $grunt );

  ///////////////////
  // CONFIGURATION //
  ///////////////////

    $grunt.initConfig({
      'cfg': _cfg = require('./config/grunt.js'),
      'clean': {
          'build': '<%= grunt.option("release") ? cfg.PATH__DIST : cfg.PATH__BUILD %>'
        },
      'connect': {
          'docs': {
              'options': {
                  'base': '<%= cfg.PATH__DOCS %>',
                  'hostname': 'localhost',
                  'livereload': true,
                  'open': true,
                  'port': 8080,
                  'useAvailablePort': true
                }
            }
        },
      'copy': {
          'src': {
              'cwd': '<%= cfg.PATH__SRC %>',
              'dest': '<%= clean.build %>',
              'expand': true,
              'src': [
                  '<%= cfg.GLOB__JS__RECURSIVE %>',
                  '!{banner,footer}.js'
                ]
            }
        },
      'jsdoc': {
          'src': {
              'dest': '<%= connect.docs.options.base %>',
              'src': '<%= cfg.PATH__SRC + "/" + cfg.GLOB__JS__RECURSIVE %>'
            }
        },
      'jshint': {
          'config': '<%= cfg.PATH__CONFIG + "/" + cfg.GLOB__JS__RECURSIVE %>',
          'grunt': './Gruntfile.js',
          'options': {
              'jshintrc': true
            },
          'src': '<%= jsdoc.src.src %>'
        },
      'jsonlint': {
          'config': '<%= cfg.PATH__CONFIG + "/" + cfg.GLOB__JSON__RECURSIVE %>',
          'jshint': './.jshintrc',
          'package': './package.json'
        },
      'meta': {
          'banner': _$grunt__file.read(
              _cfg.PATH__SRC
                + '/banner.js'
            ),
          'footer': _$grunt__file.read(
              _cfg.PATH__SRC
                + '/footer.js'
            )
        },
      'pkg': _$grunt__file.readJSON('./package.json'),
      'uglify': {
          'build': {
              'cwd': '<%= clean.build %>',
              'dest': '<%= uglify.build.cwd %>',
              'expand': true,
              'src': '<%= cfg.GLOB__JS__RECURSIVE %>'
            },
          'options': {
              'banner': '<%= meta.banner %>',
              'beautify': true,
              'compress': false,
              'footer': '<%= meta.footer %>',
              'mangle': false
            }
        },
      'watch': {
          'options': {
              'livereload': true
            },
          'src.js': {
              'files': '<%= jshint.src %>',
              'tasks': [
                  'jshint:src',
                  'jsdoc:src'
                ]
            }
        }
    });

  ///////////////////
  // TASKS LOADING //
  ///////////////////

    _loadGruntTasks(
      $grunt,
      {
        'pattern': [
            'grunt-contrib-*',
            'grunt-jsdoc',
            'grunt-jsonlint'
          ],
        'scope': 'devDependencies'
      }
    );

  ////////////////////////
  // TASKS REGISTRATION //
  ////////////////////////

    _$grunt__registerTask(
      'default',
      [
        'jsonlint:package',
        'jshint:src'
      ]
    );

    _$grunt__registerTask(
      'build',
      [
        'default',
        'clean:build',
        'copy:src',
        'uglify:build'
      ]
    );

    _$grunt__registerTask(
      'serve',
      [
        'build',
        'jsdoc:src',
        'connect:docs',
        'watch'
      ]
    );

  };
