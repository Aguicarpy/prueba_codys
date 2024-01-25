import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto'
import { UpdateFormDto } from './dto/update-form.dto';
import { EntityManager } from 'typeorm';
import { createForm, deleteForm, getForm, updateForm } from './querys';
import { error } from 'console';

@Injectable()
export class FormService {
  constructor(private readonly entityManager: EntityManager) {} // ---> Modulo para interacción por query con la db
  
  async createNewForm(createFormDto: CreateFormDto) {
    try {
      const dataCreate = this.entityManager.query(createForm,
        [
        createFormDto.profile, createFormDto.fullname, createFormDto.email, createFormDto.phone, createFormDto.birthday
      ]) // ---> Inyeccion de los datos esperados a insertar segun el objeto de transferencia
      
      if(!dataCreate) { //---> Verificar si existe alguna data
        throw new Error("No se ha creado el registro")
      }
      await dataCreate
      return dataCreate
    } catch (error) {
      throw error
    }
  }

  async findForm() {
    try {
      const getData = this.entityManager.query(getForm)
      if(getData){
        await getData
        return getData
      } else {
        throw error(`Error al recibir los datos ${getData}`)
      }
    } catch (error) {
      throw error(error)
    }
  }

  async updateForm(id: number, updateFormDto: UpdateFormDto) {
    try {
  
      const result = await this.entityManager.query(
        updateForm,
        [...Object.values(updateFormDto), id] // ---> se insertan los nuevos datos segun el DTO y el id registrado
      );
  
      // Verificar si se actualizó algún registro
      if (result.affectedRows > 0) {
        return { message: `Se ha actualizado el registro con ID ${id}` };
      } else {
        return { message: `No se encontró ningún registro con ID ${id}` };
      }
    } catch (error) {
      // Manejo adecuado de errores
      throw new Error(`Error al intentar actualizar el registro: ${error.message}`);
    }
  }

  async removeForm(id: number) {
    try {
      const removeForm = await this.entityManager.query(deleteForm, [id]); // ---> Borrar el registro segun el id
  
      // Verificar si se eliminó algún registro
      if (removeForm.affectedRows > 0) {
        return { message: `Se ha borrado el registro con ID ${id}` };
      } else {
        return { message: `No se encontró ningún registro con ID ${id}` };
      }
    } catch (error) {
      throw new Error(`Error al intentar eliminar el registro: ${error.message}`);
    }
  }
}
