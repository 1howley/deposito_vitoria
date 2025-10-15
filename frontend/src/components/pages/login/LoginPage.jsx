import React from 'react';
import { AuthForm } from "../../molecules/AuthForm"
import { AuthGraphic } from '../../molecules/AuthGraphic'; // Ajuste o caminho

/**
 * Organismo da Página de Login, que combina o painel gráfico e o formulário.
 */
function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl mx-auto overflow-hidden bg-white rounded-xl shadow-lg">
        {/* Painel Esquerdo: Gráfico */}
        <AuthGraphic />
        
        {/* Painel Direito: Formulário */}
        <AuthForm />
      </div>
    </div>
  );
}

export default LoginPage;