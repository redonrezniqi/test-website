// seeds/seed_shop.js
// Run from inside server/ dir: cd server && node ../seeds/seed_shop.js
require('dotenv').config();
const { Client } = require('pg');

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error('ERROR: DATABASE_URL not set. Copy server/.env.example to server/.env and fill it in.');
  process.exit(1);
}

const client = new Client({ connectionString: DB_URL });

// ── Helpers ───────────────────────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const img  = (seed, w = 400, h = 300) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { slug: 'trofet',     name_al: 'Trofetë & Çmimet',    name_en: 'Trophies & Awards' },
  { slug: 'pllakat',    name_al: 'Pllakat',              name_en: 'Plaques' },
  { slug: 'vulat',      name_al: 'Vulat Gome',           name_en: 'Rubber Stamps' },
  { slug: 'hapes',      name_al: 'Hapësat e Birrave',    name_en: 'Bottle Openers' },
  { slug: 'koleksione', name_al: 'Koleksionet',          name_en: 'Collections' },
];

const DESIGNS = [
  { slug: 'nene-tereza', name: 'Nënë Tereza' },
  { slug: 'skenderbeu',  name: 'Skënderbeu' },
  { slug: 'shqiponja',   name: 'Shqiponja' },
];

const DESIGNER_NAMES = [
  'Arben Gashi', 'Blerina Krasniqi', 'Driton Syla', 'Edona Berisha', 'Florie Osmani',
  'Gëzim Haxhiu', 'Hyrie Bajrami', 'Ilir Morina', 'Jeta Leka', 'Kujtim Pllana',
];

const CUSTOMER_NAMES = [
  'Liridon Aliu', 'Mimoza Ceku', 'Nita Demaj', 'Orhan Fazliu', 'Pranvera Gjoka',
  'Qendrim Halili', 'Rina Ibrahimi', 'Shkumbin Jashari', 'Teuta Kelmendi', 'Ujësjellësi Laci',
  'Valdrin Mehmeti', 'Xhejlane Neziri', 'Yllka Osmani', 'Zana Peci', 'Agim Qerimi',
  'Bukurije Ramadani', 'Cen Salihu', 'Donika Thaçi', 'Ermal Ukaj', 'Fitore Veseli',
];

const ORG_NAMES = [
  'Euro Souvenir SH.P.K.',
  'Prishtina Gift House',
  'Alb Promo & Events',
  'Kosova Wholesale Trade',
  'Adriatik Gifts Group',
];

