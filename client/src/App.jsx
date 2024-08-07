import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.config";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";
import MainLayout from "./components/layout/MainLayout";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
    const { themeMode } = useSelector((state) => state.themeMode);
    return (
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
            {/* config toastify */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme={themeMode}
            />
            <CssBaseline />
            {/* app routes */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routes.map((route, index) =>
                            route.index ? (
                                <Route
                                    index
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            ) : (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            )
                        )}
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* app routes */}
        </ThemeProvider>
    );
};

export default App;
