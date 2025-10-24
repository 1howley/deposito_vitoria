import {User,Package,Heart,UserCircle,Phone,KeyRound,Home,Sparkles,} from "lucide-react";

export default function UserProfilePage() {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* 1. Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-white border-r p-6 flex-shrink-0 hidden md:flex flex-col">
        {/* -- Seção do Usuário -- */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
            C
          </div>
          <div>
            <div className="text-sm font-bold uppercase text-gray-700">
              CELIO
            </div>
            <div className="text-xs text-gray-500">0 pts</div>
          </div>
        </div>

        {/* -- Seção de Navegação -- */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase text-gray-400">
            Minha Conta
          </h3>
          <nav>
            <ul className="flex flex-col gap-1">
              {/* Link Ativo */}
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md bg-neutral-100 text-green-700 font-medium"
                >
                  <User size={20} />
                  <span>Meu Perfil</span>
                </a>
              </li>
              {/* Outros Links */}
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-gray-600 hover:bg-neutral-100"
                >
                  <Package size={20} />
                  <span>Meus Pedidos</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-md text-gray-600 hover:bg-neutral-100"
                >
                  <Heart size={20} />
                  <span>Favoritos</span>
                </a>
              </li>
              {/* Item "Fidelidade" removido */}
            </ul>
          </nav>
        </div>
      </aside>

      {/* 2. Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Meu Perfil</h1>

        {/* -- Grid de Opções -- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Dados Pessoais */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="text-gray-700 pt-1">
              <UserCircle size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Dados Pessoais
              </h3>
              <p className="text-sm text-gray-600">
                Gerencie seus dados pessoais: nome e CPF.
              </p>
            </div>
          </div>

          {/* Card: Contatos */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="text-gray-700 pt-1">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Contatos
              </h3>
              <p className="text-sm text-gray-600">
                Gerencie e-mails e telefone cadastrados.
              </p>
            </div>
          </div>

          {/* Card: Dados de Acesso */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="text-gray-700 pt-1">
              <KeyRound size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Dados de Acesso
              </h3>
              <p className="text-sm text-gray-600">Troque sua senha.</p>
            </div>
          </div>

          {/* Card: Endereços */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="text-gray-700 pt-1">
              <Home size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Endereços
              </h3>
              <p className="text-sm text-gray-600">
                Altere ou adicione endereços de entregas.
              </p>
            </div>
          </div>

          {/* Card: Preferências */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="text-gray-700 pt-1">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Preferências
              </h3>
              <p className="text-sm text-gray-600">
                Conte-nos suas preferências.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}