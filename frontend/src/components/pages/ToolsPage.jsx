import { useState, useEffect } from "react";
// ADICIONADO: Imports do router
import { useOutletContext, useNavigate } from "react-router";
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
import { Search, Grid, List, ArrowLeft, Wrench, Loader2 } from "lucide-react";
import { ProductService } from "../../services/products/ProductService";

// REMOVIDO: props (onAddToCart, onBack)
export function ToolsPage() {
    // ADICIONADO: Lógica de contexto e navegação
    const navigate = useNavigate();
    const onBack = () => navigate(-1);

    const context = useOutletContext();
    const onAddToCart =
        context?.addToCart ||
        ((p) => console.error("Erro: addToCart não encontrado", p));

    // ... (RESTANTE DO CÓDIGO PERMANECE IGUAL)
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await ProductService.getAll();
                const allProducts = Array.isArray(data)
                    ? data
                    : data.products || [];
                const toolsOnly = allProducts.filter(
                    (p) => p.category === "Ferramentas"
                );
                setProducts(toolsOnly);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const subcategories = [
        { id: "all", name: "Todas", count: products.length },
        {
            id: "Manuais",
            name: "Manuais",
            count: products.filter((p) => p.subcategory === "Manuais").length,
        },
        {
            id: "Elétricas",
            name: "Elétricas",
            count: products.filter((p) => p.subcategory === "Elétricas").length,
        },
        {
            id: "Medição",
            name: "Medição",
            count: products.filter((p) => p.subcategory === "Medição").length,
        },
        {
            id: "Acessórios",
            name: "Acessórios",
            count: products.filter((p) => p.subcategory === "Acessórios")
                .length,
        },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description &&
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));
        const matchesSubcategory =
            selectedSubcategory === "all" ||
            product.subcategory === selectedSubcategory;
        let matchesPrice = true;
        const price = Number(product.price);
        if (priceRange === "under50") matchesPrice = price < 50;
        if (priceRange === "50to200")
            matchesPrice = price >= 50 && price <= 200;
        if (priceRange === "over200") matchesPrice = price > 200;
        return matchesSearch && matchesSubcategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        switch (sortBy) {
            case "price-asc":
                return priceA - priceB;
            case "price-desc":
                return priceB - priceA;
            case "rating":
                return (b.rating || 0) - (a.rating || 0);
            case "name":
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return (
        <div className="min-h-screen bg-background">
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
                                <Wrench className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl">
                                    Ferramentas
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {isLoading
                                        ? "Carregando..."
                                        : `${sortedProducts.length} produtos encontrados`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar ferramentas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11 bg-muted/30"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">
                            Buscando ferramentas...
                        </p>
                    </div>
                ) : (
                    <>
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
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">
                                        Nome (A-Z)
                                    </SelectItem>
                                    <SelectItem value="price-asc">
                                        Menor Preço
                                    </SelectItem>
                                    <SelectItem value="price-desc">
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
                                    <SelectItem value="under50">
                                        Até R$ 50
                                    </SelectItem>
                                    <SelectItem value="50to200">
                                        R$ 50 - R$ 200
                                    </SelectItem>
                                    <SelectItem value="over200">
                                        Acima de R$ 200
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
                        {sortedProducts.length > 0 ? (
                            <div
                                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
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
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    Nenhum produto encontrado com os filtros
                                    selecionados.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
