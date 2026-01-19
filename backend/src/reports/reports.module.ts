import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Material } from '../materials/entities/material.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Sale } from '../sales/entities/sale.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Material, Purchase, Sale])],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }
