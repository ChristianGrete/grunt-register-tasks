# grunt-register-tasks

> Registers multiple grunt tasks at once using an object

## Overview

Usually you’d have to register each task one by one calling `grunt.registerTask`, which results in ugly code compared to the object syntax as for example used in `grunt.initConfig`.

This module provides a wrapper function for `grunt.registerTask` that takes a `tasks` object as its second argument in which you can specify all the tasks you need to register.

#### Before

```js
grunt.registerTask('backup', 'compress:src'),
grunt.registerTask('serve', ['connect:build']),
grunt.registerTask('build', ['concat:src', 'copy:src']),
grunt.registerTask('custom', 'My custom task', function () {
  something(), // First, do something
  grunt.task.run('build'); // Then, start build process
});
```

#### After

```js
require('grunt-register-tasks')(grunt, {
  backup: 'compress:src',
  serve: ['connect:build'],
  build: ['concat:src', 'copy:src'],
  custom: {
    description: 'My custom task',
    taskFunction: function () {
      something(); // First, do something
    },
    taskList: 'build' // Then, start build process
  }
});
```

## Getting started

### Install

```sh
$ npm install --save-dev grunt-register-tasks
```

### Usage

`grunt-registered-tasks` takes an object of key‐value pairs (e.g. `{ key: 'value' }`) where `key` represents the corresponding `taskName` and `value` specifies the tasks.

Accepted values are strings for single tasks, `taskList` arrays, `taskFunction` functions or a `taskObject` (see syntax).

```js
// Gruntfile.js

module.exports = function ( grunt ) {
  grunt.initConfig({
    // Your config
  }),

  require('grunt-register-tasks')(grunt, {
    'my-task': [ /* Your tasks */ ]
  });
};
```

## Syntax

### taskObject

Instead of passing a `taskList` array to register an “alias task” or passing a `taskFunction` function to register a “function task”, an object will also be accepted.

This so‐called `taskObject` object can have 3 properties:

#### taskList

Type: `string`, `array`

```js
// Either a single task
{ taskList: 'copy' }

// Or a list of tasks
{ taskList: ['copy'] }

```

#### taskFunction

Type: `function`

```js
{ taskFunction: function () { /* Your custom task */ } }
```

It’s also possible to pass both a `taskFunction` and a `taskList`.

In this case, the `taskFunction` will be invoked first and then `grunt.task.run` will be called passing the `taskList` as its first argument.

```js
{
  taskFunction: function () { /* First */ } },
  taskList: 'copy' // Second — grunt.task.run('copy')
}
```

#### description (optional)

Type: `string`

```js
// Alias task description
{
  description: 'Runs the copy task.',
  taskList: 'copy'
}

// Function task description
{
  description: 'Lorem ipsum.',
  taskFunction: function () { /* Your custom task */ }
}
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Christian Grete](https://christiangrete.com)