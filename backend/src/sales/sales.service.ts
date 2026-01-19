import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private salesRepository: Repository<Sale>,
    ) { }

    create(createSaleDto: CreateSaleDto) {
        const sale = this.salesRepository.create(createSaleDto);
        return this.salesRepository.save(sale);
    }

    findAll() {
        return this.salesRepository.find({ order: { createdAt: 'DESC' } });
    }

    findOne(id: string) {
        return this.salesRepository.findOneBy({ id });
    }

    remove(id: string) {
        return this.salesRepository.delete(id);
    }
}
