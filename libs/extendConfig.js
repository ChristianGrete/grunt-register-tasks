'use strict';

var
  _forEach = require('./forEach.js'),
  _prefixKey = require('./prefixKey.js');

module.exports = function ( $config, $imports ) {
    _forEach(
      $imports,
      function ( $prefix, $properties ) {
        _forEach(
          $properties,
          function ( $key, $value ) {
            $config[
              _prefixKey(
                $key,
                $prefix
              )
            ]
              = $value;
          }
        );
      }
    );

    return $config;
  };