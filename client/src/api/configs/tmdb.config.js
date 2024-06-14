const mediaType = {
    movie: "movie",
    tv: "tv",
};

const mediaCategory = {
    popular: "popular",
    topRated: "topRated",
};

const backdropPath = (imgEndpoint) =>
    `https://image.tmdb.org/t/p/original${imgEndpoint}`;
const posterPath = (imgEndpoint) =>
    `https://image.tmdb.org/t/p/original${imgEndpoint}`;
const youtubePath = (videoId) => `https://ww.youtube.com/embed/${videoId}`;

const tmdbConfigs = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath,
};

export default tmdbConfigs;
