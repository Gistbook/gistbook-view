var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    preprocess: {
      main: {
        src: 'src/wrapper.js',
        dest: 'lib/gistbook-view.js'
      }
    },

    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: 'bower_components/font-awesome/fonts/*',
        dest: 'fonts'
      }
    },

    jst: {
      options: {
        namespace: 'gistbookTemplates',
        processName: function( filename ) {
          var basename = path.basename( filename, path.extname(filename) );
          return basename.replace(/[-\.]([a-z])/g, function (g) { return g[1].toUpperCase(); });
        }
      },
      main: {
        src: 'src/**/*.jst',
        dest: 'tmp/templates.js'
      }
    },

    stylus: {
      options: {
        'include css': true,
        paths: [ 'bower_components' ]
      },
      main: {
        src: 'src/styl/style.styl',
        dest: 'lib/gistbook.css'
      }
    }

  });

  grunt.registerTask('default', ['jst', 'copy', 'preprocess', 'stylus']);

};
