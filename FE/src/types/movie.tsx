export interface Movie {
    id: number;
    movie_name: string,
    director: string,
    total_revenue: number,
    image: string,
    start_date: string,
    end_date: string,
    trailer: string,
    movie_type_id: number,
    country_id: number,
    producer_id: number
  }
export interface Genre {
    id: number;
    name: string
  }
export interface Combo{
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    sale: string
  }