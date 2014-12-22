'use strict';

module.exports = function ( $key, $prefix ) {
    return $prefix
      + '__'
      + $key;
  };