import React from 'react';

/**
 * Molécula para o painel gráfico decorativo da página de autenticação.
 */
export function AuthGraphic() {
  return (
    <div className="relative hidden lg:flex flex-1 items-center justify-center bg-purple-600 text-white p-12">
      <div className="absolute bg-purple-700 rounded-full w-48 h-48 top-10 left-10 opacity-50"></div>
      <div className="absolute bg-purple-700 rounded-full w-32 h-32 bottom-20 right-5 opacity-50"></div>
      
      <div className="z-10 text-center">
        <h2 className="text-4xl font-bold mb-3">
          Welcome back!
        </h2>
        <p className="text-purple-200 max-w-xs">
          You can sign in to access with your existing account.
        </p>
      </div>

      {/* Elementos decorativos '+' */}
      <span className="absolute top-20 left-32 text-purple-500 text-3xl font-bold">+</span>
      <span className="absolute bottom-16 right-32 text-purple-500 text-3xl font-bold">+</span>
      <span className="absolute top-1/2 left-1/4 text-purple-500 text-xl font-bold">+</span>
    </div>
  );
}