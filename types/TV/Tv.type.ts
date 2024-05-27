interface Tv {
    id: number
    name: string
    original_name: string
    backdrop_path: string
    genres:Genre[]
    overview: string
    poster_path: string
    vote_average: number
    first_air_date: string
    production_companies: ProductionCompany[]
}