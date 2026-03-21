-- seeds/002_seed_shop_data.sql
-- Reference SQL seed (categories, designs, tags).
-- For full demo data (products, users, orders), use: cd server && node ../seeds/seed_shop.js

BEGIN;

INSERT INTO categories (slug, name_al, name_en) VALUES
  ('trofet',     'Trofetë & Çmimet', 'Trophies & Awards'),
  ('pllakat',    'Pllakat',           'Plaques'),
  ('vulat',      'Vulat Gome',        'Rubber Stamps'),
  ('hapes',      'Hapësat e Birrave', 'Bottle Openers'),
  ('koleksione', 'Koleksionet',       'Collections')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO designs (slug, name) VALUES
  ('nene-tereza', 'Nënë Tereza'),
  ('skenderbeu',  'Skënderbeu'),
  ('shqiponja',   'Shqiponja')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (slug, name) VALUES
  ('gravure',      'Gravurë'),
  ('personalizim', 'Personalizim'),
  ('lazer',        'Lazer'),
  ('metalik',      'Metalik'),
  ('kristal',      'Kristal'),
  ('druri',        'Druri'),
  ('suvenir',      'Suvenir'),
  ('sport',        'Sport'),
  ('biznes',       'Biznes'),
  ('ceremoni',     'Ceremoni'),
  ('kulturor',     'Kulturor'),
  ('kombetare',    'Kombëtare')
ON CONFLICT (slug) DO NOTHING;

COMMIT;
