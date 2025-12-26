import { useAuth } from "@/context/AuthContext";

export async function iniciarPluggy(authToken: string) {
  const response = await fetch("https://74185138c2c2.ngrok-free.app/open-finance", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log('iniciando pluggy' + data)
  return data.accessToken || data.connectToken;
}

export async function enviarItemPluggy(authToken: string, pluggyItem: any) {
  const body = {
    item: {
      id: pluggyItem.id,
      status: pluggyItem.status,
      lastUpdatedAt: pluggyItem.lastUpdatedAt,
      createdAt: pluggyItem.createdAt,
      connector: {
        id: pluggyItem.connector.id,
        name: pluggyItem.connector.name,
        imageUrl: pluggyItem.connector.imageUrl,
        health: {
          status: pluggyItem.connector.health?.status || "ONLINE"
        },
        status:pluggyItem.status,
        type: pluggyItem.connector.type,
        
      }
    }
  };

  const response = await fetch("https://74185138c2c2.ngrok-free.app/open-finance/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });
  console.log("item " + response.body)

  return response.ok;
}
