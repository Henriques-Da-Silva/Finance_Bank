export interface Usuario {
  id: number
  nome: string
  email: string
  celular: string
  id_tipo: number
  created_at?: string
}

export interface Cartao {
  id: number
  iban: string
  apelido?: string
  saldo_contabilistico: number
  saldo_disponivel: number
  saldo_bloqueado: number
  status?: number
  created_at?: string
}

export interface Transacao {
  id: number
  tipo: string
  valor: number
  descricao?: string
  id_cartao_origem?: number
  id_cartao_destino?: number
  created_at?: string
}

export interface Investimento {
  id: number
  valor_inicial: number
  valor_atual: number
  taxa_juros: number
  prazo_dias: number
  data_inicio: string
  data_vencimento: string
  status?: string
  created_at?: string
  id_cartao: number
}