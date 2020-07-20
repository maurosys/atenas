const { Client, WebhookController, TextContent } = require('@zenvia/sdk');

const watson = require('../ia/watson');

const port = process.env.PORT || 3001;
const token = process.env.WHATSAPP_TOKEN;

const ngrok = require('ngrok');
let url = (async function () {
  return await ngrok.connect(port);
})();

const channel = 'whatsapp';

async function main(url, token) {
  url = await url;
  console.log(
    `Iniciando a aplicação na porta ${port}, usando para webhook a URL: ${url}`
  );

  const client = new Client(token);

  const webhook = new WebhookController({
    port,
    client,
    channel,
    url,

    messageEventHandler: (messageEvent) => {
      const phone = messageEvent.message.from;
      const senderId = messageEvent.message.to;
      let firstName;
      let reply;

      messageEvent.message.contents.forEach(async (content) => {
        switch (content.type) {
          case 'text':
            const text = content.text;
            console.log(`O número "${phone}" enviou a mensagem: "${text}"`);

            if (firstName) {
              const e = await watson.sendMessage(text);
              reply = e.message;
            } else {
              reply = 'Obrigado pela mensagem enviada!';
            }
            break;

          case 'file':
            const url = content.fileUrl;
            const type = content.fileType;
            console.log(
              `O número "${phone}" enviou um arquivo do tipo "${type}": "${url}"`
            );

            if (firstName) {
              reply = `${firstName}, obrigado pelo arquivo enviado!`;
            } else {
              reply = 'Obrigado pelo arquivo enviado!';
            }
            break;

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

        if (reply) {
          client
            .getChannel(channel)
            .sendMessage(senderId, phone, new TextContent(reply));
        }
      });
    },
  });

  webhook.on('error', (error) => {
    console.error('Erro:', error);
  });

  webhook.init();
}

main(url, token);
