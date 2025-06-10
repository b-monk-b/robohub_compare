import { createClient } from '@supabase/supabase-js';
import { slugify } from '../src/lib/utils';

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

// Test robot data - just one robot for testing
const testRobots = [{
  name: 'Test Robot',
  brand: 'Test Brand',
  model: 'X-1000',
  type: 'Test Type',
  application: 'Testing',
  payload_kg: 10,
  reach_m: 1.5,
  price_range: 'Test Range',
  price_min_inr: 10000,
  price_max_inr: 15000,
  description: 'This is a test robot entry',
  features: ['Test feature 1', 'Test feature 2'],
  specifications: {
    test_spec: 'Test value'
  },
  image_url: 'https://example.com/test.jpg',
  gallery_urls: []
}];

async function testSeed() {
  try {
    console.log('Starting test seed...');
    
    // First, check if we can connect to Supabase
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('robots').select('*').limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return;
    }
    
    console.log('Successfully connected to Supabase!');
    
    // Now try to insert a test robot
    console.log('Inserting test robot...');
    const slug = `${slugify(testRobots[0].brand)}-${slugify(testRobots[0].model)}`;
    
    const { data: insertData, error: insertError } = await supabase
      .from('robots')
      .insert([
        {
          name: testRobots[0].name,
          slug,
          brand: testRobots[0].brand,
          model: testRobots[0].model,
          type: testRobots[0].type,
          application: testRobots[0].application,
          price_range: testRobots[0].price_range,
          price_min_inr: testRobots[0].price_min_inr,
          price_max_inr: testRobots[0].price_max_inr,
          description: testRobots[0].description,
          features: testRobots[0].features,
          specifications: testRobots[0].specifications,
          image_url: testRobots[0].image_url,
          gallery_urls: testRobots[0].gallery_urls,
        },
      ])
      .select();
    
    if (insertError) {
      console.error('Error inserting test robot:', insertError);
      return;
    }
    
    console.log('Successfully inserted test robot!', insertData);
    
  } catch (error) {
    console.error('Error in test seed:', error);
  } finally {
    process.exit(0);
  }
}

testSeed();
