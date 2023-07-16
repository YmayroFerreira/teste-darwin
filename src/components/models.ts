export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface Location {
  name: string;
  url: string;
}
export interface Origin {
  name: string;
  url: string;
}
export interface CharInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
export interface BasicOption {
  label: string;
  value: string;
}
export interface Status {
  color: string;
  label: string;
}
