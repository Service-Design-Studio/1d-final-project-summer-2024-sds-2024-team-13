const common = [
    'src/features/**/*.feature',                // Specify our feature files
    '--require-module @babel/register',         // Load Babel module
    '--require src/features/steps/*.steps.js',  // Load step definitions
    '--format progress',                        // Use the progress formatter
  ].join(' ');
  
  module.exports = {
    default: common,
  };