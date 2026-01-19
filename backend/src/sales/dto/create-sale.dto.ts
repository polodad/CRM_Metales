export class CreateSaleDto {
    client: string;
    material: string;
    weight: number;
    price: number;
    total: number;
    status?: string;
}
