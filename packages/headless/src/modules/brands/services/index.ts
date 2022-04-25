import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import { BrandCreateSchema } from './../validators/brand.create.validator';
import { Helper } from 'src/helper/helper.interface';
import { ServiceErrorResponse, ServiceSuccessResponse } from './../../../helper/serviceResponse/service.response.interface';
import { Brand } from './../../../entity/brand';
import { BrandRepository } from './../repositories/index';
import { validateParams } from 'src/decorators/service.validator';
import { Response } from "express";

@Injectable()

export class Brandservice{
    constructor( 
        private brandRepo: BrandRepository,
        private helper: Helper     
    ){}

    @validateParams({ schema: BrandCreateSchema})
    async createBrand(brand: Brand): Promise<ServiceErrorResponse | ServiceSuccessResponse> {
        const doesBrandExist = await this.brandRepo.findBrandById(brand.id);

        if(doesBrandExist){
            return this.helper.serviceResponse.errorResponse('Brand already exists', null, HttpStatus.BAD_REQUEST);
        }
        else{
            const newBrand = await this.brandRepo.createBrand(brand);
            return this.helper.serviceResponse.successResponse(newBrand);
        }

    }
   
    @validateParams({ schema: Joi.number().label('Skip') }, { schema: Joi.number().label('Limit') })
    async getBrands(skip?: number, limit?: number): Promise<ServiceErrorResponse | ServiceSuccessResponse>{
        const foundBrands = await this.brandRepo.findAllBrands(skip, limit);
        
        return this.helper.serviceResponse.successResponse(foundBrands);
    } 

    @validateParams({ schema: Joi.string().required().label('id') })
    async editBrand(brandId: string, brandFeatures: Brand): Promise<ServiceErrorResponse | ServiceSuccessResponse>{
        const updatedBrand= await this.brandRepo.updateBrandById(brandId, brandFeatures);

        return this.helper.serviceResponse.successResponse(updatedBrand);
    }

    @validateParams({ schema: Joi.string().required().label('id') })
    async getBrandById(brandId: string): Promise<ServiceErrorResponse | ServiceSuccessResponse>{
        const foundBrand = await this.brandRepo.findBrandById(brandId);

        return this.helper.serviceResponse.successResponse(foundBrand);
    }

    @validateParams({ schema: Joi.string().required().label('id') })
    async deleteBrandById(brandId: string): Promise<ServiceErrorResponse | ServiceSuccessResponse>{
        const deletedBrand = await this.brandRepo.deleteBrandById(brandId);

        return this.helper.serviceResponse.successResponse(deletedBrand);
    }


    //delete brand

    
}