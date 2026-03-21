require('dotenv').config();
const express = require('express');
const knex = require('knex')(require('./knexfile'));

const app = express();
app.use(express.json());

// API index
app.get('/api', (req, res) => {
  res.json({
    name: 'Rezniqi API',
    endpoints: [
      'GET /api/health',
      'GET /api/categories',
      'GET /api/products',
      'GET /api/products?category=<slug>',
      'GET /api/products/:slug',
    ]
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await knex.raw('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Products
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  let q = knex('products')
    .join('categories', 'products.category_id', 'categories.id')
    .leftJoin('users as designers', 'products.designer_id', 'designers.id')
    .select(
      'products.*',
      'categories.slug as category_slug',
      'categories.name_al as category_name',
      'designers.name as designer_name'
    )
    .where('products.is_active', true);
  if (category) q = q.where('categories.slug', category);
  res.json(await q);
});

// Single product with images and variants
app.get('/api/products/:slug', async (req, res) => {
  const product = await knex('products')
    .join('categories', 'products.category_id', 'categories.id')
    .leftJoin('users as designers', 'products.designer_id', 'designers.id')
    .select(
      'products.*',
      'categories.slug as category_slug',
      'categories.name_al as category_name',
      'designers.name as designer_name'
    )
    .where('products.slug', req.params.slug)
    .first();
  if (!product) return res.status(404).json({ error: 'Not found' });
  product.images = await knex('product_images').where('product_id', product.id).orderBy('sort_order');
  product.variants = await knex('product_variants').where('product_id', product.id);
  product.tags = await knex('tags')
    .join('product_tags', 'tags.id', 'product_tags.tag_id')
    .where('product_tags.product_id', product.id)
    .select('tags.*');
  res.json(product);
});

// Categories
app.get('/api/categories', async (req, res) => {
  res.json(await knex('categories').select('*'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rezniqi API running on port ${PORT}`));
