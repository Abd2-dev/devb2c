#!/usr/bin/env node

const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin';

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required in environment.');
  }

  if (!email || !password) {
    throw new Error('Usage: node scripts/set-admin.js <email> <password> [name]');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();
    const adminUsers = db.collection('adminusers');

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await adminUsers.updateOne(
      { email: email.toLowerCase().trim() },
      {
        $set: {
          email: email.toLowerCase().trim(),
          passwordHash,
          name: name.trim(),
          role: 'admin',
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log(`Admin created: ${email}`);
    } else {
      console.log(`Admin updated: ${email}`);
    }
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
