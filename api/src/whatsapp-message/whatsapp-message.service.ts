import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WhatsappMessageService {
  constructor(private readonly configService: ConfigService) {}
  sendMessage(data: any) {
    // const version = this.configService.get<string>('VERSION');
    const version = 'v17.0';
    // const phoneNumberId = this.configService.get<string>('PHONE_NUMBER_ID');
    const phoneNumberId = '103739842783863';

    const accessToken ='EAApo4Rg5i9wBOy0yZBX8fSpGvgnfsmgZBxmGWRkmJua5Fot7LgEs32NWjU3zsbZAZB347ZBHzlAcfjJKnhbm2OxrG1cEj653tgrEZCZCwwz0ZBCfY2hFZAIsPKX8INeK8oZBglY1pKiBhOmaw6juaaZApx5a2R56UYxC7yX08C1ZCv6TJGFQJdw2bZAZC6m6Fn5cflreHwOuhqZAnzLYZBKaq8qgppGG3QZA9wWQTns2LcnYZD'
    const config = {
      method: 'POST',
      url: `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return axios(config);
  }

  getTextMessageInput(recipient: string) {
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
