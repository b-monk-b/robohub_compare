const { createClient } = require('@supabase/supabase-js');

// Simple slugify function
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Robot data from the provided image
const robots = [
  // Industrial Robots
  {
    name: 'IRB 6700',
    brand: 'ABB',
    model: 'IRB 6700',
    type: 'Articulated',
    application: 'Material Handling, Machine Tending, Assembly',
    payload_kg: 150,
    reach_m: 2.6,
    price_range: 'High',
    price_min_inr: 4500000,
    price_max_inr: 6000000,
    description: 'High-performance industrial robot with large working envelope and high payload capacity.',
    features: [
      'High payload capacity',
      'Large working envelope',
      'Energy efficient',
      'Reliable performance'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.05,
      weight_kg: 1350,
      ip_rating: 'IP67',
      controller: 'IRC5'
    },
    image_url: 'https://example.com/abb_irb6700.jpg',
    gallery_urls: []
  },
  {
    name: 'M-20iD/25',
    brand: 'FANUC',
    model: 'M-20iD/25',
    type: 'Articulated',
    application: 'Material Handling, Assembly, Packaging',
    payload_kg: 25,
    reach_m: 1.81,
    price_range: 'Premium',
    price_min_inr: 3500000,
    price_max_inr: 5000000,
    description: 'Compact and versatile robot ideal for high-speed material handling and assembly applications.',
    features: [
      'High speed operation',
      'Compact design',
      'Integrated vision system',
      'Energy efficient'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.02,
      weight_kg: 280,
      ip_rating: 'IP67',
      controller: 'R-30iB Plus'
    },
    image_url: 'https://example.com/fanuc_m20id25.jpg',
    gallery_urls: []
  },
  {
    name: 'KR CYBERTECH',
    brand: 'KUKA',
    model: 'KR CYBERTECH',
    type: 'Articulated',
    application: 'Handling, Machining, Assembly',
    payload_kg: 6,
    reach_m: 1.4,
    price_range: 'Premium',
    price_min_inr: 3200000,
    price_max_inr: 4500000,
    description: 'High-precision robot designed for handling, machining and assembly applications.',
    features: [
      'High precision',
      'Compact design',
      'Energy efficient',
      'Low maintenance'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.02,
      weight_kg: 230,
      ip_rating: 'IP65',
      controller: 'KR C4 compact'
    },
    image_url: 'https://example.com/kuka_cybertech.jpg',
    gallery_urls: []
  },
  {
    name: 'TM5-900',
    brand: 'Techman',
    model: 'TM5-900',
    type: 'Collaborative',
    application: 'Pick and Place, Assembly, Testing',
    payload_kg: 4,
    reach_m: 0.9,
    price_range: 'Mid-range',
    price_min_inr: 1500000,
    price_max_inr: 2500000,
    description: 'Collaborative robot with built-in vision system for flexible automation solutions.',
    features: [
      'Built-in vision',
      'Collaborative operation',
      'Easy programming',
      'Plug & play'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.02,
      weight_kg: 24,
      ip_rating: 'IP54',
      controller: 'Integrated'
    },
    image_url: 'https://example.com/techman_tm5.jpg',
    gallery_urls: []
  },
  {
    name: 'UR10e',
    brand: 'Universal Robots',
    model: 'UR10e',
    type: 'Collaborative',
    application: 'Packaging, Assembly, Machine Tending',
    payload_kg: 12.5,
    reach_m: 1.3,
    price_range: 'Premium',
    price_min_inr: 2500000,
    price_max_inr: 3500000,
    description: 'Versatile collaborative robot for a wide range of industrial applications.',
    features: [
      'Collaborative operation',
      'Easy programming',
      'Flexible deployment',
      'Force/torque sensing'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.05,
      weight_kg: 33.5,
      ip_rating: 'IP54',
      controller: 'Integrated'
    },
    image_url: 'https://example.com/ur10e.jpg',
    gallery_urls: []
  },
  {
    name: 'SCARA SR-3iA',
    brand: 'FANUC',
    model: 'SR-3iA',
    type: 'SCARA',
    application: 'High-speed assembly, Pick and Place',
    payload_kg: 3,
    reach_m: 0.4,
    price_range: 'High',
    price_min_inr: 2800000,
    price_max_inr: 3800000,
    description: 'High-speed SCARA robot for precision assembly and material handling applications.',
    features: [
      'High speed',
      'Precise positioning',
      'Compact footprint',
      'Energy efficient'
    ],
    specifications: {
      axes: 4,
      repeatability_mm: 0.01,
      weight_kg: 26,
      ip_rating: 'IP67',
      controller: 'R-30iB Plus'
    },
    image_url: 'https://example.com/fanuc_scara.jpg',
    gallery_urls: []
  },
  {
    name: 'M-10iD/12',
    brand: 'FANUC',
    model: 'M-10iD/12',
    type: 'Articulated',
    application: 'Machine Tending, Material Handling',
    payload_kg: 12,
    reach_m: 1.42,
    price_range: 'Premium',
    price_min_inr: 3200000,
    price_max_inr: 4200000,
    description: 'Compact and fast robot designed for machine tending and material handling applications.',
    features: [
      'High speed',
      'Compact design',
      'Wrist-mounted camera compatible',
      'Energy efficient'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.02,
      weight_kg: 140,
      ip_rating: 'IP67',
      controller: 'R-30iB Plus'
    },
    image_url: 'https://example.com/fanuc_m10id12.jpg',
    gallery_urls: []
  },
  {
    name: 'IRB 2600ID',
    brand: 'ABB',
    model: 'IRB 2600ID',
    type: 'Articulated',
    application: 'Arc Welding, Material Handling',
    payload_kg: 8,
    reach_m: 1.85,
    price_range: 'High',
    price_min_inr: 3800000,
    price_max_inr: 4800000,
    description: 'Integrated dressing robot optimized for arc welding applications.',
    features: [
      'Integrated dress pack',
      'High precision',
      'Optimized for welding',
      'Reliable performance'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.04,
      weight_kg: 425,
      ip_rating: 'IP67',
      controller: 'IRC5'
    },
    image_url: 'https://example.com/abb_irb2600id.jpg',
    gallery_urls: []
  },
  {
    name: 'LR Mate 200iD/7L',
    brand: 'FANUC',
    model: 'LR Mate 200iD/7L',
    type: 'Articulated',
    application: 'Assembly, Material Handling',
    payload_kg: 7,
    reach_m: 0.91,
    price_range: 'Premium',
    price_min_inr: 2800000,
    price_max_inr: 3800000,
    description: 'Compact robot with long reach for assembly and material handling applications.',
    features: [
      'Long reach',
      'Compact design',
      'High speed',
      'Precision motion'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.02,
      weight_kg: 38,
      ip_rating: 'IP67',
      controller: 'R-30iB Plus'
    },
    image_url: 'https://example.com/fanuc_lrmate.jpg',
    gallery_urls: []
  },
  {
    name: 'GP12',
    brand: 'Yaskawa',
    model: 'GP12',
    type: 'Articulated',
    application: 'Material Handling, Assembly',
    payload_kg: 12,
    reach_m: 1.44,
    price_range: 'High',
    price_min_inr: 3000000,
    price_max_inr: 4000000,
    description: 'High-performance robot for material handling and assembly applications.',
    features: [
      'High speed',
      'Precise positioning',
      'Reliable performance',
      'Energy efficient'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.02,
      weight_kg: 150,
      ip_rating: 'IP67',
      controller: 'DX200'
    },
    image_url: 'https://example.com/yaskawa_gp12.jpg',
    gallery_urls: []
  },
  {
    name: 'M-20iD/25L',
    brand: 'FANUC',
    model: 'M-20iD/25L',
    type: 'Articulated',
    application: 'Material Handling, Machine Tending',
    payload_kg: 25,
    reach_m: 2.03,
    price_range: 'Premium',
    price_min_inr: 4000000,
    price_max_inr: 5200000,
    description: 'Long-reach robot for material handling and machine tending applications.',
    features: [
      'Long reach',
      'High payload',
      'Precise positioning',
      'Reliable performance'
    ],
    specifications: {
      axes: 6,
      repeatability_mm: 0.03,
      weight_kg: 430,
      ip_rating: 'IP67',
      controller: 'R-30iB Plus'
    },
    image_url: 'https://example.com/fanuc_m20id25l.jpg',
    gallery_urls: []
  }
];

