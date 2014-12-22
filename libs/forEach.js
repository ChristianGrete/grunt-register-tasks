'use strict';

var
  _Object__keys = Object.keys,
  _Array__prototype__forEach = Array.prototype.forEach;

module.exports = function ( $object, $onEach ) {
    return _Array__prototype__forEach.call(
        _Object__keys( $object ),
        function ( $key, $index, $keys ) {
          $onEach.call(
            this,
            $key,
            $object[ $key ]
          );
        }
      );
  };