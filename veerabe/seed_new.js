const pool = require('./db');

async function seed() {
  try {
    console.log('Clearing existing categories and products...');
    await pool.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE categories RESTART IDENTITY CASCADE');

    const categories = [
      { name: 'Diyas', image_url: '/images/pooja/brass_diya.png' },
      { name: 'Idols', image_url: '/images/pooja/ganesha_idol.png' },
      { name: 'Camphor', image_url: '/images/pooja/camphor.png' },
      { name: 'Thalis', image_url: '/images/pooja/silver_thali.png' },
      { name: 'Pooja Kits', image_url: '/images/pooja/silver_thali.png' },
      { name: 'Agarbatti', image_url: '/images/pooja/camphor.png' },
      { name: 'Kumkum', image_url: '/images/pooja/brass_diya.png' }
    ];

    console.log('Seeding categories...');
    for (const cat of categories) {
      await pool.query(
        'INSERT INTO categories (name, models, image_url) VALUES ($1, $2, $3)',
        [cat.name, '[]', cat.image_url]
      );
    }

    console.log('Generating and seeding 100+ products...');
    
    // Procedurally generate 100+ products
    const materials = ['Brass', 'Copper', 'Silver', 'Panchaloha', 'Clay', 'Wooden'];
    const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
    const baseItems = [
      { type: 'Diya', cat: 'Diyas', img: '/images/pooja/brass_diya.png', basePrice: 150 },
      { type: 'Ganesha Idol', cat: 'Idols', img: '/images/pooja/ganesha_idol.png', basePrice: 800 },
      { type: 'Shiva Lingam', cat: 'Idols', img: '/images/pooja/ganesha_idol.png', basePrice: 1200 },
      { type: 'Krishna Idol', cat: 'Idols', img: '/images/pooja/ganesha_idol.png', basePrice: 1500 },
      { type: 'Camphor Jar', cat: 'Camphor', img: '/images/pooja/camphor.png', basePrice: 100 },
      { type: 'Aarti Thali', cat: 'Thalis', img: '/images/pooja/silver_thali.png', basePrice: 500 },
      { type: 'Sandalwood Agarbatti', cat: 'Agarbatti', img: '/images/pooja/camphor.png', basePrice: 50 },
      { type: 'Rose Agarbatti', cat: 'Agarbatti', img: '/images/pooja/camphor.png', basePrice: 60 },
      { type: 'Kumkum Box', cat: 'Kumkum', img: '/images/pooja/brass_diya.png', basePrice: 200 },
      { type: 'Haldi Kumkum Combo', cat: 'Kumkum', img: '/images/pooja/brass_diya.png', basePrice: 250 },
      { type: 'Navratri Pooja Kit', cat: 'Pooja Kits', img: '/images/pooja/silver_thali.png', basePrice: 1500 },
      { type: 'Diwali Pooja Box', cat: 'Pooja Kits', img: '/images/pooja/silver_thali.png', basePrice: 2000 }
    ];

    let productsData = [];
    
    // First, add a few static high quality ones we had before
    productsData.push({
      name: 'Brass Kuber Diya',
      description: 'Traditional brass diya for daily pooja.',
      category: 'Diyas',
      color: 'Gold',
      price: 250,
      image_url: '/images/pooja/brass_diya.png'
    });
    
    let count = 0;
    while(productsData.length < 120) {
      for (const item of baseItems) {
        const material = materials[Math.floor(Math.random() * materials.length)];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        let name = item.type;
        if (item.cat === 'Idols' || item.cat === 'Diyas' || item.cat === 'Thalis') {
          name = `${material} ${item.type} (${size})`;
        } else if (item.cat === 'Agarbatti' || item.cat === 'Camphor' || item.cat === 'Kumkum') {
          name = `Premium ${item.type} - ${size} Pack`;
        } else {
          name = `Special ${item.type}`;
        }
        
        let price = item.basePrice;
        if (size === 'Medium') price *= 1.5;
        if (size === 'Large') price *= 2.0;
        if (size === 'Extra Large') price *= 2.5;
        if (material === 'Silver') price *= 3;
        
        productsData.push({
          name: name,
          description: `Authentic ${name} perfect for your daily spiritual needs.`,
          category: item.cat,
          color: material === 'Silver' ? 'Silver' : (material === 'Brass' || material === 'Copper' ? 'Gold' : 'Mixed'),
          price: Math.floor(price),
          image_url: item.img
        });
        
        count++;
        if(productsData.length >= 120) break;
      }
    }

    // Insert to DB
    for (const p of productsData) {
      const sizesJson = JSON.stringify([
        { size: 'Standard', price: p.price }
      ]);
      const imagesJson = JSON.stringify([p.image_url]);
      
      await pool.query(
        'INSERT INTO products (name, description, sizes, stock, image_url, images, color, category, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [p.name, p.description, sizesJson, 50, p.image_url, imagesJson, p.color, p.category, true]
      );
    }

    console.log(`✅ Seeding complete! Inserted ${productsData.length} products.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
