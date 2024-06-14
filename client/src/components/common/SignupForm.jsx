import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/useSlice";
import { useForm } from "react-hook-form";

const SignupForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();
    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values) => {
        setIsLoginRequest(true);
        setErrorMessage(undefined);
        console.log(values);
        const { response, err } = await userApi.singup(values);

        setIsLoginRequest(false);
        console.log(response);
        console.log(err);
        if (response) {
            // SignupForm.resetForm();
            dispatch(setUser(response));
            dispatch(setAuthModalOpen(false));
            toast.success("Sign in successfully");
        }

        if (err) setErrorMessage(err.message);
    };

    return (
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="username"
                    name="username"
                    fullWidth
                    {...register("username", {
                        min: 3,
                        required: "Username is required",
                    })}
                    error={errors.username}
                    // helperText={errors.username}
                />

                <TextField
                    type="text"
                    placeholder="displayName"
                    name="displayName"
                    fullWidth
                    {...register("displayName", {
                        min: 3,
                        required: "Display name is required",
                    })}
                    error={errors.displayName}
                    // helperText={errors.username}
                />

                <TextField
                    type="password"
                    placeholder="password"
                    name="password"
                    fullWidth
                    {...register("password", {
                        min: 8,
                        required: "Password is required",
                    })}
                    // error={errors.password}
                    // helperText={errors.password}
                />

                <TextField
                    type="password"
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    fullWidth
                    {...register("confirmPassword", {
                        validate: (match) => {
                            const password = getValues("password");
                            return match === password || "Password show match!";
                        },
                    })}
                    // error={errors.password}
                    // helperText={errors.password}
                />
            </Stack>

            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{
                    marginTop: 4,
                }}
                loading={isLoginRequest}
            >
                Sign in
            </LoadingButton>

            <Button
                fullWidth
                variant="outlined"
                sx={{
                    marginTop: "1rem",
                }}
                onClick={() => switchAuthState()}
            >
                Sign up
            </Button>

            {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                    <Alert severity="error" variant="outlined">
                        {errorMessage}
                    </Alert>
                </Box>
            )}
        </Box>
    );
};

export default SignupForm;
