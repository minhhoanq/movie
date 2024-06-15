const mediaType = {
    movie: "movie",
    tv: "tv",
};

const mediaCategory = {
    popular: "popular",
    topRated: "top_rated",
};

const backdropPath = (imgEndpoint) =>
    `https://image.tmdb.org/t/p/original${imgEndpoint}`;
const posterPath = (imgEndpoint) =>
    `https://image.tmdb.org/t/p/original${imgEndpoint}`;
const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}`;

const tmdbConfigs = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath,
};

export default tmdbConfigs;
