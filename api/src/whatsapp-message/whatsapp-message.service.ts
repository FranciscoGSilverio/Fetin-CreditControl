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

    const accessToken =
      'EAApo4Rg5i9wBOZCf8KUKmTRP0cxhVBfI6gETUpTOvP6pfCEiPtoWuwEE6y6fZC7HeNJDYFBk0TPiHVXV9M3ohekAw2PboUKQgAu3jYjAtUwk0oCflabnikTB8SOmc99CQ33Rfz1NUUWnfDgfrHUWSzwjcsKyEcSCr9Oxr38WdPQjk9KbPQpif40Wl5GKZCkZCnSM2uJ6ZCaZB34Vntnrtw29lIVwkZC1njSMswZD';

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
