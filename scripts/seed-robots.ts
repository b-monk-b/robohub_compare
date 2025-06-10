import { createClient } from '@supabase/supabase-js';
import { slugify } from '../src/lib/utils';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hvlqffwdqtdigstoghep.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required to seed the database');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Sample robot data
const robots = [
  // Industrial Robots
  {
    name: 'IRB 6700',
    brand: 'ABB',
    model: 'IRB 6700',
    type: 'Articulated',
    application: 'Welding, Assembly',
    payload_kg: 235,
    reach_m: 2.7,
    price_range: 'High',
    price_min_inr: 10000000,
    price_max_inr: 15000000,
    description: 'High-payload industrial robot for heavy-duty applications like welding and assembly.',
    features: [
      'High payload capacity',
      'Large work envelope',
      'Precision motion control',
      'Dust-tight design',
    ],
    specifications: {
      payload_kg: 235,
      reach_m: 2.7,
      repeatability_mm: 0.05,
      axes: 6,
      weight_kg: 1800,
      ip_rating: 'IP67',
      power_consumption_w: 8.5,
    },
    image_url: 'https://example.com/abb_irb6700.jpg',
    gallery_urls: [],
  },
  {
    name: 'M-20iA',
    brand: 'FANUC',
    model: 'M-20iA',
    type: 'Articulated',
    application: 'Assembly',
    payload_kg: 20,
    reach_m: 1.8,
    price_range: 'High',
    price_min_inr: 4000000,
    price_max_inr: 6000000,
    description: 'Versatile industrial robot for high-speed assembly applications.',
    features: [
      'High-speed operation',
      'Compact design',
      'Integrated vision system',
      'Collision detection',
    ],
    specifications: {
      payload_kg: 20,
      reach_m: 1.8,
      repeatability_mm: 0.02,
      axes: 6,
      weight_kg: 350,
      ip_rating: 'IP67',
      power_consumption_w: 3.5,
    },
    image_url: 'https://example.com/fanuc_m20ia.jpg',
    gallery_urls: [],
  },
  // Add more industrial robots...
  
  // Cleaning Robots
  {
    name: 'Roomba i7+',
    brand: 'iRobot',
    model: 'i7+',
    type: 'Mobile',
    application: 'Floor Cleaning',
    payload_kg: 3,
    price_range: 'Mid-range',
    price_min_inr: 80000,
    price_max_inr: 100000,
    description: 'Smart robot vacuum with automatic dirt disposal.',
    features: [
      'Self-emptying base',
      'Smart mapping',
      'Voice control',
      'Automatic recharge',
    ],
    specifications: {
      battery_life: '75 mins',
      noise_level: '65 dB',
      dustbin_capacity: '0.5L',
      charging_time: '3 hours',
    },
    image_url: 'https://example.com/roomba_i7.jpg',
    gallery_urls: [],
  },
  // Add more cleaning robots...
  
  // Medical Robots
  {
    name: 'da Vinci Surgical',
    brand: 'Intuitive',
    model: 'Xi',
    type: 'Surgical',
    application: 'Surgery',
    price_range: 'Very High',
    price_min_inr: 100000000,
    price_max_inr: 150000000,
    description: 'Robotic surgical system for minimally invasive procedures.',
    features: [
      '3D HD visualization',
      'Tiny incisions',
      'Precision instruments',
      'Surgeon console',
    ],
    specifications: {
      arms: 4,
      magnification: '10x',
      weight_kg: 1200,
      dimensions: '1.8m x 2.4m x 2m',
    },
    image_url: 'https://example.com/davinci_xi.jpg',
    gallery_urls: [],
  },
  // Add more medical robots...
  
  // Fighting Robots
  {
    name: 'Tombstone',
    brand: 'Hardcore Robotics',
    model: 'Tombstone',
    type: 'Spinner',
    application: 'Robot Combat',
    description: 'Heavyweight combat robot known for its powerful horizontal spinning bar.',
    features: [
      'Titanium armor',
      'High-speed spinner',
      'Dual brushless motors',
      'Aerospace-grade aluminum frame',
    ],
    specifications: {
      weight_kg: 110,
      weapon_speed: '2500 RPM',
      weapon_energy: '30 kJ',
      top_speed: '20 km/h',
    },
    image_url: 'https://example.com/tombstone.jpg',
    gallery_urls: [],
  },
  // Add more fighting robots...
  
  // Pet Robots
  {
    name: 'Aibo',
    brand: 'Sony',
    model: 'ERS-1000',
    type: 'Companion',
    application: 'Pet Simulation',
    description: 'Advanced robotic dog with AI and emotional intelligence.',
    features: [
      'AI learning',
      'OLED eyes',
      'Multiple sensors',
      'Voice recognition',
    ],
    specifications: {
      battery_life: '2 hours',
      charging_time: '3 hours',
      weight_kg: 2.2,
      dimensions: '30cm x 17cm x 30cm',
    },
    image_url: 'https://example.com/aibo.jpg',
    gallery_urls: [],
  },
  // Add more pet robots...
  
  // Humanoid Robots
  {
    name: 'Optimus',
    brand: 'Tesla',
    model: 'Optimus',
    type: 'Humanoid',
    application: 'Logistics, Chores',
    description: 'General-purpose humanoid robot designed for various tasks.',
    features: [
      'AI-powered',
      'Full-body control',
      'Object manipulation',
      'Autonomous navigation',
    ],
    specifications: {
      height: '1.7m',
      weight_kg: 57,
      payload_kg: 20,
      speed: '8 km/h',
    },
    image_url: 'https://example.com/tesla_optimus.jpg',
    gallery_urls: [],
  },
  // Add more humanoid robots...
  {
    name: 'Collaborative Robot',
    brand: 'Universal Robots',
    model: 'UR10e',
    type: 'Collaborative',
    application: 'Assembly',
    payload_kg: 12.5,
    reach_m: 1.3,
    price_range: '₹20-25 Lakhs',
    price_min_inr: 2000000,
    price_max_inr: 2500000,
    description: 'Versatile collaborative robot designed to work safely alongside human operators in assembly applications.',
    features: [
      'Force/torque sensing',
      'Hand guiding',
      'Tool-free end-effector change',
      'Programmable safety settings',
    ],
    specifications: {
      payload_kg: 12.5,
      reach_m: 1.3,
      repeatability_mm: 0.05,
      axes: 6,
      weight_kg: 33.5,
      ip_rating: 'IP54',
      power_consumption_w: 0.35,
    },
    image_url: 'https://images.unsplash.com/photo-1617895153857-02fe36f267b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1617895153857-02fe36f267b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1581092161087-822357b1c5e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    ],
  },
  {
    name: 'SCARA Robot',
    brand: 'EPSON',
    model: 'T6-1000S',
    type: 'SCARA',
    application: 'Pick and Place',
    payload_kg: 6,
    reach_m: 1.0,
    price_range: '₹15-20 Lakhs',
    price_min_inr: 1500000,
    price_max_inr: 2000000,
    description: 'High-speed SCARA robot optimized for precision pick and place operations in electronics manufacturing.',
    features: [
      'High-speed operation',
      'Precision mounting',
      'Compact footprint',
      'Integrated vision guidance',
    ],
    specifications: {
      payload_kg: 6,
      reach_m: 1.0,
      repeatability_mm: 0.01,
      axes: 4,
      weight_kg: 42,
      ip_rating: 'IP40',
      power_consumption_w: 0.5,
    },
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1581093450024-af480622d1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    ],
  },
  {
    name: 'Delta Robot',
    brand: 'ABB',
    model: 'IRB 360-8/1130',
    type: 'Delta',
    application: 'Packaging',
    payload_kg: 8,
    reach_m: 1.6,
    price_range: '₹22-28 Lakhs',
    price_min_inr: 2200000,
    price_max_inr: 2800000,
    description: 'Ultra-fast delta robot designed for high-speed pick and place operations in packaging applications.',
    features: [
      'Extremely high speed',
      'Precision handling',
      'Hygienic design',
      'Easy integration',
    ],
    specifications: {
      payload_kg: 8,
      reach_m: 1.6,
      repeatability_mm: 0.1,
      axes: 4,
      weight_kg: 120,
      ip_rating: 'IP54',
      power_consumption_w: 1.5,
    },
    image_url: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1581092161087-822357b1c5e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    ],
  },
  {
    name: 'Mobile Robot',
    brand: 'Boston Dynamics',
    model: 'Stretch',
    type: 'Mobile',
    application: 'Logistics',
    payload_kg: 23,
    reach_m: 2.0,
    price_range: '₹50-60 Lakhs',
    price_min_inr: 5000000,
    price_max_inr: 6000000,
    description: 'Advanced mobile robot designed for autonomous material handling in warehouse and logistics environments.',
    features: [
      'Autonomous navigation',
      'Heavy payload capacity',
      'Advanced perception',
      'Easy deployment',
    ],
    specifications: {
      payload_kg: 23,
      reach_m: 2.0,
      repeatability_mm: 2.0,
      axes: 7,
      weight_kg: 350,
      ip_rating: 'IP54',
      power_consumption_w: 1.2,
      max_speed_ms: 1.5,
    },
    image_url: 'https://images.unsplash.com/photo-1593997235243-af60c8a5e9a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1593997235243-af60c8a5e9a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1581093450024-af480622d1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    ],
  },
  {
    name: 'Dual-Arm Robot',
    brand: 'Yaskawa',
    model: 'MOTOMAN-DA20',
    type: 'Dual-Arm',
    application: 'Assembly',
    payload_kg: 20,
    reach_m: 1.5,
    price_range: '₹40-50 Lakhs',
    price_min_inr: 4000000,
    price_max_inr: 5000000,
    description: 'Dual-arm collaborative robot designed for complex assembly tasks requiring human-like dexterity.',
    features: [
      'Dual 7-axis arms',
      'Force control',
      'Collision detection',
      'Tool changer compatibility',
    ],
    specifications: {
      payload_kg: 20,
      reach_m: 1.5,
      repeatability_mm: 0.03,
      axes: 14,
      weight_kg: 370,
      ip_rating: 'IP54',
      power_consumption_w: 2.0,
    },
    image_url: 'https://images.unsplash.com/photo-1581093450024-af480622d1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1581093450024-af480622d1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1593997235243-af60c8a5e9a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    ],
  },
];

