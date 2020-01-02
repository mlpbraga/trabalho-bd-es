const serviceMap = {
  'usuarios': {
    title: 'Usuários',
    service: '/users',
    formPath: '/cadastro/usuarios/u/'
  },
  'caixas': {
    title: 'Caixas',
    service: '/cashiers',
    formPath: '/cadastro/caixas/c'
  },
  'lojas': {
    title: 'Lojas',
    service: '/stores',
    formPath: '/cadastro/lojas/l'
  },
  'funcionarios': {
    title: 'Funcionários',
    service: '/employees',
    formPath: '/cadastro/funcionarios/func'
  },
  'fornecedores': {
    title: 'Fornecedores',
    service: '/suppliers',
    formPath: '/cadastro/fornecedores/forn'
  },
  'produtos': {
    title: 'Produtos',
    service: '/products',
    formPath: '/cadastro/produtos/p'
  },
}

export default serviceMap;