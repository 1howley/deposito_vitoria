import { useState } from "react";
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
    TrendingUp,
    Star,
    Filter,
} from "lucide-react";

export function PaintsPage({ onAddToCart, onBack }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState("all");

    // Produtos de Tintas
    const paintsProducts = [
        // Tintas Internas
        {
            id: "p1",
            name: "Tinta Acrílica Premium Suvinil 18L Branco",
            price: 149.9,
            originalPrice: 189.9,
            image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?w=800",
            subcategory: "Tintas Internas",
            description:
                "Tinta acrílica lavável de alta cobertura para ambientes internos",
            inStock: true,
            rating: 4.9,
            bestseller: true,
        },
        {
            id: "p2",
            name: "Tinta Látex PVA Coral 18L Branco Neve",
            price: 89.9,
            originalPrice: 109.9,
            image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?w=800",
            subcategory: "Tintas Internas",
            description: "Tinta látex econômica para paredes internas",
            inStock: true,
            rating: 4.7,
            bestseller: true,
        },
        {
            id: "p3",
            name: "Tinta Acrílica Sherwin Williams 3.6L",
            price: 54.9,
            image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?w=800",
            subcategory: "Tintas Internas",
            description: "Tinta acrílica premium com alta resistência",
            inStock: true,
            rating: 4.8,
        },
        {
            id: "p4",
            name: "Tinta Látex Iquine 18L Branco Gelo",
            price: 79.9,
            image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?w=800",
            subcategory: "Tintas Internas",
            description: "Tinta látex com ótimo rendimento para interiores",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "p5",
            name: "Tinta Lousa Coral 900ml Preto",
            price: 39.9,
            originalPrice: 49.9,
            image: "https://images.unsplash.com/photo-1573919226685-2dd15ebabf57?w=800",
            subcategory: "Tintas Internas",
            description: "Tinta efeito lousa para escrever com giz",
            inStock: true,
            rating: 4.6,
        },

        // Tintas Externas
        {
            id: "p6",
            name: "Tinta Acrílica Premium Suvinil 18L Fosca",
            price: 169.9,
            originalPrice: 209.9,
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
            subcategory: "Tintas Externas",
            description: "Tinta acrílica fosca resistente a intempéries",
            inStock: true,
            rating: 4.9,
            bestseller: true,
        },
        {
            id: "p7",
            name: "Tinta Acrílica Coral 18L Branco Neve",
            price: 139.9,
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
            subcategory: "Tintas Externas",
            description: "Tinta acrílica para fachadas e áreas externas",
            inStock: true,
            rating: 4.7,
        },
        {
            id: "p8",
            name: "Tinta Texturizada Suvinil 25kg Areia",
            price: 189.9,
            originalPrice: 229.9,
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
            subcategory: "Tintas Externas",
            description: "Textura acrílica rústica para fachadas",
            inStock: true,
            rating: 4.8,
        },
        {
            id: "p9",
            name: "Tinta Impermeabilizante Vedacit 18L",
            price: 159.9,
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
            subcategory: "Tintas Externas",
            description: "Tinta impermeabilizante para lajes e muros",
            inStock: true,
            rating: 4.6,
        },
        {
            id: "p10",
            name: "Tinta para Piso Coral 3.6L Cinza",
            price: 69.9,
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
            subcategory: "Tintas Externas",
            description: "Tinta acrílica para pisos externos e internos",
            inStock: true,
            rating: 4.5,
        },

        // Complementos
        {
            id: "p11",
            name: "Massa Corrida Suvinil 25kg",
            price: 49.9,
            originalPrice: 59.9,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
            subcategory: "Complementos",
            description: "Massa corrida PVA para nivelamento de paredes",
            inStock: true,
            rating: 4.7,
            bestseller: true,
        },
        {
            id: "p12",
            name: "Selador Acrílico Coral 18L",
            price: 69.9,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
            subcategory: "Complementos",
            description: "Selador para preparação de superfícies",
            inStock: true,
            rating: 4.6,
        },
        {
            id: "p13",
            name: "Primer PU 900ml Cinza",
            price: 34.9,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
            subcategory: "Complementos",
            description: "Primer de alta aderência para metal e madeira",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "p14",
            name: "Verniz Marítimo Iquine 900ml",
            price: 44.9,
            originalPrice: 52.9,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
            subcategory: "Complementos",
            description: "Verniz brilhante resistente à água",
            inStock: true,
            rating: 4.7,
        },
        {
            id: "p15",
            name: "Removedor de Tintas Barrakleen 1L",
            price: 24.9,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
            subcategory: "Complementos",
            description: "Removedor de tintas e vernizes multiuso",
            inStock: true,
            rating: 4.4,
        },
        {
            id: "p16",
            name: "Fundo Preparador Suvinil 3.6L",
            price: 39.9,
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
            subcategory: "Complementos",
            description: "Fundo preparador de parede selador",
            inStock: true,
            rating: 4.6,
        },

        // Acessórios
        {
            id: "p17",
            name: "Kit Pintura Completo Condor 7 Peças",
            price: 29.9,
            originalPrice: 39.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Kit com rolos, bandejas e pincéis diversos",
            inStock: true,
            rating: 4.6,
            bestseller: true,
        },
        {
            id: "p18",
            name: "Rolo de Lã Tigre 23cm",
            price: 12.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Rolo de lã sintética para tintas látex",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "p19",
            name: 'Pincel Condor 3" Cerdas Sintéticas',
            price: 8.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Pincel para acabamentos com cerdas sintéticas",
            inStock: true,
            rating: 4.4,
        },
        {
            id: "p20",
            name: "Bandeja para Pintura 23cm",
            price: 6.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Bandeja plástica para rolo de pintura",
            inStock: true,
            rating: 4.3,
        },
        {
            id: "p21",
            name: "Fita Crepe 18mm x 50m",
            price: 4.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Fita crepe para proteção em pintura",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "p22",
            name: "Espátula de Aço 10cm",
            price: 9.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Espátula de aço para aplicação de massa",
            inStock: true,
            rating: 4.4,
        },
        {
            id: "p23",
            name: "Lixa para Parede Grão 120 Kit 10un",
            price: 14.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Lixas para acabamento de paredes",
            inStock: true,
            rating: 4.6,
        },
        {
            id: "p24",
            name: "Extensão Telescópica para Rolo 3m",
            price: 34.9,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
            subcategory: "Acessórios",
            description: "Cabo extensivo para pintura de tetos e paredes altas",
            inStock: true,
            rating: 4.7,
        },
    ];

    // Subcategorias
    const subcategories = [
        { id: "all", name: "Todas", count: paintsProducts.length },
        {
            id: "Tintas Internas",
            name: "Tintas Internas",
            count: paintsProducts.filter(
                (p) => p.subcategory === "Tintas Internas"
            ).length,
        },
        {
            id: "Tintas Externas",
            name: "Tintas Externas",
            count: paintsProducts.filter(
                (p) => p.subcategory === "Tintas Externas"
            ).length,
        },
        {
            id: "Complementos",
            name: "Complementos",
            count: paintsProducts.filter(
                (p) => p.subcategory === "Complementos"
            ).length,
        },
        {
            id: "Acessórios",
            name: "Acessórios",
            count: paintsProducts.filter((p) => p.subcategory === "Acessórios")
                .length,
        },
    ];

    // Filtrar produtos
    const filteredProducts = paintsProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesSubcategory =
            selectedSubcategory === "all" ||
            product.subcategory === selectedSubcategory;

        let matchesPrice = true;
        if (priceRange === "under50") matchesPrice = product.price < 50;
        if (priceRange === "50to150")
            matchesPrice = product.price >= 50 && product.price <= 150;
        if (priceRange === "over150") matchesPrice = product.price > 150;

        return matchesSearch && matchesSubcategory && matchesPrice;
    });

    // Ordenar produtos
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
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
                                    {sortedProducts.length} produtos encontrados
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
                                <Badge variant="secondary" className="ml-2">
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
                            <SelectItem value="name">Nome (A-Z)</SelectItem>
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

                    <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Faixa de preço" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os preços</SelectItem>
                            <SelectItem value="under50">Até R$ 50</SelectItem>
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
                                viewMode === "grid" ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="w-10 h-10 p-0"
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={
                                viewMode === "list" ? "default" : "outline"
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
            </div>
        </div>
    );
}
