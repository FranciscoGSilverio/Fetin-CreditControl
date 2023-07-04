import { Injectable, Logger } from '@nestjs/common';

import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronTaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(CronTaskService.name);

  addCronJob(name: string, billingDate: Date) {
    const job = new CronJob(billingDate, () => {
      this.logger.warn('Message sent!');
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    // this.logger.warn(
    //   `job ${name} added for each minute at ${seconds} seconds!`,
    // );
  }
}
