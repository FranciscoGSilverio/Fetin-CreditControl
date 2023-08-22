import { Module } from '@nestjs/common';
import { WhatsappMessageService } from './whatsapp-message.service';

@Module({
  providers: [WhatsappMessageService]
})
export class WhatsappMessageModule {}
