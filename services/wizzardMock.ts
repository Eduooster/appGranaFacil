// wizardMock.ts

export const wizardMock = [
  {
    step: 1,
    id: "userIntent",
    title: "Qual é o principal motivo para você usar o GranaFácil?",
    options: [
      {
        id: "CONTROLAR_GASTOS",
        label: "Controlar melhor os meus gastos",
      },
      {
        id: "ECONOMIZAR_OBJETIVOS",
        label: "Economizar para objetivos específicos (viagens, compras)",
      },
      {
        id: "SAIR_DAS_DIVIDAS",
        label: "Sair das dívidas ou evitar endividamento",
      },
      {
        id: "CONSCIENCIA_FINANCEIRA",
        label: "Ter mais consciência sobre minhas finanças",
      },
      {
        id: "OUTRO",
        label: "Outro",
      },
    ],
  },

  {
    step: 2,
    id: "userSegment",
    title: "Conte pra gente, qual seu perfil principal?",
    subtitle: "Essas perguntas irão te proporcionar uma experiência personalizada",
    options: [
      {
        id: "ESTUDANTE",
        label: "Jovem estudante / universitário",
      },
      {
        id: "AUTONOMO",
        label: "Profissional autônomo / freelancer",
      },
      {
        id: "CLT",
        label: "Profissional CLT / funcionário",
      },
      {
        id: "OUTRO",
        label: "Outro",
      },
    ],
  },

  {
    step: 3,
    id: "financialMaturity",
    title: "Como você costuma gerenciar suas finanças atualmente?",
    options: [
      {
        id: "SEM_CONTROLE",
        label: "Não faço nenhum controle, só gasto e vejo no fim do mês",
      },
      {
        id: "PLANILHAS",
        label: "Uso planilhas ou caderno para anotar gastos",
      },
      {
        id: "OUTRO_APP",
        label: "Uso outro app de finanças",
      },
      {
        id: "CONTROLE_MENTAL",
        label: "Faço controle mental, sem registrar formalmente",
      },
    ],
  },
] as const;
