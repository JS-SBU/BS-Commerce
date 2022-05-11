import { ManufacturerCreateSchema } from './../validators/manufacturer.create.validator';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { validateParams } from 'src/decorators/service.validator';
import { Manufacturer } from 'src/entity/manufacturer';
import { Helper } from 'src/helper/helper.interface';
import { ServiceErrorResponse, ServiceSuccessResponse } from 'src/helper/serviceResponse/service.response.interface';
import { ManufacturerRepository } from '../repositories';

@Injectable()
export class ManufacturerService {

    constructor(
        private manufacturerRepo: ManufacturerRepository,
        private helper: Helper
    ) { }

    /**
     * The addManufacturer function checks firstly if it already exists or not
     * then calls the createManufacturer from manufacturerRepo
     * TODO: Validation on Input ID
     * @param manufacturer 
     * @returns { Promise<Object> } Object of Success or Error
     * 
     */
    @validateParams({ schema: ManufacturerCreateSchema })
    async addManufacturer(manufacturer: Manufacturer): Promise<ServiceSuccessResponse | ServiceErrorResponse> {
        const isManufacturerExist = await this.manufacturerRepo.getManufacturer(manufacturer.id);

        if (isManufacturerExist) {
            return this.helper.serviceResponse.errorResponse('Manufacturer already exists', { manufacturer: [`This manufacturer id ${manufacturer.id} already exists. Try with different Id`] }, HttpStatus.BAD_REQUEST);
        }

        const newManufacturer = await this.manufacturerRepo.createManufacturer(manufacturer);
        if (!newManufacturer) {
            return this.helper.serviceResponse.errorResponse('Manufacturer not created successfully', null, HttpStatus.BAD_REQUEST);
        }

        return this.helper.serviceResponse.successResponse(newManufacturer);
    }

    /**
     * The getAllManufacturers function calls getAllManufacturers from manufacturerRepo
     * then calls the getManufacturersCount from manufacturerRepo to get the total count
     * @param skip Optional
     * @param limit Optional
     * @returns { Promise<Object> } Object of Success or Error
     */
    @validateParams({ schema: Joi.number().label('Skip') }, { schema: Joi.number().label('Limit') })
    async getAllManufacturers(skip?: number, limit?: number): Promise<ServiceSuccessResponse | ServiceErrorResponse> {
        const foundManufacturers = await this.manufacturerRepo.getAllManufacturers(skip, limit);

        if (!foundManufacturers) {
            return this.helper.serviceResponse.errorResponse('Manufacturers not found', { manufacturers: ["Not found"] }, HttpStatus.BAD_REQUEST);
        }

        const manufacturersCount = await this.manufacturerRepo.getManufacturersCount();
        const allManufacturers = {
            manufacturers: foundManufacturers,
            total: manufacturersCount
        }

        return this.helper.serviceResponse.successResponse(allManufacturers);

    }

    /**
     * The getManufacturer function calls getManufacturer() function from manufacturerRepo
     * @param manufacturerId 
     * @returns { Promise<Object> } Object of Success or Error
     */
    @validateParams({ schema: Joi.string().required().label('Id') })
    async getManufacturer(manufacturerId: string): Promise<ServiceSuccessResponse | ServiceErrorResponse> {
        const foundManufacturer = await this.manufacturerRepo.getManufacturer(manufacturerId);

        if (!foundManufacturer) {
            return this.helper.serviceResponse.errorResponse('Manufacture not found', { manufacturer: ["Not found"] }, HttpStatus.BAD_REQUEST);
        }

        return this.helper.serviceResponse.successResponse(foundManufacturer);

    }

    /**
     * The updateManufacturer function checks firstly if it already exists or not
     * then calls the updateManufacturerById() from manufacturerRepo
     * @param manufacturerId 
     * @param manufacturer 
     * @returns { Promise<Object> } Object of Success or Error
     */
    @validateParams({ schema: Joi.string().required().label('Id') }, { schema: ManufacturerCreateSchema })
    async updateManufacturer(manufacturerId: string, manufacturer: Manufacturer): Promise<ServiceSuccessResponse | ServiceErrorResponse> {
        const foundManufacturer = await this.manufacturerRepo.getManufacturer(manufacturerId);

        if (!foundManufacturer) {
            return this.helper.serviceResponse.errorResponse('Manufacture not found', { manufacturer: ["Manufacturer not found. Try with different id"] }, HttpStatus.BAD_REQUEST);
        } else {
            const savedManufacturer = await this.manufacturerRepo.updateManufacturer(manufacturerId, manufacturer);

            if (!savedManufacturer) {
                return this.helper.serviceResponse.errorResponse('Can not update manufacturer', { manufacture: ["Not updated"] }, HttpStatus.BAD_REQUEST);
            }

            return this.helper.serviceResponse.successResponse(savedManufacturer);
        }
    }

    /**
     * The deleteManufacturer function checks firstly if it already exists or not
     * then calls the deleteManufacturerById() from manufacturerRepo
     * @param manufacturerId 
     * @returns { Promise<Object> } Object of Success or Error
     */
    @validateParams({ schema: Joi.string().required().label('id') })
    async deleteManufacturer(manufacturerId: string): Promise<ServiceSuccessResponse | ServiceErrorResponse> {
        const foundManufacturer = await this.manufacturerRepo.getManufacturer(manufacturerId);

        if (!foundManufacturer) {
            return this.helper.serviceResponse.errorResponse('Manufacture not found', { manufacturer: ["Manufacturer not found. Try with different id"] }, HttpStatus.BAD_REQUEST);
        } else {
            const manufacturer = await this.manufacturerRepo.deleteManufacturer(manufacturerId);

            if (!manufacturer) {
                return this.helper.serviceResponse.errorResponse('Can not delete manufacturer', { manufacture: ["Not deleted"] }, HttpStatus.BAD_REQUEST);
            }

            return this.helper.serviceResponse.successResponse(manufacturer);
        }
    }
}
