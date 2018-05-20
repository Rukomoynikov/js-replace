#!/usr/bin/env node
 
/**
 * Module dependencies.
 */

var fs = require('fs')
var dirWithFiles = process.argv[2]
var configFile;
var filesWithContent = [];

if (dirWithFiles) {
  var files = fs.readdirSync(dirWithFiles);

  files.forEach(file => {
    if (file == 'config.json') {
      configFile =  JSON.parse(fs.readFileSync(`${ dirWithFiles }/${ file }`, 'utf8'))
      
    } else if (!/edited/.test(file)) {
      filesWithContent.push({
        name: file,
        content: fs.readFileSync(`${ dirWithFiles }/${ file }`, 'utf8')
      })
    }
  });

  filesWithContent.forEach(file => {
    configFile.forEach( rule => {
      file.content = file.content.replace(new RegExp(rule[0],"g"), rule[1])
    })
    fs.writeFileSync(`${ dirWithFiles }/${ file.name }.edited`, file.content, 'utf8')
  })
}
// var program = require('commander');
 
// program
//   .version('0.1.0')
//   .option('-d, --directory', 'Add directory with files')
//   // .option('-r, --replaceString', 'Add replace')
//   .parse(process.argv);
 
// if (program.directory) console.log('  - directory');

// if (fs.existsSync(file)) {
//     var content = fs.readFileSync(file);
//     debugger
// }



// if (fs.statSync(dir + '/' + file).isDirectory()) {