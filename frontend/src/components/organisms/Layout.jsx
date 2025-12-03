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

    const addToCart = (product) => {
        const safeId = product.productId || product.id;
        if (!safeId) return;

        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === safeId);
            // Verifica estoque atual do item no carrinho
            const currentQtyInCart = existingItem ? existingItem.quantity : 0;

            // Se tentar adicionar mais que o estoque, bloqueia e avisa
            if (currentQtyInCart + 1 > product.stock) {
                toast.error(`Estoque máximo atingido para ${product.name}`);
                return prev;
            }

            if (existingItem) {
                toast.success(`Quantidade atualizada: ${product.name}`);
                return prev.map((item) =>
                    item.id === safeId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                toast.success(`Adicionado ao carrinho: ${product.name}`);
                return [
                    ...prev,
                    {
                        ...product,
                        id: safeId,
                        productId: safeId,
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

        // Verifica estoque antes de aumentar
        const item = cartItems.find((i) => i.id === targetId);
        if (item && quantity > item.stock) {
            toast.error("Limite de estoque atingido");
            return;
        }

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
        setIsCartOpen(false);
        navigate("/checkout");
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const contextProps = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        handleCheckout,
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
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