const EXISTING_PRODUCTS = [
  { slug: 'trofe-001', name: 'Trofe Kristal Standard',   cat: 'trofet',     price: 12, qty: 8,  desc: 'Trofe elegante kristal, ideal për ceremoni dhe nderime të veçanta.' },
  { slug: 'trofe-002', name: 'Trofe Metalik Premium',    cat: 'trofet',     price: 25, qty: 5,  desc: 'Trofe metalike me gravurë të personalizuar sipas kërkesës suaj.' },
  { slug: 'trofe-003', name: 'Trofe Akril Transparent',  cat: 'trofet',     price: 18, qty: 12, desc: 'Dizajn modern me akril të pastër dhe bazë metalike.' },
  { slug: 'trofe-004', name: 'Kupa e Artë',              cat: 'trofet',     price: 35, qty: 3,  desc: 'Kupa klasike e artë — vetëm për çampionë të vërtetë.' },
  { slug: 'trofe-005', name: 'Trofe Sporti',             cat: 'trofet',     price: 20, qty: 7,  desc: 'Trofe për eventet sportive, me personalizim sipas zgjedhjes.' },
  { slug: 'pllake-001', name: 'Pllakë Druri',            cat: 'pllakat',    price: 15, qty: 10, desc: 'Pllakë druri me gravurë lazer, elegante dhe e qëndrueshme.' },
  { slug: 'pllake-002', name: 'Pllakë Metalike',         cat: 'pllakat',    price: 22, qty: 8,  desc: 'Pllakë metalike me mbajtëse, ideal për zyra dhe institucione.' },
  { slug: 'pllake-003', name: 'Pllakë Kristal',          cat: 'pllakat',    price: 28, qty: 6,  desc: 'Kristal i pastër me gravurë UV, efekt premium.' },
  { slug: 'pllake-004', name: 'Pllakë Gravure Klasike',  cat: 'pllakat',    price: 30, qty: 4,  desc: 'Pllakë klasike me gravurë manuale, për momente të paharruara.' },
  { slug: 'vule-001',  name: 'Vulë Gome Rrethore',       cat: 'vulat',      price: 8,  qty: 20, desc: 'Vulë rrethore standarde me tekst dhe logo sipas kërkesës.' },
  { slug: 'vule-002',  name: 'Vulë Gome Katrore',        cat: 'vulat',      price: 8,  qty: 20, desc: 'Vulë katrore ose drejtkëndore, në madhësi të ndryshme.' },
  { slug: 'vule-003',  name: 'Vulë Flash (me ngjyrë)',   cat: 'vulat',      price: 15, qty: 15, desc: 'Vulë me ngjyrë të integruar — nuk ka nevojë për tampon të veçantë.' },
  { slug: 'hapes-001', name: 'Hapës Metalik Klasik',     cat: 'hapes',      price: 5,  qty: 30, desc: 'Hapës metalik me gravurë, suvenir perfekt për çdo rast.' },
  { slug: 'hapes-002', name: 'Hapës me Magnet',          cat: 'hapes',      price: 6,  qty: 25, desc: 'Hapës me magnet për frigorifer — praktik dhe dekorativ njëkohësisht.' },
  { slug: 'hapes-003', name: 'Hapës Kllapa',             cat: 'hapes',      price: 7,  qty: 20, desc: 'Hapës me kllap çelësi — kombinimi më funksional i suvenirit.' },
  { slug: 'nene-tereza-stemere', name: 'Stemërevere — Nënë Tereza', cat: 'koleksione', price: 3, qty: 50, designSlug: 'nene-tereza', desc: 'Stemërevere me portretin ikonik të Nënë Terezës.' },
  { slug: 'nene-tereza-celesa',  name: 'Çelësa — Nënë Tereza',     cat: 'koleksione', price: 4, qty: 40, designSlug: 'nene-tereza', desc: 'Çelës metalik me portretin e Nënë Terezës.' },
  { slug: 'nene-tereza-magnet',  name: 'Magnet — Nënë Tereza',     cat: 'koleksione', price: 3, qty: 45, designSlug: 'nene-tereza', desc: 'Magnet frigorifer me portretin e Nënë Terezës.' },
  { slug: 'skenderbeu-stemere',  name: 'Stemërevere — Skënderbeu', cat: 'koleksione', price: 3, qty: 60, designSlug: 'skenderbeu',  desc: 'Stemërevere me figurën e heroit kombëtar Skënderbeu.' },
  { slug: 'skenderbeu-celesa',   name: 'Çelësa — Skënderbeu',      cat: 'koleksione', price: 4, qty: 35, designSlug: 'skenderbeu',  desc: 'Çelës metalik me Skënderbejin.' },
  { slug: 'skenderbeu-magnet',   name: 'Magnet — Skënderbeu',      cat: 'koleksione', price: 3, qty: 50, designSlug: 'skenderbeu',  desc: 'Magnet frigorifer Skënderbeu.' },
  { slug: 'shqiponja-stemere',   name: 'Stemërevere — Shqiponja',  cat: 'koleksione', price: 3, qty: 80, designSlug: 'shqiponja',   desc: 'Shqiponja dykrenore — simboli ynë, i gdhendur me krenari.' },
  { slug: 'shqiponja-celesa',    name: 'Çelësa — Shqiponja',       cat: 'koleksione', price: 4, qty: 60, designSlug: 'shqiponja',   desc: 'Çelës me Shqiponjën dykrenore.' },
  { slug: 'shqiponja-magnet',    name: 'Magnet — Shqiponja',       cat: 'koleksione', price: 3, qty: 70, designSlug: 'shqiponja',   desc: 'Magnet frigorifer Shqiponja.' },
];

