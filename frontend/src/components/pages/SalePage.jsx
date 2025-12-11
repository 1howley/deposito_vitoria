import { useState, useEffect } from "react";
// ADICIONADO
import { useOutletContext, useNavigate } from "react-router";
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
import { Search, Grid, List, ArrowLeft, Percent, Loader2 } from "lucide-react";
import { ProductService } from "../../services/products/ProductService";

// REMOVIDO: props
export function SalePage() {
    // ADICIONADO
    const navigate = useNavigate();
    const onBack = () => navigate(-1);
    const context = useOutletContext();
    const onAddToCart = context?.addToCart || ((p) => console.error("Erro: addToCart não encontrado", p));

    // ... (RESTANTE DO CÓDIGO PERMANECE IGUAL)
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("price-low");
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setIsLoading(true);
                const data = await ProductService.getAll();
                const allProducts = data.products || [];
                const cheapProducts = allProducts.sort((a, b) => Number(a.basePrice) - Number(b.basePrice)).slice(0, 12);
                setProducts(cheapProducts);
            } catch (error) {
                console.error("Erro ao buscar ofertas:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const filteredProducts = products
        .filter((product) => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
            const priceA = Number(a.basePrice);
            const priceB = Number(b.basePrice);
            switch (sortBy) {
                case "price-low": return priceA - priceB;
                case "price-high": return priceB - priceA;
                case "name": return a.name.localeCompare(b.name);
                default: return 0;
            }
        });

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Voltar</span>
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Percent className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-red-600">Ofertas Especiais</h1>
                                <p className="text-sm text-muted-foreground">{isLoading ? "Carregando..." : `${filteredProducts.length} itens em promoção`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Buscar nas ofertas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Ordenar" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price-low">Menor Preço</SelectItem>
                                    <SelectItem value="price-high">Maior Preço</SelectItem>
                                    <SelectItem value="name">Nome (A-Z)</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex bg-muted rounded-lg p-1">
                                <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="px-3"><Grid className="h-4 w-4" /></Button>
                                <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="px-3"><List className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border border-dashed"><p className="text-muted-foreground">Nenhuma oferta encontrada com estes filtros.</p></div>
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.productId} product={product} onAddToCart={onAddToCart} viewMode={viewMode} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}