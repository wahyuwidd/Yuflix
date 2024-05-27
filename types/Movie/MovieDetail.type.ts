interface Moviedetail {
    backdrop_path: string
    title: string
    belongs_to_collection: MovieCollection
    genres:Genre[]
    overview: string
    poster_path: string
    original_title: string
    release_date: string
    production_companies: ProductionCompany[]
    status: string
    runtime: number
}

interface MovieCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}