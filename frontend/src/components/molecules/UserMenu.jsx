import React from 'react';
// Importa um ícone (ex: react-icons)
import { FaUser } from 'react-icons/fa';

// Usamos React.forwardRef para passar a 'ref' do Header para o 'div' principal
const UserMenu = React.forwardRef((props, ref) => {
    
    // A lógica de renderização condicional é a mesma:
    // Se 'isOpen' for false, não renderiza nada.
    if (!props.isOpen) {
        return null;
    }

    // Se 'isOpen' for true, renderiza o menu com classes do Tailwind
    return (
        <div 
            className="user-dropdown absolute top-full right-0 mt-2 
                       bg-white border border-gray-200 rounded-xl shadow-lg z-50"
            style={{ width: '320px' }} // Usa a largura personalizada definida no tailwind.config.js
            ref={ref} // Conecta o 'ref' do Header a este 'div'
        >
            {/* Seção 1: Cabeçalho do menu */}
            <div className="menu-header flex items-center p-5 border-b border-gray-100">
                <div className="user-avatar w-12 h-12 bg-vermelho-botao rounded-full 
                                flex items-center justify-center text-vermelho-botao text-xl mr-4">
                    <FaUser color='#ba2025'/>
                </div>
                <div className="user-info flex flex-col">
                    <span className="user-name font-bold text-lg text-gray-900">CELIO</span>
                </div>
            </div>

            {/* Seção 3: Links de navegação */}
            <nav className="menu-links pb-2">
                <ul>
                    <link
                        href="#" className="block py-2 px-6 text-base text-gray-800 
                                              transition-colors duration-200 hover:bg-gray-100"
                            to="profile"
                            >  
                            Meu Perfil
                        </link>
                            
                    <li>
                        <a href="#" className="block py-2 px-6 text-base text-gray-800 
                                              transition-colors duration-200 hover:bg-gray-100">
                            Pedidos
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-6 text-base text-gray-800 
                                              transition-colors duration-200 hover:bg-gray-100">
                            Favoritos
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-6 text-base text-gray-800 
                                              transition-colors duration-200 hover:bg-gray-100">
                            Sair
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
});

export default UserMenu;