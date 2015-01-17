module.exports = function(config) {
  config.set({

  	basePath : './',
  	
  	files :[
  		'spec/*.js',
      {pattern: 'snap/*.js', watched: true, included: true, served: true},
      {pattern: 'refactoring/*.js', watched: true, included: true, served: true},
      {pattern: 'fixtures/*.html', watched: true, included: false, served: true}
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