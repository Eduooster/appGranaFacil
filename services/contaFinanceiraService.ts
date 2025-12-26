export async function buscarContasFinanceiras(authToken: string) {
  const response = await fetch(
    "https://74185138c2c2.ngrok-free.app/conta-financeira",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar contas financeiras");
  }

  const data = await response.json();
  console.log('contas financeiras ' + data);

  return data;
}
