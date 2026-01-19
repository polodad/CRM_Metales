import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) { }

  create(createPurchaseDto: CreatePurchaseDto) {
    const purchase = this.purchasesRepository.create(createPurchaseDto);
    return this.purchasesRepository.save(purchase);
  }

  findAll() {
    return this.purchasesRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.purchasesRepository.findOneBy({ id });
  }

  update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    // Only update allowed fields if necessary. 
    // Ideally we should retrieve, merge and save.
    return this.purchasesRepository.update(id, updatePurchaseDto);
  }

  remove(id: string) {
    return this.purchasesRepository.delete(id);
  }
}
