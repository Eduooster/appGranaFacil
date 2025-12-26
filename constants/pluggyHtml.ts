export function gerarHtmlPluggy(connectToken: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.pluggy.ai/pluggy-connect/latest/pluggy-connect.js"></script>
        <style>
          body { margin: 0; padding: 0; background-color: #fff; }
        </style>
      </head>
      <body>
        <script>
          function startPluggy() {
            if (typeof PluggyConnect !== "function") {
              document.body.innerHTML = "<h1>Erro ao carregar SDK da Pluggy</h1>";
              return;
            }

            const pluggy = new PluggyConnect({
              connectToken: "${connectToken}",
              includeSandbox: true,
              onSuccess: (data) => window.ReactNativeWebView.postMessage(JSON.stringify({ type: "SUCCESS", payload: data })),
              onError: (error) => window.ReactNativeWebView.postMessage(JSON.stringify({ type: "ERROR", payload: error })),
              onClose: () => window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CLOSE" }))
            });

            pluggy.init();
          }
          window.onload = startPluggy;
        </script>
      </body>
    </html>
  `;
}
