import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutLinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutLinedIcon from "@mui/icons-material/LiveTvOutLined";
import FavoriteBorderOutLinedIcon from "@mui/icons-material/FavoriteBorderOutLined";
import SearchOutLinedIcon from "@mui/icons-material/SearchOutLinedd";
import RatingReviewOutLinedIcon from "@mui/icons-material/RatingReviewOutLined";
import LockResetOutLinedIcon from "@mui/icons-material/LockResetOutLined";

const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeOutLinedIcon />,
        state: "home",
    },
    {
        display: "movies",
        path: "/movie",
        icon: <SlideshowOutLinedIcon />,
        state: "movie",
    },
    {
        display: "tv series",
        path: "/tv",
        icon: <LiveTvOutLinedIcon />,
        state: "tv",
    },
    {
        display: "search",
        path: "/search",
        icon: <SearchOutLinedIcon />,
        state: "search",
    },
    {
        display: "favorites",
        path: "/favorites",
        icon: <FavoriteBorderOutLinedIcon />,
        state: "favorite",
    },
    {
        display: "reviews",
        path: "/reviews",
        icon: <RatingReviewOutLinedIcon />,
        state: "reviews",
    },
    {
        display: "password update",
        path: "/password-update",
        icon: <LockResetOutLinedIcon />,
        state: "password.update",
    },
];

const menuConfigs = { main, user };

export default menuConfigs;