// Batch size for inserts
const BATCH_SIZE = 5;

// Function to process robots in batches
const processInBatches = async (items: any[], batchSize: number, processItem: (item: any) => Promise<void>) => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(processItem));
    console.log(`Processed batch ${i / batchSize + 1}/${Math.ceil(items.length / batchSize)}`);
  }
};

const seedRobots = async () => {
  try {
    console.log('🚀 Starting to seed robots...');
    
    // First, clear existing data
    console.log('🧹 Clearing existing robots...');
    const { error: deleteError } = await supabase
      .from('robots')
      .delete()
      .not('id', 'is', null);
    
    if (deleteError) {
      throw new Error(`Failed to clear existing robots: ${deleteError.message}`);
    }

    console.log(`✅ Cleared existing robots`);
    console.log(`📥 Inserting ${robots.length} robots in batches of ${BATCH_SIZE}...`);
    
    // Process robots in batches
    let successCount = 0;
    let errorCount = 0;
    
    await processInBatches(robots, BATCH_SIZE, async (robot) => {
      try {
        const slug = `${slugify(robot.brand)}-${slugify(robot.model)}-${uuidv4().substring(0, 8)}`;
        
        const { data, error } = await supabase
          .from('robots')
          .insert([
            {
              id: uuidv4(),
              name: robot.name,
              slug,
              brand: robot.brand,
              model: robot.model,
              type: robot.type,
              application: robot.application,
              payload_kg: robot.payload_kg,
              reach_m: robot.reach_m,
              price_range: robot.price_range,
              price_min_inr: robot.price_min_inr,
              price_max_inr: robot.price_max_inr,
              description: robot.description,
              features: robot.features,
              specifications: robot.specifications,
              image_url: robot.image_url,
              gallery_urls: robot.gallery_urls,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();
        
        if (error) throw error;
        
        successCount++;
        console.log(`✅ Inserted: ${robot.name} (ID: ${data.id})`);
      } catch (error: any) {
        errorCount++;
        console.error(`❌ Error inserting ${robot.name}:`, error.message);
      }
    });
    
    console.log('\n🎉 Seeding completed!');
    console.log(`✅ Successfully inserted: ${successCount} robots`);
    if (errorCount > 0) {
      console.warn(`⚠️  Failed to insert: ${errorCount} robots`);
    }
  } catch (error: any) {
    console.error('❌ Error seeding robots:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seedRobots();
