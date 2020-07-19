'use strict';

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2020-07-18',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_API_KEY,
  }),
  url: process.env.ASSISTANT_URL,
  disableSslVerification: true,
  headers: {
    'X-Watson-Learning-Opt-Out': true,
  },
});

class Watson {
  sessionClient() {
    return new Promise((resolve, reject) => {
      assistant.createSession(
        {
          assistantId: process.env.ASSISTANT_ID,
        },
        (err, response) => {
          if (err) return reject(err);
          else {
            return resolve(response.result.session_id);
          }
        }
      );
    });
  }

  deleteSession(sessionId) {
    return new Promise((resolve, reject) => {
      assistant.deleteSession(
        {
          assistantId: process.env.ASSISTANT_ID,
          sessionId: sessionId,
        },
        (err, response) => {
          if (err) return reject(err);
          else {
            return resolve(JSON.stringify(response.result, null, 2));
          }
        }
      );
    });
  }

  async sendMessage(msg) {
    const sessionId = await this.sessionClient();
    return new Promise((resolve, reject) => {
      assistant.message(
        {
          assistantId: process.env.ASSISTANT_ID,
          sessionId,
          input: {
            text: msg,
            options: {
              return_context: true,
              debug: true,
            },
          },
          context: {
            skills: {
              'main skill': {
                user_defined: {
                  ...msg,
                },
              },
            },
          },
        },
        (err, response) => {
          if (err) return reject(err);
          else {
            let message = response.result.output.generic[0].text;
            if (response.result.output.generic[0].response_type == 'option') {
              const msg = response.result.output.generic.map((item) => {
                const labels = item.options.map((item) => item.label);
                return {
                  title: item.title,
                  labels,
                };
              });
              message = `${msg[0].title}\n\n${msg[0].labels.join('\n')}`;
              return resolve({
                message,
                intent: 'vazio' || response.result.output.intents[0].intent,
              });
            }
            return resolve({
              message,
              intent: 'vazio' || response.result.output.intents[0].intent,
            });
          }
        }
      );
    });
  }
}

module.exports = new Watson();
