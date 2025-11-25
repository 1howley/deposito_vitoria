import { useState } from "react";

import { Outlet, useNavigate } from "react-router"; // Importe Outlet e useNavigate

import { Header } from "./Header";

import { Footer } from "./Footer";

import { ShoppingCart } from "./ShoppingCart";

import { WhatsAppFloat } from "../atoms/WhatsAppFloat";

import { toast } from "sonner";



// O estado e a lógica do carrinho agora vivem aqui!

export function Layout() {

const [cartItems, setCartItems] = useState([]);

const [isCartOpen, setIsCartOpen] = useState(false);

const navigate = useNavigate(); // Hook para navegação programática



const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);



// Funções de gerenciamento do carrinho (movidas do App.js)

const addToCart = (product) => {

setCartItems((prev) => {

const existingItem = prev.find((item) => item.id === product.id);

if (existingItem) {

toast.success(`Quantidade atualizada: ${product.name}`);

return prev.map((item) =>

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

setCartItems((prev) =>

prev.map((item) => (item.id === id ? { ...item, quantity } : item))

);

};



const removeFromCart = (id) => {

setCartItems((prev) => prev.filter((item) => item.id !== id));

toast.success("Item removido do carrinho");

};



const handleCheckout = () => {

toast.success("Redirecionando para finalização da compra...");

// Ex: navigate('/checkout');

};

// Passamos um objeto de contexto para o Outlet, para que as páginas filhas possam acessar a lógica do carrinho

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

// Link para o catálogo agora é gerenciado pelo componente Link do react-router no próprio Header

/>

<main>

{/* O Outlet renderiza a página correspondente à rota atual */}

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