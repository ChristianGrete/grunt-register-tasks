'use strict';

module.exports = function registerTasks ( grunt, tasks ) {

    var
      ERROR_MESSAGE__INVALID_ARGUMENT
        = 'Argument "%" is null or not an object',
      ERROR_MESSAGE__INVALID_ARGUMENTS_LENGTH
        = 'Module "grunt-register-tasks" expects 2 arguments, % were passed',
      ERROR_MESSAGE__INVALID_GRUNT_MODULE
        = 'Module "grunt-register-tasks" requires the first argument to be "grunt"';

    var
      isArray,
      keys,
      registerTask;

    if( arguments.length !== 2 ) {
      throw new TypeError(
        ERROR_MESSAGE__INVALID_ARGUMENTS_LENGTH.replace(
          '%',
          arguments.length
        )
      );
    }

    function _isObject ( operand ) {
      return typeof operand === 'object'
        && operand !== null;
    };

    if( !_isObject(grunt) ) {
      throw new TypeError(
        ERROR_MESSAGE__INVALID_ARGUMENT.replace(
          '%',
          'grunt'
        )
      );
    }

    if(
      !grunt.hasOwnProperty('registerTask')
        || typeof grunt.registerTask !== 'function'
    ) {
      throw new TypeError( ERROR_MESSAGE__INVALID_GRUNT_MODULE );
    }

    if( !_isObject(tasks) ) {
      throw new TypeError(
        ERROR_MESSAGE__INVALID_ARGUMENT.replace(
          '%',
          'tasks'
        )
      );
    }

    registerTask = grunt.registerTask;

    if(
      (
        keys = Object.keys( tasks )
      )
        .length > 0
    ) {
      isArray = Array.isArray,

      keys.forEach(function ( key ) {
        var
          description,
          taskFunction,
          taskList,
          value = tasks[ key ];

        switch( typeof value ) {
          case 'object':
            if(
              value !== null
                && !isArray( value )
            ) {
              taskList = 'taskList' in value
                ? value.taskList
                  : [];

              if( typeof value.taskFunction === 'function' ) {
                taskFunction = value.taskFunction;
              }

              description = value.description,

              value = taskFunction || taskList;

              if( _isObject(description) ) {
                description = description.valueOf();
              }

              if(
                typeof description === 'string'
                  && description.length > 0
              ) {
                registerTask(
                  key,
                  description,
                  value === taskFunction
                    ? function () {
                        value.apply(
                          this,
                          arguments
                        );

                        if(
                          typeof taskList === 'string'

                          ||

                          (
                            isArray( taskList )
                              && taskList.length > 0
                          )

                          ||

                          (
                            _isObject( taskList )
                              && typeof taskList.valueOf() === 'string'
                          )
                        ) {
                          grunt.task.run( taskList );
                        }
                      }
                        : value
                );

                break;
              }
            }

          default:
            registerTask(
              key,
              value
            );
        }
      });
    }

    return registerTasks;

  };