async function seedRobots() {
  try {
    console.log('Starting to seed robots...');
    
    // First, clear existing data
    console.log('Clearing existing robots...');
    // Delete all robots - using .neq() with a non-UUID value was causing the error
    const { error: deleteError } = await supabase
      .from('robots')
      .delete()
      .not('id', 'is', null); // This will delete all records
    
    if (deleteError) {
      throw deleteError;
    }

    console.log('Inserting new robots...');
    
    // Insert new robots
    for (const robot of robots) {
      const slug = `${slugify(robot.brand)}-${slugify(robot.model)}`;
      
      console.log(`Inserting robot: ${robot.name} (${slug})`);
      
      const { data, error } = await supabase
        .from('robots')
        .insert([
          {
            name: robot.name,
            slug,
            brand: robot.brand,
            model: robot.model,
            type: robot.type,
            application: robot.application,
            price_range: robot.price_range,
            price_min_inr: robot.price_min_inr,
            price_max_inr: robot.price_max_inr,
            description: robot.description,
            features: robot.features,
            specifications: robot.specifications,
            image_url: robot.image_url,
            gallery_urls: robot.gallery_urls,
          },
        ])
        .select();
      
      if (error) {
        console.error('Error inserting robot:', error);
      } else {
        console.log(`Successfully inserted: ${robot.name} (ID: ${data?.[0]?.id})`);
      }
    }
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding robots:', error);
  } finally {
    process.exit(0);
  }
}

seedRobots();
