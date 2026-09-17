const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

const oldName = 'VEERABADHRA ENTERPRISE';
const newName = 'VEERABADHRA ENTERPRISE';

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    }
    else {
      if (file.endsWith('.js') || file.endsWith('.cjs') || file.endsWith('.json')) {
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
  
  content = content.replace(new RegExp(oldName, 'gi'), newName);
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
