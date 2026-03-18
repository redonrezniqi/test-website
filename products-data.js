const PRODUCTS = [
  // Trofetë
  { id: 'trofe-001', name: 'Trofe Kristal Standard', category: 'trofet', price: 12, qty: 8, designId: null, desc: 'Trofe elegante kristal, ideal për ceremoni dhe nderime të veçanta.' },
  { id: 'trofe-002', name: 'Trofe Metalik Premium', category: 'trofet', price: 25, qty: 5, designId: null, desc: 'Trofe metalike me gravurë të personalizuar sipas kërkesës suaj.' },
  { id: 'trofe-003', name: 'Trofe Akril Transparent', category: 'trofet', price: 18, qty: 12, designId: null, desc: 'Dizajn modern me akril të pastër dhe bazë metalike.' },
  { id: 'trofe-004', name: 'Kupa e Artë', category: 'trofet', price: 35, qty: 3, designId: null, desc: 'Kupa klasike e artë — vetëm për çampionë të vërtetë.' },
  { id: 'trofe-005', name: 'Trofe Sporti', category: 'trofet', price: 20, qty: 7, designId: null, desc: 'Trofe për eventet sportive, me personalizim sipas zgjedhjes.' },

  // Pllakat
  { id: 'pllake-001', name: 'Pllakë Druri', category: 'pllakat', price: 15, qty: 10, designId: null, desc: 'Pllakë druri me gravurë lazer, elegante dhe e qëndrueshme.' },
  { id: 'pllake-002', name: 'Pllakë Metalike', category: 'pllakat', price: 22, qty: 8, designId: null, desc: 'Pllakë metalike me mbajtëse, ideal për zyra dhe institucione.' },
  { id: 'pllake-003', name: 'Pllakë Kristal', category: 'pllakat', price: 28, qty: 6, designId: null, desc: 'Kristal i pastër me gravurë UV, efekt premium.' },
  { id: 'pllake-004', name: 'Pllakë Gravure Klasike', category: 'pllakat', price: 30, qty: 4, designId: null, desc: 'Pllakë klasike me gravurë manuale, për momente të paharruara.' },

  // Vulat Gome
  { id: 'vule-001', name: 'Vulë Gome Rrethore', category: 'vulat', price: 8, qty: 20, designId: null, desc: 'Vulë rrethore standarde me tekst dhe logo sipas kërkesës.' },
  { id: 'vule-002', name: 'Vulë Gome Katrore', category: 'vulat', price: 8, qty: 20, designId: null, desc: 'Vulë katrore ose drejtkëndore, në madhësi të ndryshme.' },
  { id: 'vule-003', name: 'Vulë Flash (me ngjyrë)', category: 'vulat', price: 15, qty: 15, designId: null, desc: 'Vulë me ngjyrë të integruar — nuk ka nevojë për tampon të veçantë.' },

  // Hapësat e Birrave
  { id: 'hapes-001', name: 'Hapës Metalik Klasik', category: 'hapes', price: 5, qty: 30, designId: null, desc: 'Hapës metalik me gravurë, suvenir perfekt për çdo rast.' },
  { id: 'hapes-002', name: 'Hapës me Magnet', category: 'hapes', price: 6, qty: 25, designId: null, desc: 'Hapës me magnet për frigorifer — praktik dhe dekorativ njëkohësisht.' },
  { id: 'hapes-003', name: 'Hapës Kllapa', category: 'hapes', price: 7, qty: 20, designId: null, desc: 'Hapës me kllap çelësi — kombinimi më funksional i suvenirit.' },

  // Koleksionet — Nënë Tereza
  { id: 'nene-tereza-stemere', name: 'Stemërevere — Nënë Tereza', category: 'koleksione', price: 3, qty: 50, designId: 'nene-tereza', desc: 'Stemërevere me portretin ikonik të Nënë Terezës, e realizuar me saktësi.' },
  { id: 'nene-tereza-celesa', name: 'Çelësa — Nënë Tereza', category: 'koleksione', price: 4, qty: 40, designId: 'nene-tereza', desc: 'Çelës metalik me portretin e Nënë Terezës — një copë histori në xhep.' },
  { id: 'nene-tereza-magnet', name: 'Magnet — Nënë Tereza', category: 'koleksione', price: 3, qty: 45, designId: 'nene-tereza', desc: 'Magnet frigorifer me portretin e Nënë Terezës, prodhim vendor.' },

  // Koleksionet — Skënderbeu
  { id: 'skenderbeu-stemere', name: 'Stemërevere — Skënderbeu', category: 'koleksione', price: 3, qty: 60, designId: 'skenderbeu', desc: 'Stemërevere me figurën e heroit kombëtar Gjergj Kastrioti Skënderbeu.' },
  { id: 'skenderbeu-celesa', name: 'Çelësa — Skënderbeu', category: 'koleksione', price: 4, qty: 35, designId: 'skenderbeu', desc: 'Çelës metalik me Skënderbejin — simbol i krenarisë kombëtare.' },
  { id: 'skenderbeu-magnet', name: 'Magnet — Skënderbeu', category: 'koleksione', price: 3, qty: 50, designId: 'skenderbeu', desc: 'Magnet frigorifer Skënderbeu, çdo prodhim me cilësi vendore.' },

  // Koleksionet — Shqiponja
  { id: 'shqiponja-stemere', name: 'Stemërevere — Shqiponja', category: 'koleksione', price: 3, qty: 80, designId: 'shqiponja', desc: 'Shqiponja dykrenore — simboli ynë, i gdhendur me krenari.' },
  { id: 'shqiponja-celesa', name: 'Çelësa — Shqiponja', category: 'koleksione', price: 4, qty: 60, designId: 'shqiponja', desc: 'Çelës me Shqiponjën dykrenore, i disponueshëm me gravurë personale.' },
  { id: 'shqiponja-magnet', name: 'Magnet — Shqiponja', category: 'koleksione', price: 3, qty: 70, designId: 'shqiponja', desc: 'Magnet frigorifer Shqiponja — bërë me dashuri vendore.' },
];

const DESIGN_NAMES = {
  'nene-tereza': 'Nënë Tereza',
  'skenderbeu': 'Skënderbeu',
  'shqiponja': 'Shqiponja',
};

const CATEGORY_NAMES = {
  'trofet': 'Trofetë & Çmimet',
  'pllakat': 'Pllakat',
  'vulat': 'Vulat Gome',
  'hapes': 'Hapësat e Birrave',
  'koleksione': 'Koleksionet',
};
