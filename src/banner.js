/**
 * @author <%= pkg.author.name %> <<%= pkg.author.email %>>
 * @copyright <%= grunt.template.today('yyyy') %> {@link <%=
     pkg.author.url
       + '|'
       + pkg.author.name
   %>}
 * @example
 * var <%=
     pkg.name.replace(
       /-([a-z])/g,
       function( matches ) {
         return matches[ 1 ].toUpperCase()
       }
     )
   %> = require('<%= pkg.name %>');
 * @file Provides the {@linkcode <%=
     pkg.homepage
       + '|'
       + pkg.name
   %>} grunt plugin.
 * @ignore
 * @license <%= pkg.license %>
 * @see {@link <%= pkg.homepage %>}
 * @version <%= pkg.version %>
 */

/*! jshint ignore:start */

