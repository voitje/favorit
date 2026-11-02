export interface Warehouse {
    name: string;
    price: number;
    count: number;
  }
  
  export interface Good {
    brand: string;
    number: string;
    name: string;
    count: number;
    warehouses?: Warehouse[];
  }
  
  export interface PartsState {
    searchNumber: string;
    brands: Good[];
    selectedBrand: string | null;
    analogues: Good[];
    step: 1 | 2;
    loading: boolean;
    error: string | null;
  }