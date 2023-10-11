import instant from ".";
export const getMovies = () => {
    return instant.get("movies");
}