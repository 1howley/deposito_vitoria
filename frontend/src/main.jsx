import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/organisms/Layout";
import "./index.css";
import { Dashboard } from "./components/pages/Dashboard";
import { CatalogPage } from "./components/pages/CatalogPage";
import { LoginPage } from "./components/pages/login/LoginPage";
// Mock data para categorias
const categories = [
    {
        id: "materiais-basicos",
        name: "Materiais Básicos",
        image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjZW1lbnQlMjBicmlja3N8ZW58MXx8fHwxNzU4OTg1MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Cimento, areia, brita, blocos e tijolos",
        productCount: 45,
        isPopular: true,
    },
    // ...resto das categorias
];

// Todos os produtos do catalogo
const allProducts = [
    // exemplo de produto
    {
        id: "1",
        name: "Cimento Portland CP-V-ARI 50kg",
        price: 38.9,
        originalPrice: 45.9,
        image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjZW1lbnQlMjBicmlja3N8ZW58MXx8fHwxNzU4OTg1MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Materiais Básicos",
        description: "Cimento de alta resistência inicial para estruturas",
        inStock: true,
        rating: 4.9,
    },
    // ...resto dos produtos
];

// Featured products for home page
const featuredProducts = allProducts.slice(0, 6);

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* A rota principal (index) renderiza a HomePage */}
                <Route
                    index
                    element={
                        <Dashboard
                            featuredProducts={featuredProducts}
                            categories={categories}
                        />
                    }
                />
                {/* A rota /catalog renderiza a CatalogPage */}
                <Route
                    path="catalog"
                    element={
                        <CatalogPage
                            products={allProducts}
                            categories={categories}
                        />
                    }
                />
                {/* Adicione outras rotas aqui, ex: <Route path="product/:id" element={<ProductDetails />} /> */}
            </Route>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
);
