import React, { useState } from "react";
import { 
  User, 
  Phone, 
  Lock, 
  Home, 
  Settings,
  ChevronLeft,
  ShoppingBag,
  Heart,
  Crown,
  ChevronRight,
  Menu,
  Info,
  MapPin
} from "lucide-react";
import { Button } from "../atoms/button";
import { 
    Sheet, 
    SheetContent, 
} from "../atoms/sheet"; 
import { useAuth } from "../../hooks/useAuth"; 

// Função auxiliar para o conteúdo principal
const RenderMainContent = ({ activeSection, setActiveSection, profileCards, user }) => {
  // Botão voltar comum para todas as sub-páginas
  const BackButton = () => (
    <button 
      onClick={() => setActiveSection("profile")}
      className="flex items-center text-primary hover:underline mb-6 font-medium text-sm"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      voltar
    </button>
  );

  switch (activeSection) {
    case "personal-data":
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <BackButton />
          <h2 className="text-2xl font-bold mb-8">Dados Pessoais</h2>

          <div className="space-y-1">
            {/* Nome */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b">
              <div className="w-full md:w-1/4 mb-2 md:mb-0">
                <span className="font-bold text-foreground">Nome</span>
              </div>
              <div className="flex-1 text-muted-foreground uppercase">
                {user?.name || "CELIO HENRIQUE PIMENTA JUNIOR"}
              </div>
              <button className="text-primary font-bold text-sm hover:underline mt-2 md:mt-0">
                editar
              </button>
            </div>

            {/* CPF */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b">
              <div className="w-full md:w-1/4 mb-2 md:mb-0">
                <span className="font-bold text-foreground">CPF</span>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground">136.***.***-76</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Este dado não pode ser alterado</p>
              </div>
              <button className="text-primary font-bold text-sm hover:underline mt-2 md:mt-0">
                mostrar
              </button>
            </div>

            {/* Data de Nascimento */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b">
              <div className="w-full md:w-1/4 mb-2 md:mb-0 flex items-center gap-2">
                <span className="font-bold text-foreground">Data de nascimento</span>
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 text-muted-foreground">
                --/--/----
              </div>
              <button className="text-primary font-bold text-sm hover:underline mt-2 md:mt-0">
                editar
              </button>
            </div>
          </div>
        </div>
      );

    case "contacts":
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <BackButton />
          <h2 className="text-2xl font-bold mb-8">Contatos</h2>

          <div className="space-y-1">
            {/* E-mail */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b">
              <div className="w-full md:w-1/4 mb-2 md:mb-0">
                <span className="font-bold text-foreground">e-mail</span>
              </div>
              <div className="flex-1 text-muted-foreground">
                {user?.email || "killatomic3434@gmail.com"}
              </div>
              <button className="text-primary font-bold text-sm hover:underline mt-2 md:mt-0">
                editar
              </button>
            </div>

            {/* Celular */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b">
              <div className="w-full md:w-1/4 mb-2 md:mb-0 flex items-center gap-2">
                <span className="font-bold text-foreground">Celular <span className="font-normal text-muted-foreground">- principal</span></span>
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 text-muted-foreground">
                (31) 99702-8696
              </div>
              <button className="text-primary font-bold text-sm hover:underline mt-2 md:mt-0">
                editar
              </button>
            </div>

            {/* Preferências de contato */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b">
              <div className="w-full md:w-1/4 mb-2 md:mb-0 flex items-center gap-2">
                <span className="font-bold text-foreground">Preferências de contato</span>
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 text-muted-foreground">
                {/* Espaço vazio conforme imagem */}
              </div>
              <button className="text-primary font-bold text-sm hover:underline mt-2 md:mt-0">
                editar
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Adicionar novo telefone
            </Button>
          </div>
        </div>
      );

    case "access-data":
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <BackButton />
          <h2 className="text-2xl font-bold mb-4">Dados de acesso</h2>
          <p className="text-muted-foreground mb-8">
            Mantenha sua senha sempre atualizada. Clique abaixo para alterar sua senha
          </p>

          <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-md font-bold shadow-sm">
            Alterar Senha
          </Button>
        </div>
      );

    case "addresses":
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <BackButton />
          <h2 className="text-2xl font-bold mb-8">Endereços</h2>

          <div className="flex flex-col items-center justify-center py-12">
            {/* Ilustração Placeholder */}
            <div className="mb-6 bg-gray-100 rounded-full p-8">
                <Home className="w-24 h-24 text-gray-300" strokeWidth={1} />
            </div>
            
            <p className="text-primary font-bold mb-8 text-lg">Sem endereço cadastrado</p>

            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 font-bold rounded-md">
              Adicionar novo endereço
            </Button>
          </div>
        </div>
      );

    case "orders":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-8">Meus Pedidos</h2>
          <p>Aqui você verá a lista dos seus pedidos.</p>
          <Button onClick={() => setActiveSection("profile")} variant="outline" className="mt-4">Voltar</Button>
        </div>
      );
      
    case "favorites":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-8">Favoritos</h2>
          <p>Aqui você verá seus produtos favoritados.</p>
          <Button onClick={() => setActiveSection("profile")} variant="outline" className="mt-4">Voltar</Button>
        </div>
      );

    case "preferences":
        return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <BackButton />
                <h2 className="text-2xl font-bold mb-8">Preferências</h2>
                <p className="text-muted-foreground">Gerencie suas preferências de notificação e privacidade.</p>
            </div>
        );

    case "profile":
    default:
      // Layout do Meu Perfil (Cards)
      return (
        <>
          <h2 className="text-2xl font-bold mb-8">Meu Perfil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {profileCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveSection(card.id)}
                  className="border-2 rounded-xl p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{card.title}</h3> 
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
                <h3 className="font-semibold mb-1">Informações do Cliente</h3>
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
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [isFidelityOpen, setIsFidelityOpen] = useState(true); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Definição dos dados
  const menuItems = [
    { id: "profile", label: "Meu Perfil", icon: User },
    { id: "orders", label: "Meus Pedidos", icon: ShoppingBag },
    { id: "favorites", label: "Favoritos", icon: Heart }
  ];

  const profileCards = [
    { id: "personal-data", title: "Dados Pessoais", description: "Gerencie seus dados pessoais: nome e CPF.", icon: User },
    { id: "contacts", title: "Contatos", description: "Gerencie e-mails e telefones cadastrados.", icon: Phone },
    { id: "access-data", title: "Dados de Acesso", description: "Troque sua senha.", icon: Lock },
    { id: "addresses", title: "Endereços", description: "Altere ou adicione endereços de entregas.", icon: Home },
    { id: "preferences", title: "Preferências", description: "Confira suas preferências.", icon: Settings }
  ];


  // Conteúdo do Menu lateral
  const renderSidebarContent = (isMobile = false) => (
    <div className="h-full">
        
        {/* TOP USER SECTION */}
        <div className={`flex flex-col items-start gap-4 mb-6 pb-6 border-b ${isMobile ? "p-4 pt-8" : "p-6 pt-8"}`}> 
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center relative flex-shrink-0">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div className="absolute bottom-0 right-0 size-5 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white">
                      P
                    </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">{user?.name || "CÉLIO"}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="font-bold text-primary">0</span> pts
                  </div>
                </div>
            </div>
        </div>

        {/* NAVIGATION LINKS SECTION */}
        <div className="px-6 pb-6">
            <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 px-3">
                Minha Conta
            </h3>
            <nav className="space-y-1">
                {menuItems.map((item) => {
                    const isActive = activeSection === item.id || (
                        (activeSection === "personal-data" || 
                         activeSection === "contacts" || 
                         activeSection === "access-data" || 
                         activeSection === "addresses" ||
                         activeSection === "preferences") 
                        && item.id === "profile"
                    );

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => {
                                    setActiveSection(item.id);
                                    if (isMobile) {
                                        setIsMobileMenuOpen(false); 
                                    }
                                }}
                                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                                    isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground hover:bg-muted"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </nav>
        </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-10 w-10 p-0 shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <Crown className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="font-bold text-primary truncate">Minha Conta</h1>
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="h-10 w-10 p-0 shrink-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-6">

          {/* Sidebar - Desktop */}
          <aside className="w-full md:w-72 md:flex-shrink-0 hidden md:block bg-white rounded-2xl shadow-sm border">
            {renderSidebarContent(false)}
          </aside>

          {/* Sidebar - Mobile (Overlay) */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent 
                side="left" 
                className="p-0 w-72 pt-0"
            >
                {renderSidebarContent(true)}
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border">
              
              <RenderMainContent 
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                profileCards={profileCards} 
                user={user}
              />

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}