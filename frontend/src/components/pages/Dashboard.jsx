import { useOutletContext, useNavigate } from "react-router";
import { HeroSection } from "../organisms/HeroSection";
import { CategorySection } from "../organisms/CategorySection";
import { ProductCard } from "../molecules/ProductCard";
import { ProductService } from "../../services/products/ProductService";
import { useEffect, useState } from "react";
import { Skeleton } from "../atoms/skeleton";

export function Dashboard() {
    const context = useOutletContext();

    const addToCart =
        context?.addToCart ||
        (() =>
            console.error("Erro: Função addToCart não encontrada no contexto"));

    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const productResponse = await ProductService.getAll();
                const products = productResponse.products || [];
                setFeaturedProducts(products.slice(0, 6));

                const uniqueCategories = [
                    ...new Set(products.map((p) => p.category).filter(Boolean)),
                ];
                const categoryData = uniqueCategories.map((name) => ({
                    id: name.toLowerCase().replace(/\s+/g, "-"),
                    name,
                    productCount: products.filter((p) => p.category === name)
                        .length,
                    image: `https://source.unsplash.com/400x300/?${name}`,
                }));
                setCategories(categoryData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollToProducts = () => {
        document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    // --- MUDANÇA AQUI: Roteamento para páginas específicas ---
    const handleCategoryClick = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);

        if (!category) return;

        // Normalizamos o nome para facilitar a comparação (minúsculas)
        const name = category.name.toLowerCase();

        // Verifica qual página específica deve abrir
        if (name.includes("ferramentas")) {
            navigate("/tools");
        } else if (name.includes("tintas")) {
            navigate("/paints");
        } else if (name.includes("básicos") || name.includes("basicos")) {
            navigate("/basics");
        } else {
            // Se for uma categoria nova que não tem página própria,
            // manda para o catálogo filtrado como fallback
            navigate("/catalog", { state: { category: category.name } });
        }
    };

    return (
        <>
            <HeroSection onShopNow={scrollToProducts} />

            <CategorySection
                categories={categories}
                onCategoryClick={handleCategoryClick}
            />

            <section id="products" className="py-12 md:py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                            Produtos em{" "}
                            <span className="text-primary">Destaque</span>
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-4">
                            Confira nossa seleção de produtos mais vendidos.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-96 w-full" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    product={{
                                        ...product,
                                        basePrice: Number(product.basePrice),
                                    }}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
