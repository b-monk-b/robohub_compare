export interface RobotSpecifications {
  payload_kg?: number;
  reach_m?: number;
  repeatability_mm?: number;
  axes?: number;
  weight_kg?: number;
  ip_rating?: string;
  power_consumption_w?: number;
  max_speed_ms?: number;
  // Add any other specifications as needed
  [key: string]: any;
}

export interface Robot {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  type: string;
  application: string;
  payload_kg?: number;
  reach_m?: number;
  price_range?: string;
  price_min_inr?: number;
  price_max_inr?: number;
  description?: string;
  features: string[];
  specifications: RobotSpecifications;
  image_url?: string;
  gallery_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface RobotFilters {
  type?: string[];
  application?: string[];
  brand?: string[];
  price_min?: number;
  price_max?: number;
  search?: string;
}

export interface RobotsResponse {
  data: Robot[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
