import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import reviewApi from "../../api/modules/review.api";
import TextAvatar from "./TextAvatar";
import Container from "./Container";

const ReviewItem = ({ review, onRemoved }) => {
    const { user } = useSelector((state) => state.user);
    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const { response, err } = await reviewApi.remove({
            reviewId: review.id,
        });
        if (err) toast.error(err.message);
        if (response) onRemoved(review.id);
    };

    console.log(review);

    return (
        <Box
            sx={{
                padding: 2,
                borderRadius: "5px",
                position: "relative",
                opacity: onRequest ? 0.6 : 1,
                "&:hover": {
                    backgroundColor: "background.paper",
                },
            }}
        >
            <Stack direction={"row"} spacing={2}>
                {/* avatar */}
                <TextAvatar text={review.user?.displayName} />
                {/* avatar */}

                <Stack spacing={2} flexGrow={1}>
                    <Stack spacing={1}>
                        <Typography variant="h6" fontWeight={"700"}>
                            {review.user?.displayName}
                        </Typography>
                        <Typography>
                            {dayjs(review.createAt).format(
                                "DD-MM_YYYY HH:mm:ss"
                            )}
                        </Typography>
                    </Stack>
                    <Typography>{review.content}</Typography>
                    {user && user.id === review.user.id && (
                        <LoadingButton
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            loadingPosition="start"
                            loading={onRequest}
                            onClick={onRemove}
                            sx={{
                                position: { xs: "relative", md: "absolute" },
                                right: { xs: 0, md: "10px" },
                                marginTop: { xs: 2, md: 0 },
                                width: "max-content",
                            }}
                        >
                            Remove
                        </LoadingButton>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

const MediaReview = ({ reviews, media, mediaType }) => {
    const { user } = useSelector((state) => state.user);
    const [listReviews, setListReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [onRequest, setOnRequest] = useState(false);
    const [content, setContent] = useState("");
    const [reviewCount, setReviewCount] = useState(0);

    const skip = 4;

    useEffect(() => {
        setListReviews([...reviews]);
        setFilteredReviews([...reviews].splice(0, skip));
        setReviewCount(reviews.length);
    }, [reviews]);

    const onAddReview = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const body = {
            content,
            mediaId: media.id,
            mediaType,
            mediaTitle: media.title || media.name,
            mediaPoster: media.poster_path,
        };

        const { response, err } = await reviewApi.add(body);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            toast.success("Post review success");

            setFilteredReviews([...filteredReviews, response]);
            setReviewCount(reviewCount + 1);
            setContent("");
        }
    };

    const onLoadMore = () => {
        setFilteredReviews([
            ...filteredReviews,
            ...[...listReviews].splice(page * skip, skip),
        ]);
        setPage(page + 1);
    };

    const onRemoved = (id) => {
        if (listReviews.findIndex((e) => e.id === id) !== -1) {
            const newListReviews = [...listReviews].filter((e) => e.id !== id);
            setListReviews(newListReviews);
            setFilteredReviews([...newListReviews].splice(0, page * skip));
        } else {
            setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
        }

        setReviewCount(reviewCount - 1);

        toast.success("Remove reivew success");
    };

    return (
        <>
            <Container header={`Review (${reviewCount})`}>
                <Stack spacing={4} marginBottom={2}>
                    {filteredReviews.map((item) =>
                        item.user ? (
                            <Box key={item.id}>
                                <ReviewItem
                                    review={item}
                                    onRemoved={onRemoved}
                                />
                                <Divider
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                />
                            </Box>
                        ) : null
                    )}
                    {filteredReviews.length < listReviews.length && (
                        <Button onClick={onLoadMore}>Load more</Button>
                    )}
                </Stack>
                {user && (
                    <>
                        <Divider />
                        <Stack direction={"row"} spacing={2}>
                            <TextAvatar text={user.displayName} />
                            <Stack spacing={2} flexGrow={1}>
                                <Typography variant="h6" fontWeight={700}>
                                    {user.displayName}
                                </Typography>
                                <TextField
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    multiline
                                    rows={4}
                                    placeholder="Write your review"
                                    variant="outlined"
                                />
                                <LoadingButton
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        width: "max-content",
                                    }}
                                    startIcon={<SendOutlinedIcon />}
                                    loadingPosition="start"
                                    loading={onRequest}
                                    onClick={onAddReview}
                                >
                                    Post
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </>
                )}
            </Container>
        </>
    );
};

export default MediaReview;
