'use_strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      app: ['./source'],
      build: ['./build'],
      css: ['<%= project.app %>/styles'],
      js: ['<%= project.app %>/scripts'],
      components: ['<%= project.app %>/components'],
      templates: ['<%= project.app %>/views']
    },
    // Sass -> CSS
    sass: {
      dev: {
        options: {
          outputStyle: 'compact',
          outFile: '<%= project.build %>/style.css',
          sourceMap: true
        },
        files: {
            "<%= project.build %>/style.css": "<%= project.css %>/style.sass"
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
            "<%= project.build %>/style.css": "<%= project.css %>/style.sass"
        }
      }
    },
    // Pug -> HTML
    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.app %>/',
          src: ['**/*.pug','!**/_*.pug'],
          dest: '<%= project.build %>/',
          ext: '.html'
        }]
      }
    },
    // Adds any relevate autoprefixers supporting IE 11 and above
    autoprefixer: {
      options: {
        browsers: ["> 1%", "ie > 10"],
        map: true
      },
      target: {
        files: {
            "<%= project.build %>/style.css": "<%= project.build %>/style.css"
        }
      }
    },
    // Babel/React build
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'build/scripts/app.js': '<%= project.js %>/app.js'
        }
      }
    },
    notify: {
      sass:{
        options:{
          title: "Grunt",
          message: "Sass compiled and autoprefixed successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      content:{
        options:{
          title: "Grunt",
          message: "Content updated or copied successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      pug:{
        options:{
          title: "Grunt",
          message: "Pug Compiled Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      js:{
        options:{
          title: "Grunt",
          message: "Javascript compiled successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      }
    },
    sync: {
      content: {
        files: [{
          cwd: '<%= project.app %>/',
          src: ['content/**/*', 'scripts/vendor/*.js'],
          dest: '<%= project.build %>/'
        }],
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      main: {
        expand: true,
        cwd: '<%= project.app %>/',
        src: ['content/**', 'scripts/vendor/*.js', 'robots.txt'],
        dest: '<%= project.build %>/',
      }
    },
    // Empties folders to start fresh
    clean: {
      main: {
        files: [{
          dot: true,
          src: [
            '<%= project.build %>/{,*/}*'
          ]
        }]
      }
    },
    watch: {
      sass: {
        files: ['<%= project.css %>/**/*.{scss,sass}','<%= project.components %>/**/*.{scss,sass}'],
        tasks: ['sass','autoprefixer','notify:sass']
      },
      js: {
        files: ['<%= project.js %>/app.js','<%= project.js %>/**/*.jsx'],
        tasks: ['babel', 'notify:js']
      },
      pug: {
        files: ['<%= project.app %>/**/*.pug', '<%= project.components %>/**/*.pug'],
        tasks: ['pug', 'notify:pug']
      },
      content: {
        files: ['<%= project.app %>/content/**/*', '<%= project.js %>/vendor/*.js'],
        tasks: ['sync:content', 'notify:content']
      }
    },
    // Server setup
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= project.build %>/style.css',
            '<%= project.build %>/**/*.js',
            '<%= project.build %>/content/**/*',
            '<%= project.build %>/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: '<%= project.build %>/'
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'copy',
    'sass:dev',
    'autoprefixer',
    'pug',
    'babel',
    'browserSync',
    'watch'
  ]);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'autoprefixer',
    'pug',
    'babel'
  ]);
};
