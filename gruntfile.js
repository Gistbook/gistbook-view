var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    preprocess: {
      main: {
        src: 'src/wrapper.js',
        dest: 'dist/gistbook-view.js'
      }
    },

    uglify: {
      options: {
        compress: true,
        sourceMap: true
      },
      main: {
        src: 'dist/gistbook-view.js',
        dest: 'dist/gistbook-view.min.js'
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
        compress: false,
        import: ['../bower_components/nib/index'],
        'include css': true,
        paths: ['bower_components']
      },
      main: {
        src: ['src/styl/style.styl', 'src/gistbook-view/*.styl', 'src/child-views/**/*.styl'],
        dest: 'dist/gistbook.css'
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: false
      },
      main: {
        src: 'dist/gistbook.css',
        dest: 'dist/gistbook.min.css'
      }
    }

  });

  grunt.registerTask('default', 'Build the Gistbook View', [
    'jst',
    'copy',
    'preprocess',
    'uglify',
    'stylus',
    'cssmin'
  ]);
};
