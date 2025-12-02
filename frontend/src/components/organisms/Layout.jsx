import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Header } from "./Header";
import Footer from "./Footer";
import { ShoppingCart } from "./ShoppingCart";
import { WhatsAppFloat } from "../atoms/WhatsAppFloat";
import { toast } from "sonner";

export function Layout() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // --- LÓGICA DO CARRINHO PADRONIZADA ---

    const addToCart = (product) => {
        // 1. Normalização: O ID oficial do item será o productId (do banco) ou o id (se já vier formatado)
        const safeId = product.productId || product.id;

        if (!safeId) {
            console.error("Produto sem ID detectado:", product);
            toast.error("Erro ao adicionar produto: ID inválido");
            return;
        }

        setCartItems((prev) => {
            // Buscamos pelo ID normalizado
            const existingItem = prev.find((item) => item.id === safeId);

            if (existingItem) {
                toast.success(`Quantidade atualizada: ${product.name}`);
                return prev.map((item) =>
                    item.id === safeId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                toast.success(`Adicionado ao carrinho: ${product.name}`);
                // IMPORTANTE: Salvamos no estado garantindo que 'id' existe e é igual ao 'productId'
                return [
                    ...prev,
                    {
                        ...product,
                        id: safeId, // Garante consistência para o front
                        productId: safeId, // Mantém referência para o back
                        quantity: 1,
                    },
                ];
            }
        });
    };

    const updateQuantity = (targetId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(targetId);
            return;
        }

        // Como garantimos o 'id' no addToCart, a busca aqui fica simples
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === targetId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (targetId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== targetId));
        toast.success("Item removido do carrinho");
    };

    const handleCheckout = () => {
        toast.success("Redirecionando para finalização da compra...");
        // navigate('/checkout');
    };

    const contextProps = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        handleCheckout,
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
            />

            <main>
                <Outlet context={contextProps} />
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
