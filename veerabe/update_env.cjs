const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const newDbUrl = 'postgresql://neondb_owner:npg_ThAmDOb61HVe@ep-frosty-firefly-b4n9iv63-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (fs.existsSync(envPath)) {
  let content = fs.readFileSync(envPath, 'utf8');
  content = content.replace(/DATABASE_URL=.*/g, `DATABASE_URL="${newDbUrl}"`);
  fs.writeFileSync(envPath, content, 'utf8');
  console.log('Updated .env');
} else {
  fs.writeFileSync(envPath, `DATABASE_URL="${newDbUrl}"\n`, 'utf8');
  console.log('Created .env');
}
