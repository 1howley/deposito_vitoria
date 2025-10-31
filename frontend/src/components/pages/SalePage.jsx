import { useState } from "react";
import { ProductCard } from "../molecules/ProductCard";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../atoms/select";
import { Search, Grid, List, ArrowLeft } from "lucide-react";

export function SalePage({ onAddToCart, onBack }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");

    // Produtos em Oferta (Seus dados)
    const offersProducts = [
        {
            id: "o1",
            name: "Cimento Portland CP-V-ARI 50kg",
            price: 38.9,
            originalPrice: 45.9,
            image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?w=800",
            category: "Materiais Básicos",
            description: "Cimento de alta resistência inicial para estruturas",
            inStock: true,
            rating: 4.9,
            discount: 15,
        },
        // ... (resto dos seus produtos em oferta) ...
        {
            id: "o12",
            name: "Compensado Naval 15mm",
            price: 159.9,
            originalPrice: 189.9,
            image: "https://images.unsplash.com/photo-1647124498956-1ba4742f5f4e?w=800",
            category: "Madeiras",
            description: "Compensado naval resistente à umidade",
            inStock: true,
            rating: 4.7,
            discount: 16,
        },
    ];

    // Categorias baseadas nos produtos em oferta (Sua lógica)
    const categories = [
        {
            id: "all",
            name: "Todas as Categorias",
            count: offersProducts.length,
        },
        {
            id: "Materiais Básicos",
            name: "Materiais Básicos",
            count: offersProducts.filter(
                (p) => p.category === "Materiais Básicos"
            ).length,
        },
        {
            id: "Ferramentas",
            name: "Ferramentas",
            count: offersProducts.filter((p) => p.category === "Ferramentas")
                .length,
        },
        {
            id: "Tintas e Pintura",
            name: "Tintas e Pintura",
            count: offersProducts.filter(
                (p) => p.category === "Tintas e Pintura"
            ).length,
        },
        {
            id: "Madeiras",
            name: "Madeiras",
            count: offersProducts.filter((p) => p.category === "Madeiras")
                .length,
        },
    ];

    // Sua lógica de filtro e ordenação
    const filteredProducts = offersProducts
        .filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "discount":
                    return (b.discount || 0) - (a.discount || 0);
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-background">
            {/* CABEÇALHO COM FILTROS - ÍCONE REMOVIDO */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    {/* Linha 1: Botão Voltar e Título */}
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <Button
                            variant="ghost"
                            onClick={onBack}
                            className="flex items-center gap-2 shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Voltar</span>
                        </Button>
                        <div className="min-w-0 flex-1">
                            {" "}
                            {/* Removido flex e gap */}
                            {/* O ícone <Percent /> foi removido daqui */}
                            <div>
                                <h1 className="text-xl md:text-3xl font-bold truncate">
                                    Ofertas Especiais
                                </h1>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    {filteredProducts.length} produtos
                                    encontrados
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Linha 2: Busca, Filtros e View Mode */}
                    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar produtos em oferta..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10 md:h-12"
                            />
                        </div>

                        {/* Mobile filters row */}
                        <div className="grid grid-cols-2 gap-2 md:hidden">
                            {/* ... selects mobile ... */}
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger className="h-10 text-sm">
                                    {" "}
                                    <SelectValue placeholder="Categoria" />{" "}
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name} ({cat.count})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-10 text-sm">
                                    {" "}
                                    <SelectValue placeholder="Ordenar" />{" "}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="discount">
                                        Maior Desconto
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Menor Preço
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Maior Preço
                                    </SelectItem>
                                    <SelectItem value="name">
                                        Nome A-Z
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Desktop filters */}
                        <div className="hidden md:flex md:gap-2">
                            {/* ... selects desktop ... */}
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger className="w-auto md:w-56 h-12">
                                    {" "}
                                    <SelectValue placeholder="Categoria" />{" "}
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name} ({cat.count})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-auto md:w-48 h-12">
                                    {" "}
                                    <SelectValue placeholder="Ordenar por" />{" "}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="discount">
                                        Maior Desconto
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Menor Preço
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Maior Preço
                                    </SelectItem>
                                    <SelectItem value="name">
                                        Nome A-Z
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* View Mode */}
                        <div className="flex bg-muted rounded-lg p-1 self-start md:h-12 md:items-center">
                            {/* ... botões view mode ... */}
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 flex-1 md:flex-auto"
                            >
                                {" "}
                                <Grid className="w-4 h-4" />{" "}
                                <span className="hidden sm:inline">
                                    Grade
                                </span>{" "}
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 flex-1 md:flex-auto"
                            >
                                {" "}
                                <List className="w-4 h-4" />{" "}
                                <span className="hidden sm:inline">
                                    Lista
                                </span>{" "}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ##### FIM DA SEÇÃO SUBSTITUÍDA ##### */}

            {/* CONTEÚDO ORIGINAL DA PÁGINA (Produtos Grid/Lista) */}
            <div className="container mx-auto px-4 py-8">
                {/* ... (resto do seu código original para exibir os produtos em oferta) ... */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border">
                        <p className="text-muted-foreground mb-2">
                            Nenhum produto encontrado
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Tente ajustar os filtros de busca
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "space-y-4"
                        }
                    >
                        {filteredProducts.map((product) =>
                            viewMode === "grid" ? (
                                <div key={product.id} className="relative">
                                    {product.discount && (
                                        <div className="absolute top-2 right-2 z-10 bg-accent text-accent-foreground px-2 py-1 rounded-lg text-xs font-bold">
                                            {" "}
                                            -{product.discount}%{" "}
                                        </div>
                                    )}
                                    <ProductCard
                                        product={product}
                                        onAddToCart={onAddToCart}
                                    />
                                </div>
                            ) : (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg border p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 object-cover rounded-lg shrink-0"
                                        />
                                        {product.discount && (
                                            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-2 py-1 rounded-lg text-xs font-bold">
                                                {" "}
                                                -{product.discount}%{" "}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {/* ... (resto da sua view de lista) ... */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold mb-1">
                                                    {product.name}
                                                </h3>
                                                <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-primary">
                                                        {new Intl.NumberFormat(
                                                            "pt-BR",
                                                            {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            }
                                                        ).format(product.price)}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-muted-foreground line-through">
                                                            {new Intl.NumberFormat(
                                                                "pt-BR",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "BRL",
                                                                }
                                                            ).format(
                                                                product.originalPrice
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    onAddToCart(product)
                                                }
                                                disabled={!product.inStock}
                                                className="shrink-0 w-full sm:w-auto"
                                                size="sm"
                                            >
                                                {" "}
                                                {product.inStock
                                                    ? "Adicionar"
                                                    : "Indisponível"}{" "}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
            {/* FIM DO CONTEÚDO ORIGINAL */}
        </div>
    );
}
