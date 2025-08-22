export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsError {
  message: string;
  status?: number;
}

export interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type SportsCategory = 
  | 'Football' 
  | 'Cricket' 
  | 'Basketball' 
  | 'Tennis' 
  | 'Formula 1' 
  | 'Golf' 
  | 'Boxing';
