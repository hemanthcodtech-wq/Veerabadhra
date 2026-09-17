const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const oldName = 'UP Traders';
const newName = 'VEERABADHRA ENTERPRISE';

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

let files = walkSync(directoryPath);
files.push(path.join(__dirname, 'index.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(new RegExp(oldName, 'g'), newName);
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
