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
  constructor() {
    this.offers = null;
    this.priority = null;
    this.address = null;
    this.number = null;
    this.menu = null;
    this.offerCode = null;
    this.orderCode = null;
  }

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

  async sendMessage(msg, loop) {
    const sessionId = await this.sessionClient();
    return new Promise((resolve, reject) => {
      assistant.message(
        {
          assistantId: process.env.ASSISTANT_ID,
          sessionId,
          context: {
            skills: {
              'main skill': {
                user_defined: {
                  offers: this.offers,
                  priority: this.priority,
                  address: this.address,
                  number: this.number,
                  menu: this.menu,
                  offerCode: this.offerCode,
                  orderCode: this.orderCode,
                },
              },
            },
          },
          input: {
            text: msg,
            options: {
              return_context: true,
              debug: true,
            },
          },
        },
        (err, response) => {
          if (err) return reject(err);
          else {
            let message = response.result.output.generic[0].text;
            // console.log(
            //   response.result.context.skills['main skill'].user_defined.offers
            // );

            console.log(
              response.result.context.skills['main skill'].user_defined
            );
            if (
              response.result.context.skills['main skill'].user_defined.offers
            ) {
              this.offers =
                response.result.context.skills[
                  'main skill'
                ].user_defined.offers;
            }

            if (
              response.result.context.skills['main skill'].user_defined.priority
            ) {
              console.log(
                response.result.context.skills['main skill'].user_defined
                  .priority
              );
              this.priority =
                response.result.context.skills[
                  'main skill'
                ].user_defined.priority;
            }

            if (
              response.result.context.skills['main skill'].user_defined.address
            ) {
              this.address =
                response.result.context.skills[
                  'main skill'
                ].user_defined.address;
            }

            if (
              response.result.context.skills['main skill'].user_defined.number
            ) {
              this.number =
                response.result.context.skills[
                  'main skill'
                ].user_defined.number;
            }

            if (
              response.result.context.skills['main skill'].user_defined.menu
            ) {
              this.menu =
                response.result.context.skills['main skill'].user_defined.menu;
            }
            if (
              response.result.context.skills['main skill'].user_defined.menu
            ) {
              this.menu =
                response.result.context.skills['main skill'].user_defined.menu;
            }

            if (
              response.result.context.skills['main skill'].user_defined
                .offerCode
            ) {
              this.offerCode =
                response.result.context.skills[
                  'main skill'
                ].user_defined.offerCode;
            }

            if (
              response.result.context.skills['main skill'].user_defined
                .orderCode
            ) {
              this.orderCode =
                response.result.context.skills[
                  'main skill'
                ].user_defined.orderCode;
            }
            if (response.result.output.generic.length > 1) {
              const payload = response.result.output.generic.map((item) => {
                return {
                  title: item.title,
                  image: item.source,
                };
              });
              return resolve({
                message: payload[1].title,
                image: payload[1].image,
              });
            }

            return resolve({
              message,
              action: 'vazio',
            });
          }
        }
      );
    });
  }
}

module.exports = new Watson();
