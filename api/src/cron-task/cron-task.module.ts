import { Module } from '@nestjs/common';
import { CronTaskService } from './cron-task.service';
import { WhatsappMessageService } from 'src/whatsapp-message/whatsapp-message.service';

@Module({
  providers: [CronTaskService, WhatsappMessageService],
})
export class CronTaskModule {}
