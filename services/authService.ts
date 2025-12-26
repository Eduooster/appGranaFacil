async function cadastrarUsuario(data: { nome: string; sobrenome: string,email:string,senha:string }) {
  try {
    const response = await fetch("https://74185138c2c2.ngrok-free.app/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export default cadastrarUsuario;