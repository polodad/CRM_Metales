import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../materials/entities/material.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Sale } from '../sales/entities/sale.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Material)
        private materialRepository: Repository<Material>,
        @InjectRepository(Purchase)
        private purchaseRepository: Repository<Purchase>,
        @InjectRepository(Sale)
        private saleRepository: Repository<Sale>,
    ) { }

    async getDashboardStats() {
        const materials = await this.materialRepository.find();
        const sales = await this.saleRepository.find();
        const purchases = await this.purchaseRepository.find();

        // 1. Gross Profit (Simple: Total Sales - Total Purchases cost for sold items, or just Total Sales - Total Purchases for now)
        // A better approximation for "Gross Profit" without complex inventory tracking is:
        // Sum of all Sales Total
        const totalSales = sales.reduce((acc, sale) => acc + Number(sale.total), 0);
        // Cost of Goods Sold is harder. Let's Estimate it as Total Sales - (Total Weight Sold * Average Purchase Price of that material)

        let totalCostOfGoodsSold = 0;
        let inventoryValue = 0;

        const materialStats = materials.map(material => {
            const matPurchases = purchases.filter(p => p.material === material.name);
            const matSales = sales.filter(s => s.material === material.name);

            const totalBoughtWeight = matPurchases.reduce((acc, p) => acc + Number(p.weight), 0);
            const totalBoughtCost = matPurchases.reduce((acc, p) => acc + Number(p.total), 0);
            const avgBuyPrice = totalBoughtWeight > 0 ? (totalBoughtCost / totalBoughtWeight) : 0;

            const totalSoldWeight = matSales.reduce((acc, s) => acc + Number(s.weight), 0);
            // const totalSoldRevenue = matSales.reduce((acc, s) => acc + Number(s.total), 0);
            // const avgSellPrice = totalSoldWeight > 0 ? (totalSoldRevenue / totalSoldWeight) : 0;
            // Use current sell price from material definition as "Current Sell Price"
            const currentSellPrice = Number(material.sellPrice);

            // Cost of sold items
            totalCostOfGoodsSold += totalSoldWeight * avgBuyPrice;

            // Inventory Value
            // Assume stock is correct in Material table (if it's being updated). 
            // If not, we might calculate it: stock = bought - sold.
            // Let's rely on Material.stock for now if it exists and is used, 
            // OR calculate it if the system isn't auto-updating it yet.
            // Given the previous conversation, we probably aren't auto-updating stock yet.
            // Let's calculate calculatedStock for report accuracy.
            const calculatedStock = totalBoughtWeight - totalSoldWeight;
            const currentStock = calculatedStock > 0 ? calculatedStock : 0;
            inventoryValue += currentStock * avgBuyPrice;

            const marginPerUnit = currentSellPrice - avgBuyPrice;
            const marginPercent = avgBuyPrice > 0 ? (marginPerUnit / avgBuyPrice) * 100 : 100;

            return {
                id: material.id,
                material: material.name,
                avgBuy: avgBuyPrice.toFixed(2),
                currentSell: currentSellPrice.toFixed(2),
                margin: marginPerUnit.toFixed(2),
                marginPercent: marginPercent.toFixed(1) + '%',
                stock: currentStock.toFixed(2) + ' ' + material.unit
            };
        });

        const grossProfit = totalSales - totalCostOfGoodsSold;

        return {
            grossProfit: grossProfit.toFixed(2),
            inventoryValue: inventoryValue.toFixed(2),
            margins: materialStats
        };
    }
}
