import { supabase } from './client';

export interface RobotSpecifications {
  payload_kg?: number;
  reach_m?: number;
  weight_kg?: number;
  repeatability_mm?: number;
  axes?: number;
  ip_rating?: string;
  power_consumption_w?: number;
  max_speed_ms?: number;
  // Add more specifications as needed
}

export interface Robot {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  model?: string;
  type: string;
  application?: string;
  price_range?: string;
  price_min_inr?: number;
  price_max_inr?: number;
  description?: string;
  features?: string[];
  specifications: RobotSpecifications;
  image_url?: string;
  gallery_urls?: string[];
  created_at: string;
  updated_at: string;
}

export interface RobotFilters {
  search?: string;
  type?: string[];
  application?: string[];
  brand?: string[];
  min_price?: number;
  max_price?: number;
  sort_by?: 'name' | 'price_asc' | 'price_desc' | 'payload' | 'reach';
}

export async function getRobots(filters: RobotFilters = {}, page = 1, pageSize = 24): Promise<{ data: Robot[]; count: number }> {
  let query = supabase.from('robots').select('*', { count: 'exact' });

  // Apply filters
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  if (filters.type?.length) {
    query = query.in('type', filters.type);
  }

  if (filters.application?.length) {
    query = query.in('application', filters.application);
  }

  if (filters.brand?.length) {
    query = query.in('brand', filters.brand);
  }

  if (filters.min_price) {
    query = query.gte('price_min_inr', filters.min_price);
  }

  if (filters.max_price) {
    query = query.lte('price_max_inr', filters.max_price);
  }

  // Apply sorting
  switch (filters.sort_by) {
    case 'price_asc':
      query = query.order('price_min_inr', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price_min_inr', { ascending: false });
      break;
    case 'payload':
      query = query.order('specifications->>payload_kg', { ascending: false, nullsLast: true });
      break;
    case 'reach':
      query = query.order('specifications->>reach_m', { ascending: false, nullsLast: true });
      break;
    default:
      query = query.order('name', { ascending: true });
      break;
  }

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching robots:', error);
    return { data: [], count: 0 };
  }

  return { data: data || [], count: count || 0 };
}

export async function getRobotBySlug(slug: string): Promise<Robot | null> {
  const { data, error } = await supabase
    .from('robots')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching robot:', error);
    return null;
  }

  return data;
}

export async function getRelatedRobots(robotId: string, type: string, limit = 4): Promise<Robot[]> {
  const { data, error } = await supabase
    .from('robots')
    .select('*')
    .eq('type', type)
    .neq('id', robotId)
    .limit(limit);

  if (error) {
    console.error('Error fetching related robots:', error);
    return [];
  }

  return data || [];
}

export async function getFilterOptions() {
  // Get all unique types, applications, and brands for filters
  const { data: types } = await supabase.from('robots').select('type').not('type', 'is', null);
  const { data: applications } = await supabase.from('robots').select('application').not('application', 'is', null);
  const { data: brands } = await supabase.from('robots').select('brand').not('brand', 'is', null);

  return {
    types: [...new Set(types?.map((item) => item.type).filter(Boolean))] as string[],
    applications: [...new Set(applications?.map((item) => item.application).filter(Boolean))] as string[],
    brands: [...new Set(brands?.map((item) => item.brand).filter(Boolean))] as string[],
  };
}
