import { useState } from "react";
import { ProductCard } from "../molecules/ProductCard"; // O tipo 'Product' e caminho foram ajustados
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Badge } from "../atoms/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../atoms/select";
import { Search, Filter, Grid, List, ArrowLeft } from "lucide-react";

export function CatalogPage({ products, categories, onAddToCart, onBack }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");

    // Filter and sort products
    const filteredProducts = products
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
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    const categoryOptions = [
        { id: "all", name: "Todas as Categorias", count: products.length },
        ...categories.map((cat) => ({
            id: cat.name,
            name: cat.name,
            count: products.filter((p) => p.category === cat.name).length,
        })),
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <Button
                            variant="ghost"
                            onClick={onBack}
                            className="flex items-center gap-2 shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Voltar</span>
                        </Button>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-3xl font-bold truncate">
                                Catálogo de Produtos
                            </h1>
                            <p className="text-muted-foreground text-sm md:text-base">
                                {filteredProducts.length} produtos encontrados
                            </p>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="space-y-3 md:space-y-0 md:flex md:gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar produtos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10 md:h-auto"
                            />
                        </div>

                        {/* Mobile filters row */}
                        <div className="grid grid-cols-2 gap-2 md:hidden">
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger className="h-10 text-sm">
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name} ({category.count})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-10 text-sm">
                                    <SelectValue placeholder="Ordenar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">
                                        Nome A-Z
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Menor Preço
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Maior Preço
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Desktop filters */}
                        <div className="hidden md:flex md:gap-4">
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name} ({category.count})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">
                                        Nome A-Z
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Menor Preço
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Maior Preço
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* View Mode */}
                        <div className="flex bg-muted rounded-lg p-1 self-start">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-3"
                            >
                                <Grid className="w-4 h-4" />
                                <span className="hidden sm:inline">Grade</span>
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-3"
                            >
                                <List className="w-4 h-4" />
                                <span className="hidden sm:inline">Lista</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="container mx-auto px-4 py-6 md:py-8">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 md:py-16">
                        <p className="text-muted-foreground text-base md:text-lg">
                            Nenhum produto encontrado
                        </p>
                        <p className="text-muted-foreground text-sm md:text-base">
                            Tente ajustar os filtros de busca
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                                : "space-y-3 md:space-y-4"
                        }
                    >
                        {filteredProducts.map((product) =>
                            viewMode === "grid" ? (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart}
                                />
                            ) : (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg border p-3 md:p-4 flex items-center gap-3 md:gap-4"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-4">
                                            <div className="min-w-0 flex-1">
                                                <Badge
                                                    variant="outline"
                                                    className="mb-1 md:mb-2 text-xs"
                                                >
                                                    {product.category}
                                                </Badge>
                                                <h3 className="font-semibold mb-1 text-sm md:text-base truncate">
                                                    {product.name}
                                                </h3>
                                                <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base md:text-lg font-bold text-primary">
                                                        {new Intl.NumberFormat(
                                                            "pt-BR",
                                                            {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            }
                                                        ).format(product.price)}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-xs md:text-sm text-muted-foreground line-through">
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
                                                className="shrink-0 w-full sm:w-auto text-xs md:text-sm"
                                                size="sm"
                                            >
                                                {product.inStock
                                                    ? "Adicionar"
                                                    : "Indisponível"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
