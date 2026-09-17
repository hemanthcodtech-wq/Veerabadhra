const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const oldGreen = '#106935';
const oldGreen2 = '#0a4722'; // hover state of old green
const oldOrange = '#F29D38';
const oldBeige = '#FDF8F0';
const oldBeige2 = '#F4EBE0';

const newGreen = '#1B5E20';
const newGreen2 = '#0d3b13'; // hover state of new green
const newOrange = '#FF6D00';
const newBeige = '#FFF8E1';
const newBeige2 = '#FFECB3';

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

let files = walkSync(directoryPath);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace case insensitive
  content = content.replace(new RegExp(oldGreen, 'gi'), newGreen);
  content = content.replace(new RegExp(oldGreen2, 'gi'), newGreen2);
  content = content.replace(new RegExp(oldOrange, 'gi'), newOrange);
  content = content.replace(new RegExp(oldBeige, 'gi'), newBeige);
  content = content.replace(new RegExp(oldBeige2, 'gi'), newBeige2);
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated colors in ${file}`);
  }
});
