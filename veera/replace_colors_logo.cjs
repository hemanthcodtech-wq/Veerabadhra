const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');
const tailwindFile = path.join(__dirname, 'tailwind.config.js');

// Current (Pooja theme)
const oldGreen = '#1B5E20';
const oldGreenHover = '#0d3b13';
const oldOrange = '#FF6D00';
const oldBeige = '#FFF8E1';
const oldBeigeDarker = '#FFECB3';

// New (Logo exact theme)
const newGreen = '#073020'; // Deep Emerald Green
const newGreenHover = '#041f15';
const newOrange = '#D4AF37'; // Metallic Gold
const newBeige = '#FDF7E5'; // Soft warm cream
const newBeigeDarker = '#E8D190'; // Muted gold for darker beige

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
files.push(tailwindFile);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace case insensitive
  content = content.replace(new RegExp(oldGreen, 'gi'), newGreen);
  content = content.replace(new RegExp(oldGreenHover, 'gi'), newGreenHover);
  content = content.replace(new RegExp(oldOrange, 'gi'), newOrange);
  content = content.replace(new RegExp(oldBeige, 'gi'), newBeige);
  content = content.replace(new RegExp(oldBeigeDarker, 'gi'), newBeigeDarker);
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated colors in ${file}`);
  }
});
