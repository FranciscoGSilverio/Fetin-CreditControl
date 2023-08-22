import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMessageService {
  sendMessage(data: any) {
    const config = {
      method: 'POST',
      url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return axios(config);
  }

  getTextMessageInput(recipient: string, text: string) {
    return JSON.stringify({
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'template',
      template: {
        //Change this to custom template name
        name: 'hello_world',
        language: {
          //Adapt language to template language
          code: 'en_US',
        },
      },
    });
  }
}
