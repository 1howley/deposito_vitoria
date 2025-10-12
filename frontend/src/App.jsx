import { useState, useEffect } from "react";
// Caminhos atualizados para a nova estrutura
import { Header } from "./components/organisms/Header";
import { HeroSection } from "./components/organisms/HeroSection";
import { CategorySection } from "./components/organisms/CategorySection";
import { ProductCard } from "./components/molecules/ProductCard";
import { CatalogPage } from "./components/pages/CatalogPage";
import { ShoppingCart } from "./components/organisms/ShoppingCart";
import { Footer } from "./components/organisms/Footer";
import { WhatsAppFloat } from "./components/atoms/WhatsAppFloat";
import { toast } from "sonner";

export default function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("home");

    // Mock data para categorias
    const categories = [
        {
            id: "materiais-basicos",
            name: "Materiais Básicos",
            image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjZW1lbnQlMjBicmlja3N8ZW58MXx8fHwxNzU4OTg1MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            description: "Cimento, areia, brita, blocos e tijolos",
            productCount: 45,
            isPopular: true
        },
        // ...resto das categorias
    ];

    // Todos os produtos do catalogo
    const allProducts = [
        // exemplo de produto
        {
            id: "1",
            name: "Cimento Portland CP-V-ARI 50kg",
            price: 38.90,
            originalPrice: 45.90,
            image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjZW1lbnQlMjBicmlja3N8ZW58MXx8fHwxNzU4OTg1MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "Materiais Básicos",
            description: "Cimento de alta resistência inicial para estruturas",
            inStock: true,
            rating: 4.9
        },
        // ...resto dos produtos
    ];

    // Featured products for home page
    const featuredProducts = allProducts.slice(0, 6);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                toast.success(`Quantidade atualizada: ${product.name}`);
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                toast.success(`Adicionado ao carrinho: ${product.name}`);
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        toast.success("Item removido do carrinho");
    };

    const handleCheckout = () => {
        toast.success("Redirecionando para finalização da compra...");
    };

    const handleCategoryClick = (categoryId) => {
        setCurrentPage("catalog");
    };

    const scrollToProducts = () => {
        if (currentPage === "home") {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setCurrentPage("catalog");
        }
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (currentPage === "catalog") {
        return (
            <div className="min-h-screen bg-background">
                <CatalogPage
                    products={allProducts}
                    categories={categories}
                    onAddToCart={addToCart}
                    onBack={() => setCurrentPage("home")}
                />

                <ShoppingCart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeFromCart}
                    onCheckout={handleCheckout}
                />

                <WhatsAppFloat />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
                onCatalogClick={() => setCurrentPage("catalog")}
            />

            <main>
                <HeroSection onShopNow={scrollToProducts} />

                <CategorySection
                    categories={categories}
                    onCategoryClick={handleCategoryClick}
                />

                <section id="products" className="py-12 md:py-20 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                                Produtos em <span className="text-primary">Destaque</span>
                            </h2>
                            <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-4">
                                Confira nossa seleção de produtos mais vendidos com qualidade garantida
                                e os melhores preços para sua obra.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {featuredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <ShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
            />

            <WhatsAppFloat />
        </div>
    );
}