const EXTRA_PRODUCTS = [
  { slug: 'trofe-006',   name: 'Trofe Druri Premium',         cat: 'trofet',     price: 40, qty: 4  },
  { slug: 'trofe-007',   name: 'Trofe Argjendi',              cat: 'trofet',     price: 30, qty: 6  },
  { slug: 'trofe-008',   name: 'Trofe Kristal Oval',          cat: 'trofet',     price: 22, qty: 9  },
  { slug: 'trofe-009',   name: 'Kupa e Argjendtë',            cat: 'trofet',     price: 28, qty: 5  },
  { slug: 'trofe-010',   name: 'Trofe Ekipi',                 cat: 'trofet',     price: 45, qty: 2  },
  { slug: 'pllake-005',  name: 'Pllakë Bambu',                cat: 'pllakat',    price: 18, qty: 7  },
  { slug: 'pllake-006',  name: 'Pllakë Xhami',               cat: 'pllakat',    price: 25, qty: 5  },
  { slug: 'pllake-007',  name: 'Pllakë Mermeri',             cat: 'pllakat',    price: 50, qty: 3  },
  { slug: 'pllake-008',  name: 'Pllakë Alumini',             cat: 'pllakat',    price: 20, qty: 8  },
  { slug: 'vule-004',    name: 'Vulë Datër Automatike',       cat: 'vulat',      price: 12, qty: 18 },
  { slug: 'vule-005',    name: 'Vulë Ovale',                  cat: 'vulat',      price: 9,  qty: 22 },
  { slug: 'vule-006',    name: 'Vulë Drejtkëndore Flash',     cat: 'vulat',      price: 18, qty: 10 },
  { slug: 'hapes-004',   name: 'Hapës Vintage Bronzi',        cat: 'hapes',      price: 9,  qty: 15 },
  { slug: 'hapes-005',   name: 'Hapës me Zinxhir',            cat: 'hapes',      price: 8,  qty: 20 },
  { slug: 'hapes-006',   name: 'Hapës Kllap Premium',         cat: 'hapes',      price: 10, qty: 12 },
  { slug: 'prizren-001', name: 'Stemërevere — Prizreni',      cat: 'koleksione', price: 3,  qty: 55, designSlug: 'shqiponja' },
  { slug: 'prizren-002', name: 'Çelësa — Prizreni',           cat: 'koleksione', price: 4,  qty: 45, designSlug: 'shqiponja' },
  { slug: 'prizren-003', name: 'Magnet — Prizreni',           cat: 'koleksione', price: 3,  qty: 60, designSlug: 'shqiponja' },
  { slug: 'gjak-001',    name: 'Stemërevere — Gjakova',       cat: 'koleksione', price: 3,  qty: 40, designSlug: 'skenderbeu' },
  { slug: 'gjak-002',    name: 'Magnet — Gjakova',            cat: 'koleksione', price: 3,  qty: 35, designSlug: 'skenderbeu' },
  { slug: 'peje-001',    name: 'Stemërevere — Peja',          cat: 'koleksione', price: 3,  qty: 45, designSlug: 'shqiponja' },
  { slug: 'peje-002',    name: 'Magnet — Peja',               cat: 'koleksione', price: 3,  qty: 40, designSlug: 'shqiponja' },
  { slug: 'mitro-001',   name: 'Stemërevere — Mitrovica',     cat: 'koleksione', price: 3,  qty: 38, designSlug: 'skenderbeu' },
  { slug: 'mitro-002',   name: 'Magnet — Mitrovica',          cat: 'koleksione', price: 3,  qty: 32, designSlug: 'skenderbeu' },
  { slug: 'trofe-011',   name: 'Trofe Akrilik Gravurë Lazer', cat: 'trofet',     price: 32, qty: 6  },
  { slug: 'vule-007',    name: 'Vulë Gome Ovale Flash',       cat: 'vulat',      price: 16, qty: 12 },
];

const ALL_PRODUCTS = [...EXISTING_PRODUCTS, ...EXTRA_PRODUCTS].map(p => ({
  ...p,
  desc: p.desc || `${p.name} — produkt cilësor nga uzina Rezniqi.`,
}));

const TAGS = [
  { slug: 'gravure',      name: 'Gravurë' },
  { slug: 'personalizim', name: 'Personalizim' },
  { slug: 'lazer',        name: 'Lazer' },
  { slug: 'metalik',      name: 'Metalik' },
  { slug: 'kristal',      name: 'Kristal' },
  { slug: 'druri',        name: 'Druri' },
  { slug: 'suvenir',      name: 'Suvenir' },
  { slug: 'sport',        name: 'Sport' },
  { slug: 'biznes',       name: 'Biznes' },
  { slug: 'ceremoni',     name: 'Ceremoni' },
  { slug: 'kulturor',     name: 'Kulturor' },
  { slug: 'kombetare',    name: 'Kombëtare' },
];

