import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
    @IsNotEmpty()
    @IsString()
    supplier: string;

    @IsNotEmpty()
    @IsString()
    material: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    total: number;
}
