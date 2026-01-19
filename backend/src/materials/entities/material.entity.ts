import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MaterialType {
    METAL = 'METAL',
    PLASTIC = 'PLASTIC',
    OTHER = 'OTHER',
}

@Entity()
export class Material {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({
        type: 'text',
        default: MaterialType.METAL,
    })
    type: MaterialType;

    @Column({ default: 'kg' })
    unit: string; // kg, ton, piece

    /**
     * Percentage of deduction logic (merma)
     * e.g. 0.10 means 10% deduction by default
     */
    @Column({ type: 'float', default: 0 })
    defaultWastePercentage: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    buyPrice: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    sellPrice: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
