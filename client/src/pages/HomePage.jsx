import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.config";
import Container from "../components/common/Container";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
    return (
        <>
            <HeroSlide
                mediaType={tmdbConfigs.mediaType.movie}
                mediaCategory={tmdbConfigs.mediaCategory.popular}
            />

            <Box
                marginTop={"-4rem"}
                sx={{
                    ...uiConfigs.style.mainContent,
                }}
            >
                {/* populer movies */}
                <Container header={"popular movies"}>
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.movie}
                        mediaCategory={tmdbConfigs.mediaCategory.popular}
                    />
                </Container>

                {/* top rated movies*/}
                <Container header={"top rated movies"}>
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.movie}
                        mediaCategory={tmdbConfigs.mediaCategory.topRated}
                    />
                </Container>

                {/* popular tv show*/}
                <Container header={"top rated tv show"}>
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.tv}
                        mediaCategory={tmdbConfigs.mediaCategory.popular}
                    />
                </Container>

                {/* top rated tv show*/}
                <Container header={"top rated tv show"}>
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.tv}
                        mediaCategory={tmdbConfigs.mediaCategory.topRated}
                    />
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
