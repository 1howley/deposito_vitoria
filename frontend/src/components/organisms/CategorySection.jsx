import { ImageWithFallback } from "../atoms/ImageWithFallback";
import { Badge } from "../atoms/badge";
import { ArrowRight } from "lucide-react";

export function CategorySection({ categories, onCategoryClick }) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Nossas <span className="text-primary">Categorias</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg px-4">
            Explore nossa seleção completa de materiais de construção
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="group cursor-pointer bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border/50 hover:border-primary/20"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {category.isPopular && (
                  <Badge className="absolute top-3 md:top-4 left-3 md:left-4 bg-accent text-accent-foreground text-xs">
                    🔥 Popular
                  </Badge>
                )}

                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-xs md:text-sm">{category.productCount} produtos</p>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold group-hover:text-accent transition-colors text-sm md:text-base">
                    Explorar
                  </span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}