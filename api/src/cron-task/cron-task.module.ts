import { Module } from '@nestjs/common';
import { CronTaskService } from './cron-task.service';

@Module({
  providers: [CronTaskService]
})
export class CronTaskModule {}
