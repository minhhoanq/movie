const mediaType = {
    movie: "movie",
    tv: "tv",
};

const mediaCategory = {
    popular: "popular",
    topRated: "topRated",
};

const backdropPath = (imgEndpoint) =>
    `https://iamge.tmdb.org/t/p/original${imgEndpoint}`;
const posterPath = (imgEndpoint) =>
    `https://iamge.tmdb.org/t/p/original${imgEndpoint}`;
const youtubePath = (videoId) => `https://ww.youtube.com/embed/${videoId}`;

const tmdbCongfigs = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath,
};

export default tmdbCongfigs;
