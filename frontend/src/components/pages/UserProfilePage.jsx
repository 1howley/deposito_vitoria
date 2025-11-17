import React, { useState } from "react"; // Adicionado 'React' por segurança
import { 
  User, 
  Phone, 
  Lock, 
  Home, 
  Settings,
  ChevronLeft,
  ShoppingBag,
  Award,
  Heart,
  Crown,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "../atoms/button";

// <-- CORREÇÃO 2: Criada função para renderizar o conteúdo dinâmico -->
const RenderMainContent = ({ activeSection, profileCards }) => {
  switch (activeSection) {
    case "orders":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-8">Meus Pedidos</h2>
          <p>Aqui você verá a lista dos seus pedidos.</p>
        </div>
      );

    case "advantages":
    case "exchange":
    case "points":
    case "debts":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-8">Fidelidade</h2>
          <p>Seção de fidelidade. (Mostrando: {activeSection})</p>
        </div>
      );
      
    case "favorites":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-8">Favoritos</h2>
          <p>Aqui você verá seus produtos favoritados.</p>
        </div>
      );

    case "profile":
    default:
      // Este é o conteúdo original do seu "Meu Perfil"
      return (
        <>
          <h2 className="text-2xl font-bold mb-8">Meu Perfil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {profileCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="border-2 rounded-xl p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{card.title}</h3> {/* Adicionei classes de fonte */}
                      <p className="text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 md:p-6 bg-muted/30 rounded-xl border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Informações do Cliente</h3> {/* Adicionei classe de fonte */}
                <p className="text-sm text-muted-foreground">
                  Mantenha seus dados sempre atualizados para garantir que você receba 
                  todas as informações sobre seus pedidos e promoções exclusivas.
                </p>
              </div>
            </div>
          </div>
        </>
      );
  }
};


export function UserProfilePage({ onBack }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isFidelityOpen, setIsFidelityOpen] = useState(false);

  const menuItems = [
    { id: "profile", label: "Meu Perfil", icon: User },
    { id: "orders", label: "Meus Pedidos", icon: ShoppingBag },
    { 
      id: "fidelity", 
      label: "Fidelidade", 
      icon: Award,
      submenu: [
        { id: "advantages", label: "Vantagens" },
        { id: "exchange", label: "Troque" },
        { id: "points", label: "Meus pontos" },
        { id: "debts", label: "Dívidas" }
      ]
    },
    { id: "favorites", label: "Favoritos", icon: Heart }
  ];

  const profileCards = [
    { id: "personal-data", title: "Dados Pessoais", description: "Gerencie seus dados pessoais: nome e CPF.", icon: User },
    { id: "contacts", title: "Contatos", description: "Gerencie e-mails e telefones cadastrados.", icon: Phone },
    { id: "access-data", title: "Dados de Acesso", description: "Troque sua senha.", icon: Lock },
    { id: "addresses", title: "Endereços", description: "Altere ou adicione endereços de entregas.", icon: Home },
    { id: "preferences", title: "Preferências", description: "Confira suas preferências.", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile Header (Sem alterações) */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-10 w-10 p-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Crown className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="font-bold text-primary">Minha Conta</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-72 md:flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              {/* Logo/Title (Sem alterações) */}
              <div className="mb-6 pb-6 border-b hidden md:block">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="mb-4 -ml-2"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Crown className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Depósito</p>
                    <p className="font-bold text-primary">Vitória Cajuru</p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div>
                <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 px-3">
                  Minha Conta
                </h3>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    // <-- CORREÇÃO 3: Lógica de 'ativo' melhorada -->
                    const isSubmenuActive = item.submenu && item.submenu.some(sub => sub.id === activeSection);
                    const isActive = activeSection === item.id || isSubmenuActive;

                    return (
                      <div key={item.id}>
                        <button
                          onClick={() => {
                            if (item.submenu) {
                              setIsFidelityOpen(!isFidelityOpen);
                            } else {
                              setActiveSection(item.id);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                            isActive // <-- Usando a nova variável 'isActive'
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{item.label}</span> {/* Adicionei font-medium */}
                          </div>
                          {item.submenu && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                isFidelityOpen ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        {/* Submenu (Sem alterações) */}
                        {item.submenu && isFidelityOpen && (
                          <div className="ml-10 mt-1 space-y-1">
                            {item.submenu.map((subitem) => (
                              <button
                                key={subitem.id}
                                onClick={() => setActiveSection(subitem.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  activeSection === subitem.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted"
                                }`}
                              >
                                {subitem.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border">
              
              {/* <-- CORREÇÃO 2: Chamando a função de renderização --> */}
              <RenderMainContent 
                activeSection={activeSection} 
                profileCards={profileCards} 
              />

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}