const CATEGORY_TAG_MAP = {
  trofet:     ['gravure', 'personalizim', 'metalik', 'kristal', 'sport', 'ceremoni'],
  pllakat:    ['gravure', 'lazer', 'druri', 'metalik', 'kristal', 'biznes'],
  vulat:      ['personalizim', 'biznes'],
  hapes:      ['metalik', 'suvenir', 'personalizim'],
  koleksione: ['suvenir', 'kulturor', 'kombetare'],
};

const VARIANT_MAP = {
  trofet:     [['E Vogël', 0], ['Mesatare', 5], ['E Madhe', 10]],
  pllakat:    [['Standard', 0], ['Premium', 8]],
  vulat:      [['28mm', 0], ['40mm', 3], ['58mm', 6]],
  hapes:      [['Standard', 0], ['Me Gravurë', 2]],
  koleksione: [['E Vogël', 0], ['E Madhe', 1]],
};

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'completed', 'completed', 'completed'];

// ── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
  await client.connect();
  console.log('Connected to DB');

  try {
    await client.query('BEGIN');

    // ── Categories ────────────────────────────────────────────────────────────
    console.log('Inserting categories...');
    const catIdMap = {};
    for (const c of CATEGORIES) {
      const r = await client.query(
        `INSERT INTO categories (slug, name_al, name_en)
         VALUES ($1,$2,$3) ON CONFLICT (slug) DO UPDATE SET name_al=EXCLUDED.name_al
         RETURNING id`,
        [c.slug, c.name_al, c.name_en]
      );
      catIdMap[c.slug] = r.rows[0].id;
    }

    // ── Designs ───────────────────────────────────────────────────────────────
    console.log('Inserting designs...');
    const designIdMap = {};
    for (const d of DESIGNS) {
      const r = await client.query(
        `INSERT INTO designs (slug, name)
         VALUES ($1,$2) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name
         RETURNING id`,
        [d.slug, d.name]
      );
      designIdMap[d.slug] = r.rows[0].id;
    }

    // ── Designer users ────────────────────────────────────────────────────────
    console.log('Inserting designers...');
    const designerIds = [];
    for (let i = 0; i < DESIGNER_NAMES.length; i++) {
      const name = DESIGNER_NAMES[i];
      const email = name.toLowerCase().replace(/\s+/g, '.').replace(/[ëêç]/g, 'e') + '@rezniqi.net';
      const r = await client.query(
        `INSERT INTO users (email, name, role, royalty_rate)
         VALUES ($1,$2,'designer',$3) ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name
         RETURNING id`,
        [email, name, (0.08 + i * 0.01).toFixed(2)]
      );
      designerIds.push(r.rows[0].id);
    }

    // ── Customer users ────────────────────────────────────────────────────────
    console.log('Inserting customers...');
    const customerIds = [];
    for (const name of CUSTOMER_NAMES) {
      const email = name.toLowerCase().replace(/\s+/g, '.').replace(/[ëêçë]/g, 'e') + '@gmail.com';
      const r = await client.query(
        `INSERT INTO users (email, name, role)
         VALUES ($1,$2,'customer') ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name
         RETURNING id`,
        [email, name]
      );
      customerIds.push(r.rows[0].id);
    }

    // ── Organizations ─────────────────────────────────────────────────────────
    console.log('Inserting organizations...');
    const orgIds = [];
    for (let i = 0; i < ORG_NAMES.length; i++) {
      const name = ORG_NAMES[i];
      const email = 'info@' + name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '') + '.com';
      const r = await client.query(
        `INSERT INTO organizations (name, type, contact_email, discount_rate)
         VALUES ($1,'wholesale',$2,$3)
         ON CONFLICT (name) DO UPDATE SET contact_email=EXCLUDED.contact_email
         RETURNING id`,
        [name, email, (0.10 + i * 0.02).toFixed(2)]
      );
      orgIds.push(r.rows[0].id);
    }

    // Link some customers to orgs
    for (let i = 0; i < 8; i++) {
      await client.query(
        `INSERT INTO user_organizations (user_id, org_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [customerIds[i], orgIds[i % orgIds.length]]
      );
    }

    // ── Tags ──────────────────────────────────────────────────────────────────
    console.log('Inserting tags...');
    const tagIdMap = {};
    for (const t of TAGS) {
      const r = await client.query(
        `INSERT INTO tags (slug, name) VALUES ($1,$2) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [t.slug, t.name]
      );
      tagIdMap[t.slug] = r.rows[0].id;
    }

    // ── Products ──────────────────────────────────────────────────────────────
    console.log('Inserting products...');
    const productIds = [];
    for (let i = 0; i < ALL_PRODUCTS.length; i++) {
      const p = ALL_PRODUCTS[i];
      const designIdx  = p.designSlug ? DESIGNS.findIndex(d => d.slug === p.designSlug) : -1;
      const designerId = designIdx >= 0 ? designerIds[designIdx % designerIds.length] : null;
      const designId   = p.designSlug ? designIdMap[p.designSlug] : null;

      const r = await client.query(
        `INSERT INTO products (slug, name, category_id, design_id, designer_id, price, description, stock_qty)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, price=EXCLUDED.price
         RETURNING id`,
        [p.slug, p.name, catIdMap[p.cat], designId, designerId, p.price, p.desc, p.qty]
      );
      const pid = r.rows[0].id;
      productIds.push({ id: pid, slug: p.slug, cat: p.cat, price: p.price });

      // Images: 1–3 per product
      const imgCount = rand(1, 3);
      for (let j = 0; j < imgCount; j++) {
        await client.query(
          `INSERT INTO product_images (product_id, url, is_primary, sort_order) VALUES ($1,$2,$3,$4)
           ON CONFLICT DO NOTHING`,
          [pid, img(p.slug + '-' + j), j === 0, j]
        );
      }

      // Variants
      const variants = VARIANT_MAP[p.cat] || [['Standard', 0]];
      for (const [label, mod] of variants) {
        await client.query(
          `INSERT INTO product_variants (product_id, label, price_modifier, stock_qty) VALUES ($1,$2,$3,$4)`,
          [pid, label, mod, rand(2, 15)]
        );
      }

      // Tags
      const tagSlugs = CATEGORY_TAG_MAP[p.cat] || [];
      for (const ts of tagSlugs.slice(0, rand(2, 4))) {
        if (tagIdMap[ts]) {
          await client.query(
            `INSERT INTO product_tags (product_id, tag_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
            [pid, tagIdMap[ts]]
          );
        }
      }
    }

    // ── Orders ────────────────────────────────────────────────────────────────
    console.log('Inserting orders...');
    for (let o = 0; o < 15; o++) {
      const userId    = pick(customerIds);
      const orgId     = o < 5 ? pick(orgIds) : null;
      const status    = pick(ORDER_STATUSES);
      const itemCount = rand(1, 4);
      let total = 0;
      const items = [];

      for (let ii = 0; ii < itemCount; ii++) {
        const prod = pick(productIds);
        const qty  = rand(1, 3);
        total += prod.price * qty;
        items.push({ prod, qty, unit_price: prod.price });
      }

      const orderRes = await client.query(
        `INSERT INTO orders (user_id, org_id, status, total) VALUES ($1,$2,$3,$4) RETURNING id`,
        [userId, orgId, status, total.toFixed(2)]
      );
      const orderId = orderRes.rows[0].id;

      for (const item of items) {
        const itemRes = await client.query(
          `INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES ($1,$2,$3,$4) RETURNING id`,
          [orderId, item.prod.id, item.qty, item.unit_price]
        );
        const orderItemId = itemRes.rows[0].id;

        // Royalty if product has a designer
        const prod = ALL_PRODUCTS.find(p => p.slug === item.prod.slug);
        if (prod && prod.designSlug) {
          const dIdx       = DESIGNS.findIndex(d => d.slug === prod.designSlug) % designerIds.length;
          const designerId = designerIds[dIdx];
          const rate       = 0.08 + dIdx * 0.01;
          const amount     = (item.unit_price * item.qty * rate).toFixed(2);
          await client.query(
            `INSERT INTO royalties (designer_id, order_item_id, amount, paid_at) VALUES ($1,$2,$3,$4)`,
            [designerId, orderItemId, amount, status === 'completed' ? new Date() : null]
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log('\n✓ Seed complete!');
    console.log(`  Categories : ${CATEGORIES.length}`);
    console.log(`  Designs    : ${DESIGNS.length}`);
    console.log(`  Designers  : ${DESIGNER_NAMES.length}`);
    console.log(`  Customers  : ${CUSTOMER_NAMES.length}`);
    console.log(`  Orgs       : ${ORG_NAMES.length}`);
    console.log(`  Products   : ${ALL_PRODUCTS.length}`);
    console.log(`  Orders     : 15`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed, rolled back:', err.message);
    throw err;
  } finally {
    await client.end();
  }
}

seed().catch(() => process.exit(1));
