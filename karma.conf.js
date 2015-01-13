module.exports = function(config) {
  config.set({

  	basePath : './',
  	
  	files :[
  		'spec/*.js',
      {pattern: 'src/*.js', watched: true, included: true, served: true}
  	],

  	autoWatch : true,
    frameworks: ['jquery-1.11.0','jasmine-jquery','jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-firefox-launcher',
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-jquery'
            ],
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};