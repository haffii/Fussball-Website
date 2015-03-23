module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      foo: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/controllers/*.js",
        ],
       
      },
     
    },
     uglify: {
            build: {
                files: {                 
                  'build/fusball.min.js': ['src/js/*.js','src/js/services/*.js','src/js/controllers/*.js']
                }
              }
            
        },
      
  });

 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint','uglify'] );
};