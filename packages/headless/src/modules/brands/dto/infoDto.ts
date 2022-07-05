import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, IsObject, IsNumber, IsArray, ValidateNested, IsBoolean, MaxLength, IsDefined } from 'class-validator';
import { BrandInfo } from 'models';


export class InfoDto implements BrandInfo{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    allowToSelectPageSize?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    displayOrder?: number;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    pageSizeOptions?: number[];

}