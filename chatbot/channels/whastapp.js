const port = process.env.PORT || 3001;
const token = process.env.WHATSAPP_TOKEN;
const watson = require('../ia/watson');
// const url = `http://192.168.42.26:${port}/`;
// Comentar a linha acima e descomentar o trecho abaixo para usar ngrok.
const ngrok = require('ngrok');
let url = (async function () {
  return await ngrok.connect(port);
})();

const channel = 'whatsapp';

// Criando a função main pra facilitar embutir o ngrok pra testar localmente.
async function main(url, token) {
  // Esse await é só pro caso de ngrok ter sido usado.
  url = await url;
  console.log(
    `Iniciando a aplicação na porta ${port}, usando para webhook a URL: ${url}`
  );

  // Importando nosso SDK.
  const { Client, WebhookController, TextContent } = require('@zenvia/sdk');

  // Classe do nosso SDK usada para realizar chamadas de API.
  const client = new Client(token);

  // Classe no nosso SDK usada para receber chamadas de webhooks.
  const webhook = new WebhookController({
    // A porta que nossa aplicação ouvirá.
    port,

    // O client que será usado pra realizar chamadas de API.
    client,

    // O canal que será usado pra criar uma subscription (webhook) para nossa aplicação.
    channel,

    // A URL que será usada para criar uma subscription (webhook) para nossa aplicação.
    url,

    // A parte mais importa da nossa aplicação. Aqui que as mensagens são tratadas.
    messageEventHandler: (messageEvent) => {
      const phone = messageEvent.message.from;
      const senderId = messageEvent.message.to;
      let firstName;
      let reply;

      /* É importante fazer um loop em contents porque normalmente vem dois:
        - O primeiro, que pode não vir, do tipo "json", com dados do usuário
        - E o segundo, do tipo do conteúdo enviado pelo usuário, normalmente "text" */
      messageEvent.message.contents.forEach(async (content) => {
        switch (content.type) {
          // Caso o usuário tenha enviado uma mensagem texto
          case 'text':
            const text = content.text;
            console.log(`O número "${phone}" enviou a mensagem: "${text}"`);

            // Tendo o nome do usuário disponível, personalizamos a resposta
            if (firstName) {
              // reply = `${firstName}, obrigado pela mensagem enviada!`;
              const e = await watson.sendMessage(text);
              reply = e.message;
            } else {
              reply = 'Obrigado pela mensagem enviada!';
            }
            break;

          // Caso o usuário tenha enviado um arquivo, imagem, vídeo ou áudio
          case 'file':
            const url = content.fileUrl;
            const type = content.fileType;
            console.log(
              `O número "${phone}" enviou um arquivo do tipo "${type}": "${url}"`
            );

            // Tendo o nome do usuário disponível, personalizamos a resposta
            if (firstName) {
              reply = `${firstName}, obrigado pelo arquivo enviado!`;
            } else {
              reply = 'Obrigado pelo arquivo enviado!';
            }
            break;

          /* Caso tenha dados do usuário disponível.
            Normalmente tem, mas o usuário pode desabilitar isso. */
          case 'json':
            if (content.payload.visitor) {
              firstName = content.payload.visitor.firstName;
            }
            break;

          default:
            console.log(
              `Ignorando conteúdo do tipo "${content.type}" do número "${phone}"`
            );
        }

        // Envia uma resposta ao usuário
        if (reply) {
          client
            .getChannel(channel)
            .sendMessage(senderId, phone, new TextContent(reply));
        }
      });
    },
  });

  // Só para logar qualquer possível problema pra realizando chamadas
  webhook.on('error', (error) => {
    console.error('Erro:', error);
  });

  // Aqui nossa aplicação sobe no ar
  webhook.init();
}

// Executando a função que criamos acima
main(url, token);
