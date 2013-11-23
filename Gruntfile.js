module.exports = function(grunt) {
  grunt.initConfig({
    uglify : {
      options: {
        banner: '/*! normalRandomGenerator.js <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: 'normalRandomGenerator.map'
      },
      dist: {
        files: {
          '/normalRandomGenerator-min.js': ['/js/normalRandomGenerator.js']
        }
      }
    },
    watch: {
      files: ['/js/normalRandomGenerator.js'],
      tasks: ['uglify']
    }
  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [ 'uglify' ]);

}