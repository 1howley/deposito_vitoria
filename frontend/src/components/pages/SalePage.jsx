// --- 1. Importações dos Componentes ---
// Importamos os organismos e moléculas necessários para construir a página.
import { ProductCard } from "../molecules/ProductCard.jsx";

// --- 2. Dados Fictícios (Mock Data) ---
// Em uma aplicação real, estes dados viriam de uma API ou de um estado global.
// Para este exemplo, vamos criar uma lista de produtos aqui mesmo.
const mockProducts = [
    {
        id: 1,
        imageUrl: "https://via.placeholder.com/300", // Substitua pela URL da sua imagem
        name: "Brita",
        description:
            "Uma breve descrição que destaca os benefícios deste produto.",
        price: 199.9,
        originalPrice: 220.0,
    },
    {
        id: 2,
        imageUrl: "https://via.placeholder.com/300", // Substitua pela URL da sua imagem
        name: "Areia",
        description:
            "Ideal para resolver o seu problema X com muita eficiência.",
        price: 249.5,
        originalPrice: 249.5,
    },
];

// --- 3. Componente da Página de Vendas ---
// Este é o componente principal que renderiza toda a página.
export function SalePage() {
    return (
        <section className="container mx-auto px-4 pb-24">
            {/* Div usado apenas para criar espaço */}
            {/* Título da seção de produtos */}
            <h2 className="text-3xl font-bold text-center mb-8 ">
                Nossas Ofertas
            </h2>

            {/* Grade para exibir os cards de produto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Usamos o método .map() para percorrer a lista de produtos
            e criar um componente ProductCard para cada item.
          */}
                {mockProducts.map((product) => (
                    <ProductCard
                        key={product.id} // A "key" é importante para o React otimizar a renderização de listas
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}
