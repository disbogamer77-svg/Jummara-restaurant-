/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  description: string;
  price: number;
  category: "mains" | "appetizers" | "desserts" | "drinks";
  image: string;
  rating: number;
  calories: number;
  ingredients: string[];
  allergens: string[];
  preparationTime: string; // e.g., "15-20 دقيقة"
  featured: boolean;
  // Custom interactive 3D layout settings
  layers: {
    name: string;
    description: string;
    offset: number; // For exploded 3D effect in px/rem
    color: string;
  }[];
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  type: "standard" | "vip" | "terrace" | "waterfall";
  typeName: string;
  status: "available" | "reserved" | "selected";
  x: number; // coordinate representation
  y: number; // coordinate representation
  description: string;
}

export interface Reservation {
  id?: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  occasion?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedAddons?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
