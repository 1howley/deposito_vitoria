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
    {
        id: "ferramentas",
        name: "Ferramentas",
        image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1ODk4NTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Ferramentas e equipamentos para construção",
        productCount: 78,
    },
    {
        id: "tintas",
        name: "Tintas e Pintura",
        image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGJydXNoZXMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbHl8ZW58MXx8fHwxNzU4OTg1MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Tintas, pincéis, rolos e acessórios",
        productCount: 32,
        isPopular: true,
    },
    {
        id: "madeiras",
        name: "Madeiras",
        image: "https://images.unsplash.com/photo-1647124498956-1ba4742f5f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwbHVtYmVyJTIwY29uc3RydWN0aW9uJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1ODk4NTI3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Tábuas, vigas, compensados e MDF",
        productCount: 56,
    },
];
// Todos os produtos do catalogo
const allProducts = [
    // Featured products
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
    {
        id: "2",
        name: "Furadeira DeWalt 850W",
        price: 329.9,
        originalPrice: 399.9,
        image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1ODk4NTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Ferramentas",
        description: "Furadeira profissional com garantia estendida",
        inStock: true,
        rating: 4.8,
    },
    {
        id: "3",
        name: "Tinta Acrílica Suvinil 18L",
        price: 149.9,
        originalPrice: 189.9,
        image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGJydXNoZXMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbHl8ZW58MXx8fHwxNzU4OTg1MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Tintas e Pintura",
        description: "Tinta acrílica de alta cobertura",
        inStock: true,
        rating: 4.7,
    },
    {
        id: "4",
        name: "Madeira Eucalipto Tratado 3m",
        price: 89.9,
        originalPrice: 109.9,
        image: "https://images.unsplash.com/photo-1647124498956-1ba4742f5f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwbHVtYmVyJTIwY29uc3RydWN0aW9uJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1ODk4NTI3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Madeiras",
        description: "Madeira eucalipto tratada autoclave",
        inStock: true,
        rating: 4.6,
    },
    {
        id: "5",
        name: "Bloco Cerâmico Estrutural",
        price: 2.89,
        image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjZW1lbnQlMjBicmlja3N8ZW58MXx8fHwxNzU4OTg1MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Materiais Básicos",
        description: "Bloco cerâmico estrutural de alta resistência",
        inStock: true,
        rating: 4.5,
    },
    {
        id: "6",
        name: "Kit Ferramentas Stanley",
        price: 189.9,
        originalPrice: 249.9,
        image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1ODk4NTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Ferramentas",
        description: "Kit completo com ferramentas de precisão",
        inStock: true,
        rating: 4.9,
    },
    // Additional products
    {
        id: "7",
        name: "Areia Média Lavada (1m³)",
        price: 45.0,
        image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjZW1lbnQlMjBicmlja3N8ZW58MXx8fHwxNzU4OTg1MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Materiais Básicos",
        description: "Areia lavada ideal para concreto e argamassa",
        inStock: true,
        rating: 4.3,
    },
    {
        id: "8",
        name: "Martelo Unha 25mm",
        price: 24.9,
        originalPrice: 29.9,
        image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1ODk4NTI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Ferramentas",
        description: "Martelo unha com cabo de fibra",
        inStock: false,
        rating: 4.4,
    },
    {
        id: "9",
        name: "Tinta Látex PVA Branca 18L",
        price: 89.9,
        image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGJydXNoZXMlMjBjb25zdHJ1Y3Rpb24lMjBzdXBwbHl8ZW58MXx8fHwxNzU4OTg1MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Tintas e Pintura",
        description: "Tinta látex para paredes internas",
        inStock: true,
        rating: 4.2,
    },
    {
        id: "10",
        name: "Tábua de Pinus 2,5x20x300cm",
        price: 45.9,
        image: "https://images.unsplash.com/photo-1647124498956-1ba4742f5f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwbHVtYmVyJTIwY29uc3RydWN0aW9uJTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1ODk4NTI3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Madeiras",
        description: "Madeira de pinus tratada",
        inStock: true,
        rating: 4.1,
    },
];

// Featured products for home page
const featuredProducts = allProducts.slice(0, 6);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
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
                    <Route path="sale" element={<SalePage />} />
                    <Route path="Profile" element={<UserProfilePage />} />
                    <Route path="basics" element={<BasicsPage />} />
                    <Route path="add-product" element={<AddProductPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
