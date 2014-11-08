module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
      dev: {
        options: {
          port: 80,
          base: './'
        }
      }
    },

    assemble: {
      options: {
      	collections: [
      		{
			    name: 'post',
			    sortby: 'posted',
			    sortorder: 'descending'
			},
			{
			    name: 'main_menu',
			    sortby: 'menu_index',
			    sortorder: 'descending'
			}
		],
		helpers: './src/templates/helpers/**/*.js',
        layout: 'page.hbs',
        layoutdir: './src/templates/layouts/',
        partials: './src/templates/partials/**/*.hbs',
      },
      posts: {
        files: [{
          cwd: './src/content/',
          dest: './',
          expand: true,
          src: ['**/*.md', '!pages/**/*.hbs']
        }, {
          cwd: './src/content/pages/',
          dest: './',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'connect']);

};