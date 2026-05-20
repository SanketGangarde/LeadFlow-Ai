global.crypto = require('crypto');
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    // 1. Connect to database
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully!');

    // 2. Check if admin already exists
    let admin = await Admin.findOne({ username: 'admin' });
    if (admin) {
      console.log('Admin account already exists! Updating password to admin123...');
      admin.password = 'admin123';
      await admin.save();
      console.log('✅ Admin password updated successfully!');
      process.exit(0);
    }

    // 3. Create default admin
    const newAdmin = new Admin({
      username: 'admin',
      password: 'admin123' // Hashing happens automatically in the Admin model pre-save hook
    });

    await newAdmin.save();
    console.log('✅ Default admin account seeded successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding admin failed:', error);
    process.exit(1);
  }
};

seedAdmin();
