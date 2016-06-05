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
    notify: {
      sass:{
        options:{
          title: "Grunt",
          message: "Sass Compiled Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      autoprefixer:{
        options:{
          title: "Grunt",
          message: "CSS Autoprefixed",
          duration: 2,
          max_jshint_notifications: 1
        }
      },
      content:{
        options:{
          title: "Grunt",
          message: "Content Updated or Copied Successfully.",
          duration: 2,
          max_jshint_notifications: 1
        }
      }
    },
    sync: {
      content: {
        files: [{
          cwd: '<%= project.app %>/',
          src: ['content/**/*', 'scripts/vendor/*.js', '**/*.php'],
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
        tasks: ['sass','notify:sass']
      },
      autoprefixer:{
        files: ['<%= project.build %>/style.css'],
        tasks: ['autoprefixer', 'notify:autoprefixer']
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
            '<%= project.build %>/**/*.{js,jsx}',
            '<%= project.build %>/content/**/*',
            '<%= project.build %>/**/*.html'
          ]
        },
        options: {
          watchTask: true
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
    'browserSync',
    'watch'
  ]);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'autoprefixer'
  ]);
};
