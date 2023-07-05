import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMessageService {
  sendMessage(data: any) {
    // console.log('environment', process.env);

    const config = {
      method: 'POST',
      url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    // console.log('data', config.data);
    // console.log('url', config.url);

    return axios(config);
  }

  getTextMessageInput(recipient: string, text: string) {
    return JSON.stringify({
      //   messaging_product: 'whatsapp',
      //   preview_url: false,
      //   recipient_type: 'individual',
      //   to: recipient,
      //   type: 'text',
      //   text: {
      //     body: text,
      //   },

      messaging_product: 'whatsapp',
      to: recipient,
      type: 'template',
      template: {
        name: 'purchase_success',
        language: {
          code: 'en_US',
        },
      },
    });
  }
}
