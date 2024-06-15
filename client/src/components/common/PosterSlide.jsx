import React from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import NavigationSwiper from "./NavigationSwiper";
import { Box } from "@mui/material";
import AutoSwiper from "./AutoSwiper";

const PosterSlide = ({ posters }) => {
    return (
        <AutoSwiper>
            {[...posters].splice(0, 10).map((item, index) => (
                <SwiperSlide key={index}>
                    <Box
                        sx={{
                            paddingTop: "160%",
                            backgroundPosition: "center",
                            backgroundSize: " cover",
                            backgroundImage: `url(${tmdbConfigs.posterPath(
                                item.file_path
                            )})`,
                        }}
                    ></Box>
                </SwiperSlide>
            ))}
        </AutoSwiper>
    );
};

export default PosterSlide;
