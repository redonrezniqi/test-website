-- migrations/001_create_shop_schema.sql
-- Rezniqi Shop Schema
-- Run with: psql $DATABASE_URL -f migrations/001_create_shop_schema.sql

BEGIN;

-- Categories (trofet, pllakat, vulat, hapes, koleksione)
CREATE TABLE IF NOT EXISTS categories (
  id        SERIAL PRIMARY KEY,
  slug      VARCHAR(50)  UNIQUE NOT NULL,
  name_al   VARCHAR(100) NOT NULL,
  name_en   VARCHAR(100)
);

-- Design collections (cultural series like Nënë Tereza, Skënderbeu)
CREATE TABLE IF NOT EXISTS designs (
  id      SERIAL PRIMARY KEY,
  slug    VARCHAR(50)  UNIQUE NOT NULL,
  name    VARCHAR(100) NOT NULL
);

-- Users: designers and customers
CREATE TABLE IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  name         VARCHAR(255) NOT NULL,
  role         VARCHAR(20)  NOT NULL CHECK (role IN ('designer','customer','admin')),
  royalty_rate NUMERIC(5,2) DEFAULT 0.10,
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

-- Organizations: wholesale buyers
CREATE TABLE IF NOT EXISTS organizations (
  id             SERIAL PRIMARY KEY,
  name           VARCHAR(255) NOT NULL UNIQUE,
  type           VARCHAR(50)  DEFAULT 'wholesale',
  contact_email  VARCHAR(255),
  discount_rate  NUMERIC(5,2) DEFAULT 0.15,
  created_at     TIMESTAMPTZ  DEFAULT NOW()
);

-- Link customers to organizations
CREATE TABLE IF NOT EXISTS user_organizations (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  org_id  INT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, org_id)
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  category_id INT          NOT NULL REFERENCES categories(id),
  design_id   INT          REFERENCES designs(id),
  designer_id INT          REFERENCES users(id),
  price       NUMERIC(10,2) NOT NULL,
  description TEXT,
  stock_qty   INT           DEFAULT 0,
  is_active   BOOLEAN       DEFAULT TRUE,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- Product variants (size, material, etc.)
CREATE TABLE IF NOT EXISTS product_variants (
  id             SERIAL PRIMARY KEY,
  product_id     INT          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label          VARCHAR(100) NOT NULL,
  price_modifier NUMERIC(10,2) DEFAULT 0.00,
  stock_qty      INT           DEFAULT 0
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
  id         SERIAL PRIMARY KEY,
  product_id INT          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url        VARCHAR(500) NOT NULL,
  is_primary BOOLEAN      DEFAULT FALSE,
  sort_order INT          DEFAULT 0
);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id   SERIAL PRIMARY KEY,
  slug VARCHAR(50)  UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- Product <-> Tag (many-to-many)
CREATE TABLE IF NOT EXISTS product_tags (
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag_id     INT NOT NULL REFERENCES tags(id)     ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id         SERIAL PRIMARY KEY,
  user_id    INT         NOT NULL REFERENCES users(id),
  org_id     INT         REFERENCES organizations(id),
  status     VARCHAR(50) DEFAULT 'pending'
               CHECK (status IN ('pending','processing','shipped','completed','cancelled')),
  total      NUMERIC(10,2) NOT NULL,
  notes      TEXT,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);

-- Order line items
CREATE TABLE IF NOT EXISTS order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  variant_id INT          REFERENCES product_variants(id),
  qty        INT          NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL
);

-- Royalties owed to designers
CREATE TABLE IF NOT EXISTS royalties (
  id            SERIAL PRIMARY KEY,
  designer_id   INT NOT NULL REFERENCES users(id),
  order_item_id INT NOT NULL REFERENCES order_items(id),
  amount        NUMERIC(10,2) NOT NULL,
  paid_at       TIMESTAMPTZ
);

COMMIT;
