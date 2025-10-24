import { useState } from "react";
import { ProductCard } from "../molecules/ProductCard"; // <- ATENÇÃO: Corrigir para "@/components/molecules/ProductCard" se usar alias
import { Button } from "../atoms/button"; // <- ATENÇÃO: Corrigir para "@/components/atoms/button" se usar alias
import { Input } from "../atoms/input"; // <- ATENÇÃO: Corrigir para "@/components/atoms/input" se usar alias
import { Badge } from "../atoms/badge"; // <- ATENÇÃO: Corrigir para "@/components/atoms/badge" se usar alias
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../atoms/select"; // <- ATENÇÃO: Corrigir para "@/components/atoms/select" se usar alias
import { Search, Grid, List, ArrowLeft, Package, TrendingUp, Star, Filter } from "lucide-react";

export function BasicsPage({ onAddToCart, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState("all");

  // Produtos de Materiais Básicos (Seus dados)
  const basicsProducts = [
    { id: "b1", name: "Cimento Portland CP-V-ARI 50kg", price: 38.90, originalPrice: 45.90, image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?w=800", subcategory: "Cimento", description: "Cimento de alta resistência inicial para estruturas e acabamentos", inStock: true, rating: 4.9, bestseller: true },
    // ... (resto dos seus produtos) ...
    { id: "b25", name: "Aditivo Acelerador de Pega 1L", price: 22.90, image: "https://images.unsplash.com/photo-1635789145651-d5770bc33039?w=800", subcategory: "Aditivos", description: "Acelera o tempo de pega do concreto", inStock: true, rating: 4.5 }
  ];

  const subcategories = [ // Suas subcategorias
    { id: "all", name: "Todos", icon: Package },
    { id: "Cimento", name: "Cimento", icon: Package },
    { id: "Agregados", name: "Agregados", icon: Package },
    { id: "Blocos e Tijolos", name: "Blocos e Tijolos", icon: Package },
    { id: "Cal e Argamassa", name: "Cal e Argamassa", icon: Package },
    { id: "Aditivos", name: "Aditivos", icon: Package }
  ];

  // Sua lógica de filtro e ordenação
  const filteredProducts = basicsProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedSubcategory === "all" || product.subcategory === selectedSubcategory;
      let matchesPrice = true;
      if (priceRange === "under-20") matchesPrice = product.price < 20;
      else if (priceRange === "20-50") matchesPrice = product.price >= 20 && product.price < 50;
      else if (priceRange === "over-50") matchesPrice = product.price >= 50;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "name": return a.name.localeCompare(b.name);
        case "rating": return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

  // Sua lógica de bestsellers (mantida)
  const bestsellerProducts = basicsProducts.filter(p => p.bestseller);

  return (
    <div className="min-h-screen bg-background">
      {/* ##### INÍCIO DA SEÇÃO SUBSTITUÍDA ##### */}
      {/* CABEÇALHO COM FILTROS - NOVO (Estilo CatalogPage) */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* Linha 1: Botão Voltar e Título */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 shrink-0">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-3xl font-bold truncate">Materiais Básicos</h1>
              <p className="text-muted-foreground text-sm md:text-base">{filteredProducts.length} produtos encontrados</p>
            </div>
          </div>

          {/* Linha 2: Busca, Filtros e View Mode */}
          <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar em Materiais Básicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 md:h-12"
              />
            </div>

            {/* Mobile filters row */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                <SelectTrigger className="h-10 text-sm"> <SelectValue placeholder="Categoria" /> </SelectTrigger>
                <SelectContent>
                  {subcategories.map(category => {
                    const count = category.id === "all" ? basicsProducts.length : basicsProducts.filter(p => p.subcategory === category.id).length;
                    return (<SelectItem key={category.id} value={category.id}>{category.name} ({count})</SelectItem>);
                  })}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 text-sm"> <SelectValue placeholder="Ordenar" /> </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop filters */}
            <div className="hidden md:flex md:gap-2">
              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                <SelectTrigger className="w-auto md:w-56 h-12"> <SelectValue placeholder="Categoria" /> </SelectTrigger>
                <SelectContent>
                  {subcategories.map(category => {
                    const count = category.id === "all" ? basicsProducts.length : basicsProducts.filter(p => p.subcategory === category.id).length;
                    return (<SelectItem key={category.id} value={category.id}>{category.name} ({count})</SelectItem>);
                  })}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-auto md:w-48 h-12"> <SelectValue placeholder="Ordenar por" /> </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex bg-muted rounded-lg p-1 self-start md:h-12 md:items-center">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="flex items-center gap-1 md:gap-2 px-2 md:px-3 flex-1 md:flex-auto"> <Grid className="w-4 h-4" /> <span className="hidden sm:inline">Grade</span> </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="flex items-center gap-1 md:gap-2 px-2 md:px-3 flex-1 md:flex-auto"> <List className="w-4 h-4" /> <span className="hidden sm:inline">Lista</span> </Button>
            </div>
          </div>
        </div>
      </div>
      {/* ##### FIM DA SEÇÃO SUBSTITUÍDA ##### */}

      {/* CONTEÚDO ORIGINAL DA PÁGINA (Produtos Grid/Lista) */}
      <div className="container mx-auto px-4 py-8">
        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border">
            <p className="text-muted-foreground mb-2">Nenhum produto encontrado</p>
            <p className="text-muted-foreground text-sm">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map(product => (
              viewMode === "grid" ? (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ) : (
                <div key={product.id} className="bg-white rounded-lg border p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold mb-1">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{product.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                        className="shrink-0 w-full sm:w-auto"
                        size="sm"
                      >
                        {product.inStock ? 'Adicionar' : 'Indisponível'}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      {/* FIM DO CONTEÚDO ORIGINAL */}
    </div>
  );
}