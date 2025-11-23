import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/organisms/Layout";
import { Dashboard } from "./components/pages/Dashboard";
import { CatalogPage } from "./components/pages/CatalogPage";
import { LoginPage } from "./components/pages/LoginPage";
import { SalePage } from "./components/pages/SalePage";
import "./index.css";
import { UserProfilePage } from "./components/pages/UserProfilePage";
import { BasicsPage } from "./components/pages/BasicsPage";
import { ToolsPage } from "./components/pages/ToolsPage";
import { PaintsPage } from "./components/pages/PaintsPage";
import { AuthProvider } from "./context/AuthProvider";
import AddProductPage from "./components/pages/AddProductPage";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={<Dashboard />}
                    />
                    <Route
                        path="catalog"
                        element={<CatalogPage />}
                    />
                    <Route path="sale" element={<SalePage />} />
                    <Route path="Profile" element={<UserProfilePage />} />
                    <Route path="basics" element={<BasicsPage />} />
                    <Route path="add-product" element={<AddProductPage />} />
                    <Route path="tools" element={<ToolsPage/>}/>
                    <Route path="paints" element={<PaintsPage/>}/>
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
