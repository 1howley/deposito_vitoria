import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, Search, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Badge } from "../atoms/badge";
import logo from "../../assets/logo.jpg";
import UserMenu from "../molecules/UserMenu";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export function Header({ cartCount, onCartClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const iconRef = useRef(null);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const { user } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            navigate("/catalog", { state: { search: searchValue } });
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                iconRef.current &&
                !iconRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            {/* MUDANÇA AQUI: 
                1. Removi 'container', 'mx-auto' e 'max-w-7xl'.
                2. Adicionei 'w-full' para ocupar 100% da tela.
                3. Aumentei o padding lateral em telas grandes ('md:px-8 lg:px-12') para ficar nos cantos, mas bonito.
            */}
            <div className="w-full px-4 md:px-8 lg:px-36 py-4 md:py-6">
                {/* Linha Superior: Logo, Busca, Carrinho */}
                <div className="flex items-center justify-between gap-4">
                    {/* Lado Esquerdo: Logo */}
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 w-auto md:w-64">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Depósito Vitória Logo"
                                className="h-8 md:h-12 w-auto object-contain"
                            />
                        </Link>
                        <Link to="/">
                            <div className="min-w-0">
                                <h1 className="text-lg md:text-2xl font-bold text-primary truncate leading-tight">
                                    Depósito Vitória
                                </h1>
                                <p className="text-xs text-muted-foreground hidden sm:block">
                                    Materiais de Construção
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Centro: Barra de Busca (Apenas Desktop) */}
                    <div className="flex-1 max-w-3xl px-4 hidden md:flex justify-center">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                            <Input
                                placeholder="O que você procura no Depósito Vitória?"
                                className="pl-12 h-12 bg-gray-100 border-0 rounded-full w-full focus-visible:ring-primary/20"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>

                    {/* Lado Direito: Ações (Login, Menu, Carrinho) */}
                    <div className="flex items-center justify-end gap-2 md:w-64">
                        {!user && (
                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden md:flex h-10 md:h-12 px-6 rounded-full font-medium"
                                >
                                    <span>Entrar</span>
                                </Button>
                            </Link>
                        )}

                        {user && (
                            <div className="relative hidden md:flex">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 md:h-12 w-10 md:w-12 p-0 rounded-full hover:bg-gray-100"
                                    onClick={toggleMenu}
                                    ref={iconRef}
                                >
                                    <FaUser className="h-5 w-5 text-gray-700" />
                                </Button>

                                <UserMenu isOpen={isMenuOpen} ref={menuRef} />
                            </div>
                        )}

                        <Button
                            onClick={onCartClick}
                            size="sm"
                            className="relative h-10 md:h-12 px-4 md:px-6 rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="hidden sm:inline ml-2 font-medium">
                                Carrinho
                            </span>
                            {cartCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white border-2 border-white text-[10px]">
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>

                        {/* Botão Menu Mobile */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="md:hidden h-10 w-10 p-0"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Navegação Desktop Centralizada */}
                <nav className="mt-6 hidden md:block">
                    <div className="flex justify-center">
                        <ul className="flex items-center space-x-2 lg:space-x-8 bg-muted/30 rounded-full px-2 py-1.5 border border-border/40">
                            {[
                                { to: "catalog", label: "Catálogo" },
                                { to: "sale", label: "Ofertas" },
                                { to: "basics", label: "Materiais Básicos" },
                                { to: "tools", label: "Ferramentas" },
                                { to: "paints", label: "Tintas" },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="block px-5 py-2 rounded-full text-base font-medium text-foreground/80 hover:text-primary hover:bg-white hover:shadow-sm transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}

                            {user?.role === "ADMIN" && (
                                <>
                                    <div className="w-px h-6 bg-border mx-2"></div>
                                    <li>
                                        <Link
                                            to="add-product"
                                            className="block px-5 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-white hover:shadow-sm transition-all duration-200"
                                        >
                                            Add Produto
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="admin/orders"
                                            className="block px-5 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-white hover:shadow-sm transition-all duration-200"
                                        >
                                            Rastreio
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>

                {/* Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="mt-4 md:hidden animate-in slide-in-from-top-2 duration-200 border-t pt-4">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar produtos..."
                                className="pl-10 h-11 bg-muted/30 border-0 rounded-xl text-sm w-full"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>

                        <nav className="bg-muted/20 rounded-2xl p-2">
                            <ul className="space-y-1">
                                {[
                                    { to: "/catalog", label: "Catálogo" },
                                    { to: "/sale", label: "Ofertas" },
                                    {
                                        to: "/basics",
                                        label: "Materiais Básicos",
                                    },
                                    { to: "/tools", label: "Ferramentas" },
                                    { to: "/paints", label: "Tintas" },
                                ].map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="block py-3 px-4 text-foreground hover:text-primary font-medium rounded-xl hover:bg-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}

                                {user ? (
                                    <>
                                        <li className="border-t border-border/10 my-2"></li>
                                        <li className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground font-bold opacity-70">
                                            Minha Conta
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className="flex items-center py-3 px-4 text-foreground hover:bg-white rounded-xl"
                                            >
                                                <FaUser className="mr-3 h-4 w-4 text-primary" />
                                                Perfil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile?section=orders"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className="flex items-center py-3 px-4 text-foreground hover:bg-white rounded-xl"
                                            >
                                                <ShoppingBag className="mr-3 h-4 w-4 text-primary" />
                                                Meus Pedidos
                                            </Link>
                                        </li>
                                        {user.role === "ADMIN" && (
                                            <>
                                                <li className="px-4 py-2 text-xs uppercase tracking-wider text-red-600 font-bold opacity-70 mt-2">
                                                    Admin
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/add-product"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false
                                                            )
                                                        }
                                                        className="block py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl font-medium"
                                                    >
                                                        Adicionar Produto
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/admin/orders"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false
                                                            )
                                                        }
                                                        className="block py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl font-medium"
                                                    >
                                                        Gestão de Pedidos
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <li className="border-t border-border/10 my-2"></li>
                                        <li>
                                            <Link
                                                to="/login"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className="block py-3 px-4 text-center bg-primary text-white font-bold rounded-xl shadow-sm hover:bg-primary/90"
                                            >
                                                Fazer Login / Cadastrar
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
