import { Link } from "react-router-dom"
import { TbSend, TbFileInvoice, TbTrendingUp, TbDeviceMobile, TbReceipt, TbCreditCard } from "react-icons/tb"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-200 bg-white">
        <div>
          <p className="text-lg font-medium text-gray-900">FinanceBank</p>
          <p className="text-xs text-gray-500">Seu Banco Digital</p>
        </div>
        <div className="flex gap-3 items-center">
          <Link to="/login" className="px-5 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Entrar
          </Link>
          <Link to="/register" className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Criar conta
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-20 md:py-28 bg-white">
        <p className="text-xs font-medium text-blue-600 tracking-widest mb-4">BANCO DIGITAL ANGOLANO</p>
        <h1 className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight max-w-2xl mb-5">
          Gerencie seu dinheiro com simplicidade
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-lg mb-10 leading-relaxed">
          Transfira, pague contas, invista e acompanhe seu saldo — tudo num só lugar, seguro e rápido.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/register" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Abrir conta grátis
          </Link>
          <Link to="/login" className="px-8 py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-100 transition">
            Já tenho conta
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 md:gap-16 justify-center mt-16">
          <div className="text-center">
            <p className="text-3xl font-medium text-gray-900">+10k</p>
            <p className="text-sm text-gray-500 mt-1">Clientes ativos</p>
          </div>
          <div className="hidden md:block w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-medium text-gray-900">KZS 2M+</p>
            <p className="text-sm text-gray-500 mt-1">Em transações</p>
          </div>
          <div className="hidden md:block w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-medium text-gray-900">100%</p>
            <p className="text-sm text-gray-500 mt-1">Digital e seguro</p>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="px-6 md:px-12 py-20 bg-gray-50">
        <p className="text-xs font-medium text-blue-600 tracking-widest text-center mb-3">FUNCIONALIDADES</p>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 text-center mb-12">
          Tudo o que precisa, num só app
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: <TbSend size={28} />,          title: "Transferências",    desc: "Envie dinheiro via IBAN de forma rápida e segura." },
            { icon: <TbFileInvoice size={28} />,    title: "Pagamentos",       desc: "Pague energia, água e internet sem sair de casa." },
            { icon: <TbTrendingUp size={28} />,     title: "Investimentos",    desc: "Faça o seu dinheiro crescer com juros compostos." },
            { icon: <TbDeviceMobile size={28} />,   title: "Recargas",         desc: "Recarregue Unitel e Africell diretamente pelo app." },
            { icon: <TbReceipt size={28} />,        title: "Extrato",          desc: "Consulte todas as suas movimentações com filtros." },
            { icon: <TbCreditCard size={28} />,     title: "Múltiplos cartões",desc: "Crie vários cartões com IBANs independentes." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-blue-600 mb-4">{icon}</div>
              <p className="font-medium text-gray-900 mb-2">{title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">Pronto para começar?</h2>
        <p className="text-base text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed">
          Crie a sua conta em menos de 2 minutos e comece a gerir o seu dinheiro hoje.
        </p>
        <Link to="/register" className="px-10 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-base">
          Criar conta grátis
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 md:px-12 py-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-gray-900">FinanceBank</p>
          <p className="text-xs text-gray-500">© 2025 Todos os direitos reservados</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition">Privacidade</a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition">Termos</a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition">Suporte</a>
        </div>
      </footer>

    </div>
  )
}