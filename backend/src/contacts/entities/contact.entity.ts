import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ContactType {
    RECOLECTOR = 'RECOLECTOR',
    TALLER = 'TALLER',
    INDUSTRIA = 'INDUSTRIA',
    COMPRADOR = 'COMPRADOR',
}

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({
        type: 'text', // Postgres uses text for ENUMs simpler if not native enum
        default: ContactType.RECOLECTOR,
    })
    type: ContactType;
    // Note: For simplicity using text, but can be native enum if configured. 
    // Let's use simple string storage for better portability initially or switch to native enum.
    // Actually, let's keep it simple string for now to avoid migration headaches with enums.

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
