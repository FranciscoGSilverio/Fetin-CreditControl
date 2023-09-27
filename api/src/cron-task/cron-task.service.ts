import { WhatsappMessageService } from 'src/whatsapp-message/whatsapp-message.service';
import { Injectable, Logger } from '@nestjs/common';

import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronTaskService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly whatsAppMessageService: WhatsappMessageService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(CronTaskService.name);

  addCronJob(name: string, billingDate: Date) {
    const job = new CronJob(billingDate, () => {
      const messageContent = this.whatsAppMessageService.getTextMessageInput(
        '5535997373718',
      );

      this.whatsAppMessageService
        .sendMessage(messageContent)
        .then((res) => {
          console.log('worked: ', res.status);
        })
        .catch((error) => console.log('did not work: ', error));

      this.logger.warn('Message sent!');
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
}
