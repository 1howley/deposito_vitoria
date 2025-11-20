import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Badge } from "../atoms/badge";
import logo from "../../assets/logo.jpg";
import UserMenu from "../molecules/UserMenu";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export function Header({ cartCount, onCartClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const iconRef = useRef(null);

    const { user } = useAuth();
    console.log(user)
    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                iconRef.current &&
                !iconRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false); // Fecha o menu
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-between gap-2 md:gap-4">
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="logo da minha empresa - voltar para a pagina inicial"
                            />
                        </Link>
                        <Link to="/">
                            <div className="min-w-0">
                                <h1 className="text-lg md:text-2xl font-bold text-primary truncate">
                                    Depósito Vitória
                                </h1>
                                <p className="text-xs text-muted-foreground hidden sm:block">
                                    Materiais de Construção
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Search bar - Desktop */}
                    <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                            <Input
                                placeholder="O que você procura no Depósito Vitória?"
                                className="pl-12 h-12 bg-gray-100 border-0 rounded-full"
                            />
                        </div>
                    </div>

                    {/* Cart and Menu */}
                    <div className="flex items-center gap-2">
                        {!user && (
                            <Link to="login">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden md:flex h-10 md:h-12 px-3 md:px-6 rounded-full"
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
                                    className="h-10 md:h-12 w-10 md:w-12 p-0 rounded-full"
                                    onClick={toggleMenu}
                                    ref={iconRef}
                                >
                                    <FaUser className="h-4 w-4 md:h-5 md:w-5" />
                                </Button>

                                <UserMenu isOpen={isMenuOpen} ref={menuRef} />
                            </div>
                        )}

                        <Button
                            onClick={onCartClick}
                            size="sm"
                            className="relative h-10 md:h-12 px-3 md:px-6 rounded-full"
                        >
                            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="hidden sm:inline ml-2">
                                Carrinho
                            </span>
                            {cartCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-5 w-5 md:h-6 md:w-6 flex items-center justify-center p-0 bg-accent text-xs">
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="md:hidden h-10 w-10 p-0"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="mt-4 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar produtos..."
                            className="pl-10 h-10 bg-muted/30 border-0 rounded-full text-sm"
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="mt-6 hidden md:block">
                    <div className="flex justify-center">
                        <ul className="flex space-x-12 bg-muted/20 rounded-full px-8 py-3">
                            <Link
                                className="text-foreground hover:text-primary transition-colors font-medium"
                                to="catalog"
                            >
                                Catálogo
                            </Link>
                            <Link
                                className="text-foreground hover:text-primary transition-colors font-medium"
                                to="sale"
                            >
                                Ofertas
                            </Link>
                            <Link
                                className="text-foreground hover:text-primary transition-colors font-medium"
                                to="basics"
                            >
                                Materiais Básicos
                            </Link>
                            <Link className="text-foreground hover:text-primary transition-colors font-medium" to="tools">
                                Ferramentas
                            </Link>
                            <Link className="text-foreground hover:text-primary transition-colors font-medium" to="paints">
                                Tintas
                            </Link>
                            {user?.role == 'ADMIN' && (
                                <Link
                                    className="text-foreground hover:text-primary transition-colors font-medium"
                                    to="add-product"
                                >
                                    Add Product
                                </Link>
                            )}
                        </ul>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="mt-4 md:hidden">
                        <div className="bg-muted/20 rounded-2xl p-4">
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                    >
                                        Catálogo
                                    </button>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                    >
                                        Ofertas
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                    >
                                        Materiais Básicos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                    >
                                        Ferramentas
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                    >
                                        Tintas
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                    >
                                        Atendimento
                                    </a>
                                </li>
                                {user?.role === 'admin' && (
                                    <li>
                                        <Link
                                            to="/add-product"
                                            className="block py-2 px-3 text-foreground hover:text-primary transition-colors font-medium rounded-lg hover:bg-white/50"
                                        >
                                            Add Product
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
