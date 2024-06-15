import React, { useState, useEffect } from "react";
import { Box, Toolbar, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.config";
import personApi from "../api/modules/personal.api";
import uiConfigs from "../configs/ui.config";
import PersonMediaGrid from "../pages/PersonMediaGrid";
import Container from "../components/common/Container";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

const PersonDetail = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await personApi.detail({ personId });
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                setPerson(response);
            }
        })();
    }, [personId]);

    return (
        <>
            <Toolbar />
            {person && (
                <>
                    <Box sx={{ ...uiConfigs.style.mainContent }}>
                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: "50%", md: "20%" },
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "160%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "darkgrey",
                                        backgroundImage: `url(${tmdbConfigs.posterPath(
                                            person.profile_path
                                        )})`,
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", md: "80%" },
                                    padding: { xs: "1rem 0", md: "1rem 2rem" },
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h5" fontWeight={700}>
                                        {`${person.name} (${
                                            person.birthday.split("-")[0]
                                        })`}
                                        {person.deathday &&
                                            ` - ${
                                                person.deathday.split("-")[0]
                                            }`}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...uiConfigs.style.typoLines(10),
                                        }}
                                    >
                                        {person.biography}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                        <Container header={"Medias"}>
                            <PersonMediaGrid personId={personId} />
                        </Container>
                    </Box>
                </>
            )}
        </>
    );
};

export default PersonDetail;
