process.env.NODE_ENV = 'production';
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const babel = require('@babel/core');
const preset = require('babel-preset-react-app');
const files = glob.sync('src/**/*.@(js|jsx|ts|tsx)', { nodir: true });
let hasError = false;
for (const file of files) {
  try {
    babel.transformSync(fs.readFileSync(file, 'utf8'), { filename: file, presets: [preset] });
  } catch (error) {
    hasError = true;
    console.error('Error in ' + file + ':');
    console.error(error.message);
  }
}
if (!hasError) {
  console.log('All files transformed successfully');
}
