import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MaterialType } from '../entities/material.entity';

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsEnum(MaterialType)
    type: MaterialType;

    @IsNotEmpty()
    @IsString()
    unit: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    defaultWastePercentage?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    buyPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    sellPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;
}
