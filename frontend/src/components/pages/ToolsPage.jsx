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
    Wrench,
    TrendingUp,
    Star,
    Filter,
} from "lucide-react";

export function ToolsPage({ onAddToCart, onBack }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState("all");

    // Produtos de Ferramentas
    const toolsProducts = [
        // Ferramentas Elétricas
        {
            id: "t1",
            name: "Furadeira de Impacto DeWalt 850W",
            price: 329.9,
            originalPrice: 399.9,
            image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?w=800",
            subcategory: "Ferramentas Elétricas",
            description:
                "Furadeira profissional com controle de velocidade e maleta",
            inStock: true,
            rating: 4.9,
            bestseller: true,
        },
        {
            id: "t2",
            name: "Parafusadeira Makita 12V Bivolt",
            price: 279.9,
            originalPrice: 329.9,
            image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?w=800",
            subcategory: "Ferramentas Elétricas",
            description: "Parafusadeira sem fio com 2 baterias de lítio",
            inStock: true,
            rating: 4.8,
            bestseller: true,
        },
        {
            id: "t3",
            name: "Lixadeira Orbital Bosch 250W",
            price: 189.9,
            image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?w=800",
            subcategory: "Ferramentas Elétricas",
            description: "Lixadeira orbital com coletor de pó integrado",
            inStock: true,
            rating: 4.7,
        },
        {
            id: "t4",
            name: "Serra Circular Black+Decker 1400W",
            price: 299.9,
            originalPrice: 349.9,
            image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?w=800",
            subcategory: "Ferramentas Elétricas",
            description: 'Serra circular 7.1/4" com guia laser',
            inStock: true,
            rating: 4.6,
        },
        {
            id: "t5",
            name: "Esmerilhadeira Angular Makita 850W",
            price: 249.9,
            image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?w=800",
            subcategory: "Ferramentas Elétricas",
            description: 'Esmerilhadeira 4.1/2" com empunhadura ergonômica',
            inStock: true,
            rating: 4.7,
        },
        {
            id: "t6",
            name: "Martelete Perfurador Bosch 800W",
            price: 449.9,
            originalPrice: 529.9,
            image: "https://images.unsplash.com/photo-1607586408909-151ba11a12e2?w=800",
            subcategory: "Ferramentas Elétricas",
            description:
                "Martelete perfurador rotativo com maleta e acessórios",
            inStock: true,
            rating: 4.9,
        },

        // Ferramentas Manuais
        {
            id: "t7",
            name: "Kit Ferramentas Stanley 89 Peças",
            price: 189.9,
            originalPrice: 249.9,
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
            subcategory: "Ferramentas Manuais",
            description:
                "Kit completo com chaves, alicates e ferramentas diversas",
            inStock: true,
            rating: 4.8,
            bestseller: true,
        },
        {
            id: "t8",
            name: "Jogo de Chaves Combinadas 12 Peças",
            price: 89.9,
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
            subcategory: "Ferramentas Manuais",
            description: "Chaves combinadas de 6mm a 22mm em aço cromo-vanádio",
            inStock: true,
            rating: 4.6,
        },
        {
            id: "t9",
            name: "Martelo Unha 25mm Tramontina",
            price: 24.9,
            originalPrice: 29.9,
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
            subcategory: "Ferramentas Manuais",
            description: "Martelo unha com cabo de fibra de vidro",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "t10",
            name: 'Alicate Universal 8" Gedore',
            price: 34.9,
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
            subcategory: "Ferramentas Manuais",
            description: "Alicate universal forjado em aço especial",
            inStock: true,
            rating: 4.7,
        },
        {
            id: "t11",
            name: "Trena 5m Stanley PowerLock",
            price: 29.9,
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
            subcategory: "Ferramentas Manuais",
            description: "Trena métrica 5 metros com trava",
            inStock: true,
            rating: 4.6,
        },
        {
            id: "t12",
            name: 'Serrote Carpinteiro 20" Irwin',
            price: 39.9,
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
            subcategory: "Ferramentas Manuais",
            description: "Serrote com dentes temperados e cabo ergonômico",
            inStock: true,
            rating: 4.5,
        },

        // Ferragens
        {
            id: "t13",
            name: "Parafuso Fenda 6x50mm Caixa 500un",
            price: 15.9,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
            subcategory: "Ferragens",
            description: "Parafusos para madeira zincados",
            inStock: true,
            rating: 4.4,
            bestseller: true,
        },
        {
            id: "t14",
            name: "Bucha Nylon S8 com Parafuso 100un",
            price: 12.9,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
            subcategory: "Ferragens",
            description: "Buchas nylon 8mm com parafusos inclusos",
            inStock: true,
            rating: 4.3,
        },
        {
            id: "t15",
            name: "Prego 18x27 Polido 1kg",
            price: 8.9,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
            subcategory: "Ferragens",
            description: "Pregos de aço polido para uso geral",
            inStock: true,
            rating: 4.2,
        },
        {
            id: "t16",
            name: 'Dobradiça 3" Aço Cromado Par',
            price: 6.9,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
            subcategory: "Ferragens",
            description: "Dobradiça para portas internas cromada",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "t17",
            name: "Fechadura Interna Pado 55mm",
            price: 45.9,
            originalPrice: 54.9,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
            subcategory: "Ferragens",
            description: "Fechadura para porta interna com acabamento cromado",
            inStock: true,
            rating: 4.6,
        },

        // Equipamentos de Segurança
        {
            id: "t18",
            name: "Capacete de Segurança Classe B",
            price: 18.9,
            image: "https://images.unsplash.com/photo-1605816663439-c6f00461ac88?w=800",
            subcategory: "Segurança",
            description: "Capacete de segurança com carneira ajustável",
            inStock: true,
            rating: 4.7,
            bestseller: true,
        },
        {
            id: "t19",
            name: "Óculos de Proteção Incolor",
            price: 9.9,
            image: "https://images.unsplash.com/photo-1605816663439-c6f00461ac88?w=800",
            subcategory: "Segurança",
            description: "Óculos de proteção com lente antirrisco",
            inStock: true,
            rating: 4.5,
        },
        {
            id: "t20",
            name: "Luva de Raspa Cano Longo",
            price: 12.9,
            image: "https://images.unsplash.com/photo-1605816663439-c6f00461ac88?w=800",
            subcategory: "Segurança",
            description: "Luva de raspa para proteção das mãos",
            inStock: true,
            rating: 4.4,
        },
        {
            id: "t21",
            name: "Protetor Auricular Tipo Concha",
            price: 16.9,
            image: "https://images.unsplash.com/photo-1605816663439-c6f00461ac88?w=800",
            subcategory: "Segurança",
            description: "Protetor auricular com atenuação de 20dB",
            inStock: true,
            rating: 4.6,
        },
        {
            id: "t22",
            name: "Máscara PFF2 Descartável 10un",
            price: 24.9,
            originalPrice: 29.9,
            image: "https://images.unsplash.com/photo-1605816663439-c6f00461ac88?w=800",
            subcategory: "Segurança",
            description: "Máscaras de proteção respiratória PFF2",
            inStock: true,
            rating: 4.7,
        },
        {
            id: "t23",
            name: "Cinto de Segurança Tipo Paraquedista",
            price: 89.9,
            image: "https://images.unsplash.com/photo-1605816663439-c6f00461ac88?w=800",
            subcategory: "Segurança",
            description: "Cinto de segurança para trabalho em altura",
            inStock: true,
            rating: 4.8,
        },
    ];

    // Subcategorias
    const subcategories = [
        { id: "all", name: "Todas", count: toolsProducts.length },
        {
            id: "Ferramentas Elétricas",
            name: "Ferramentas Elétricas",
            count: toolsProducts.filter(
                (p) => p.subcategory === "Ferramentas Elétricas"
            ).length,
        },
        {
            id: "Ferramentas Manuais",
            name: "Ferramentas Manuais",
            count: toolsProducts.filter(
                (p) => p.subcategory === "Ferramentas Manuais"
            ).length,
        },
        {
            id: "Ferragens",
            name: "Ferragens",
            count: toolsProducts.filter((p) => p.subcategory === "Ferragens")
                .length,
        },
        {
            id: "Segurança",
            name: "Equipamentos de Segurança",
            count: toolsProducts.filter((p) => p.subcategory === "Segurança")
                .length,
        },
    ];

    // Filtrar produtos
    const filteredProducts = toolsProducts.filter((product) => {
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
        if (priceRange === "50to200")
            matchesPrice = product.price >= 50 && product.price <= 200;
        if (priceRange === "over200") matchesPrice = product.price > 200;

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
                                <Wrench className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl">
                                    Ferramentas
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
                            placeholder="Buscar ferramentas..."
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
