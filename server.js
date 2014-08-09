#! /home/ubuntu/.nvm/v0.10.26/bin/node

var fs = require('fs');

var chars = " abcdefghijklmnopqrstuvwxyz".split('');

var offset = 13;

function dealWithRotation(content, offset){
  var result = content.split(' ').map(function(index, idx){
    var lookup = parseInt(index, 0);
    if (lookup !== 0) {
      lookup += offset;
    }
    if (lookup > 26) {
      lookup %= 26;
    }
    return chars[lookup];
  }).join("");
  console.log(result);  
}

function dealWithAscii(content) {
  var result = content.split('\n').map(function(line){
    return line.split(' ').map(function(code, idx){
      return String.fromCharCode(code);
    }).join("");
  });
  console.log(result);
}

function dealWithBinary(content) {
  var result = content.split('\n').map(function(line){
    return line.split(' ').map(function(char){
      return parseInt(char, 2);
    }).join(' ');
  }).join('\n');
  console.log(result);
}

function fromHex(content) {
  return content.split(' ').map(function(hex){
    return parseInt(hex, 16);
  }).join(' ');
}

function stringToNum(content) {
  return content.split('').map(function(letter){
    return chars.indexOf(letter);
  }).join(' ');
}

process.argv.shift(); // node
process.argv.shift(); // server
var arg;
for( ; arg = process.argv.shift() ;) {
  arg = arg.split(':');
  fs.readFile(arg[0], 'utf-8', (function(program){
    return function(err, content){
      if (program === '0' || program === '2') {
        if (program === '2') {
          // convert ascii to numbers for rotation
          content = stringToNum(content);
        }
        
        // rotation cypher
        for (var i = 0; i < 27; i++) {
            dealWithRotation(content, i);
        } 
      } else if (program === '1' || program === '4') {
        // ascii
        if (program === '4') {
          content = fromHex(content);
        }
        
        dealWithAscii(content);
      } else if (program === '3') {
        // binary
        dealWithBinary(content);
      }
    };
  }(arg[1])));  
}

