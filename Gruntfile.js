module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
  	babel: {
  		options: {
  			sourceMap: true,
  			presets: ['babel-preset-es2015']
  		},
  		dist: {
  			files: {
  				'dist/main.js': 'js/main.js',
          'dist/ai-player.js': 'js/ai-player.js',
          'dist/keybindings.js': 'js/keybindings.js',
          'dist/num.js': 'js/num.js',
          'dist/db.js': 'js/db.js'
  			}
  		}
  	}
  });

  grunt.registerTask('default', ['babel']);

}
