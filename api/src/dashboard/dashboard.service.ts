import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from 'src/clients/entities/client.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async getDashboardData() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const totalClientsInDebtPromise = this.clientRepository.countBy({
      isPaymentPending: true,
    });

    const totalPastDuesPromise = this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.isPending = :isPending', { isPending: true })
      .andWhere('purchase.dueDate < :today', { today: new Date() })
      .getCount();

    const pendingPurchasesPromise = this.purchaseRepository.findBy({
      isPending: true,
    });

    const purchasesCreatedThisMonthPromise = this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getCount();

    const purchasesPaidThisMonthPromise = this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.isPending = :isPending', { isPending: true })
      .andWhere('purchase.latestPaymentDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getCount();

    const [
      totalClientsInDebt,
      totalPastDues,
      pendingPurchases,
      purchasesCreatedThisMonth,
      purchasesPaidThisMonth,
    ] = await Promise.all([
      totalClientsInDebtPromise,
      totalPastDuesPromise,
      pendingPurchasesPromise,
      purchasesCreatedThisMonthPromise,
      purchasesPaidThisMonthPromise,
    ]);

    const telemetry = {
      totalClientsInDebt: 0,
      purchasesCreatedThisMonth: 0,
      purchasesPaidThisMonth: 0,
      totalPastDues: 0,
      pendingPurchases: [],
    };

    return {
      ...telemetry,
      totalClientsInDebt,
      purchasesCreatedThisMonth,
      purchasesPaidThisMonth,
      totalPastDues,
      pendingPurchases,
    };
  }
}
