import { useState, useEffect } from "react";
import { ProductCard } from "../molecules/ProductCard";
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
import {
    Search,
    Grid,
    List,
    ArrowLeft,
    Package,
    Loader2, // Loading
} from "lucide-react";
// Ajuste o caminho conforme sua estrutura
import { ProductService } from "../../services/products/ProductService";

export function BasicsPage({ onAddToCart, onBack }) {
    // Estado dos dados e Loading
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filtros e View
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState("all");

    // BUSCAR DADOS DA API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await ProductService.getAll();
                const allProducts = Array.isArray(data)
                    ? data
                    : data.products || [];

                // FILTRA APENAS CATEGORIA 'MATERIAIS BÁSICOS'
                // Certifique-se que no seu banco está escrito exatamente assim ou "Materiais Basicos"
                const basicsOnly = allProducts.filter(
                    (p) => p.category === "Materiais Básicos"
                );
                setProducts(basicsOnly);
            } catch (error) {
                console.error("Erro ao buscar materiais básicos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Subcategorias Dinâmicas
    const subcategories = [
        { id: "all", name: "Todos", count: products.length },
        {
            id: "Cimento",
            name: "Cimento",
            count: products.filter((p) => p.subcategory === "Cimento").length,
        },
        {
            id: "Agregados",
            name: "Agregados",
            count: products.filter((p) => p.subcategory === "Agregados").length,
        },
        {
            id: "Blocos e Tijolos",
            name: "Blocos e Tijolos",
            count: products.filter((p) => p.subcategory === "Blocos e Tijolos")
                .length,
        },
        {
            id: "Cal e Argamassa",
            name: "Cal e Argamassa",
            count: products.filter((p) => p.subcategory === "Cal e Argamassa")
                .length,
        },
        {
            id: "Aditivos",
            name: "Aditivos",
            count: products.filter((p) => p.subcategory === "Aditivos").length,
        },
    ];

    // Lógica de filtro
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description &&
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));

        const matchesCategory =
            selectedSubcategory === "all" ||
            product.subcategory === selectedSubcategory;

        let matchesPrice = true;
        const price = Number(product.price);

        if (priceRange === "under-20") matchesPrice = price < 20;
        else if (priceRange === "20-50")
            matchesPrice = price >= 20 && price < 50;
        else if (priceRange === "over-50") matchesPrice = price >= 50;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Ordenação
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);

        switch (sortBy) {
            case "price-low":
                return priceA - priceB;
            case "price-high":
                return priceB - priceA;
            case "name":
                return a.name.localeCompare(b.name);
            case "rating":
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Voltar</span>
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl">
                                    Materiais Básicos
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {isLoading
                                        ? "Carregando..."
                                        : `${sortedProducts.length} produtos encontrados`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar cimento, areia, tijolos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11 bg-muted/30"
                        />
                    </div>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">
                            Buscando materiais...
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Subcategories */}
                        <div className="mb-6">
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {subcategories.map((subcat) => (
                                    <Button
                                        key={subcat.id}
                                        variant={
                                            selectedSubcategory === subcat.id
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setSelectedSubcategory(subcat.id)
                                        }
                                        className="whitespace-nowrap rounded-full"
                                    >
                                        {subcat.name}
                                        <Badge
                                            variant="secondary"
                                            className="ml-2"
                                        >
                                            {subcat.count}
                                        </Badge>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Filters row */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            {/* Select de Categoria extra para mobile se necessário, ou manter apenas os botões acima */}

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[200px]">
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
                                    <SelectItem value="rating">
                                        Melhor Avaliação
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={priceRange}
                                onValueChange={setPriceRange}
                            >
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Faixa de preço" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Todos os preços
                                    </SelectItem>
                                    <SelectItem value="under-20">
                                        Até R$ 20
                                    </SelectItem>
                                    <SelectItem value="20-50">
                                        R$ 20 - R$ 50
                                    </SelectItem>
                                    <SelectItem value="over-50">
                                        Acima de R$ 50
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-2 ml-auto">
                                <Button
                                    variant={
                                        viewMode === "grid"
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="w-10 h-10 p-0"
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={
                                        viewMode === "list"
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="w-10 h-10 p-0"
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Grid de Produtos */}
                        {sortedProducts.length === 0 ? (
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
                                {sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={onAddToCart}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
