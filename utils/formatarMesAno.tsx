type MesContexto = {
  mes: number; // 1 a 12
  ano: number;
};

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatarMesAno({ mes, ano }: MesContexto): string {
  return `${meses[mes - 1]} ${ano}`;
}
