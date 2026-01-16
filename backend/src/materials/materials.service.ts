import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
    constructor(
        @InjectRepository(Material)
        private materialsRepository: Repository<Material>,
    ) { }

    create(createMaterialDto: CreateMaterialDto) {
        const material = this.materialsRepository.create(createMaterialDto);
        return this.materialsRepository.save(material);
    }

    findAll() {
        return this.materialsRepository.find({ order: { name: 'ASC' } });
    }

    findOne(id: string) {
        return this.materialsRepository.findOneBy({ id });
    }

    update(id: string, updateMaterialDto: UpdateMaterialDto) {
        return this.materialsRepository.update(id, updateMaterialDto);
    }

    remove(id: string) {
        return this.materialsRepository.delete(id);
    }
}
