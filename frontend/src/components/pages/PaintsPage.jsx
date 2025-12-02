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
    Paintbrush,
    Loader2, // Importei um ícone de loading
} from "lucide-react";
// Assumindo que o ProductService está em um arquivo separado, ajuste o caminho conforme necessário
import { ProductService } from "../../services/products/ProductService";

export function PaintsPage({ onAddToCart, onBack }) {
    // Estado dos dados
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Estados de filtro e visualização
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

                // Verifica a estrutura do retorno (algumas APIs retornam array direto, outras um objeto paginado)
                const allProducts = Array.isArray(data)
                    ? data
                    : data.products || data.items || [];

                // FILTRA APENAS CATEGORIA 'TINTAS' (Conforme solicitado)
                const tintasOnly = allProducts.filter(
                    (p) => p.category === "Tintas"
                );

                setProducts(tintasOnly);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                // Opcional: Adicionar um toast ou estado de erro aqui
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Subcategorias (Cálculo dinâmico baseado no estado 'products')
    const subcategories = [
        { id: "all", name: "Todas", count: products.length },
        {
            id: "Tintas Internas",
            name: "Tintas Internas",
            count: products.filter((p) => p.subcategory === "Tintas Internas")
                .length,
        },
        {
            id: "Tintas Externas",
            name: "Tintas Externas",
            count: products.filter((p) => p.subcategory === "Tintas Externas")
                .length,
        },
        {
            id: "Complementos",
            name: "Complementos",
            count: products.filter((p) => p.subcategory === "Complementos")
                .length,
        },
        {
            id: "Acessórios",
            name: "Acessórios",
            count: products.filter((p) => p.subcategory === "Acessórios")
                .length,
        },
    ];

    // Filtrar produtos (Busca, Subcategoria selecionada, Preço)
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
        const price = Number(product.price); // Garantir que é número

        if (priceRange === "under50") matchesPrice = price < 50;
        if (priceRange === "50to150")
            matchesPrice = price >= 50 && price <= 150;
        if (priceRange === "over150") matchesPrice = price > 150;

        return matchesSearch && matchesSubcategory && matchesPrice;
    });

    // Ordenar produtos
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
                                <Paintbrush className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl">
                                    Tintas e Pintura
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
                            placeholder="Buscar tintas e acessórios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11 bg-muted/30"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Renderização Condicional: Loading ou Conteúdo */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">
                            Buscando produtos...
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

                        {/* Filters and Sort */}
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
                                    <SelectItem value="50to150">
                                        R$ 50 - R$ 150
                                    </SelectItem>
                                    <SelectItem value="over150">
                                        Acima de R$ 150
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

                        {/* Products Grid */}
                        {sortedProducts.length > 0 ? (
                            <div
                                className={`grid gap-6 ${
                                    viewMode === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "grid-cols-1"
                                }`}
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
