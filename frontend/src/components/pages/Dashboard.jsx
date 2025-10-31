import { useOutletContext } from "react-router"; // Hook para receber o contexto do Layout
import { HeroSection } from "../organisms/HeroSection";
import { CategorySection } from "../organisms/CategorySection";
import { ProductCard } from "../molecules/ProductCard";

export function Dashboard({ featuredProducts, categories }) {
    // Recebe a função addToCart do context do Layout
    const { addToCart } = useOutletContext();
    const scrollToProducts = () => {
        document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <HeroSection onShopNow={scrollToProducts} />

            <CategorySection categories={categories} />

            <section id="products" className="py-12 md:py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                            Produtos em{" "}
                            <span className="text-primary">Destaque</span>
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-4">
                            Confira nossa seleção de produtos mais vendidos com
                            qualidade garantida e os melhores preços para sua
                            obra.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart} // Usando a função do contexto
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
