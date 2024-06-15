import React from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import NavigationSwiper from "./NavigationSwiper";
import { Box } from "@mui/material";

const BackdropSlide = ({ backdrops }) => {
    return (
        <NavigationSwiper>
            {[...backdrops].splice(0, 10).map((item, index) => (
                <SwiperSlide key={index}>
                    <Box
                        sx={{
                            paddingTop: "60%",
                            backgroundPosition: "top",
                            backgroundSize: " cover",
                            backgroundImage: `url(${tmdbConfigs.backdropPath(
                                item.file_path
                            )})`,
                        }}
                    ></Box>
                </SwiperSlide>
            ))}
        </NavigationSwiper>
    );
};

export default BackdropSlide;
