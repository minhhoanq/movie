import React, { useState, useMemo, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.config";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

const MediaList = () => {
    const { mediaType } = useParams();

    const [medias, setMedias] = useState([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [currCategory, setCurrCategory] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const dispatch = useDispatch();

    const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
    const category = ["popular", "top rated"];

    useEffect(() => {
        dispatch(setAppState(mediaType));
        window.scrollTo(0, 0);
    }, [mediaType, dispatch]);

    useEffect(() => {
        (async () => {
            if (currPage === 1) dispatch(setGlobalLoading(true));
            setMediaLoading(true);
            const { response, err } = await mediaApi.getList({
                mediaType,
                mediaCategory: mediaCategories[currCategory],
                page: currPage,
            });

            setMediaLoading(false);
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                if (currPage !== 1)
                    setMedias((m) => [...m, ...response.results]);
                else setMedias([...response.results]);
            }
        })();
    }, [mediaType, currCategory, currPage, mediaCategories, dispatch]);

    const onLoadMore = () => setCurrPage(currPage + 1);

    const onCategoryChange = (categoryIndex) => {
        if (currCategory === categoryIndex) return;
        setMedias([]);
        setCurrPage(1);
        setCurrCategory(categoryIndex);
    };

    return (
        <>
            <HeroSlide
                mediaType={mediaType}
                mediaCategory={mediaCategories[currCategory]}
            />
            <Box sx={{ ...uiConfigs.style.mainContent }}>
                <Stack
                    spacing={2}
                    direction={{ xs: "column", md: "row" }}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ marginBottom: 4 }}
                >
                    <Typography fontWeight={"700"} variant="h5">
                        {mediaType === tmdbConfigs.mediaType.movie
                            ? "Movie"
                            : "TV Series"}
                    </Typography>
                    <Stack direction={"row"} spacing={2}>
                        {category.map((cate, index) => (
                            <Button
                                key={index}
                                size="large"
                                variant={
                                    currCategory === index
                                        ? "contained"
                                        : "text"
                                }
                                sx={{
                                    color:
                                        currCategory === index
                                            ? "primary.contrastText"
                                            : "text.primary",
                                }}
                                onClick={() => onCategoryChange(index)}
                            >
                                {cate}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
                <MediaGrid medias={medias} mediaType={mediaType} />
                <LoadingButton
                    sx={{ marginTop: 8 }}
                    fullWidth
                    color={"primary"}
                    loading={mediaLoading}
                    onClick={onLoadMore}
                >
                    Load more
                </LoadingButton>
            </Box>
        </>
    );
};

export default MediaList;
