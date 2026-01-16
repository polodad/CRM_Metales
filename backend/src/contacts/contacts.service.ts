import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactsRepository: Repository<Contact>,
    ) { }

    create(createContactDto: CreateContactDto) {
        const contact = this.contactsRepository.create(createContactDto);
        return this.contactsRepository.save(contact);
    }

    findAll() {
        return this.contactsRepository.find({ order: { name: 'ASC' } });
    }

    findOne(id: string) {
        return this.contactsRepository.findOneBy({ id });
    }

    update(id: string, updateContactDto: UpdateContactDto) {
        return this.contactsRepository.update(id, updateContactDto);
    }

    remove(id: string) {
        return this.contactsRepository.delete(id);
    }
}
