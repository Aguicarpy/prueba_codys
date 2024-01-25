import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('form')
export class AppController {
  constructor(private readonly formService: FormService) {} // ---> Inyección de dependencia del servicio a utilizar

  @Post()
  postForm(@Body() createFormDto: CreateFormDto) { // ---> creación del formulario con el tipo de objeto esperado
    return this.formService.createNewForm(createFormDto);
  }

  @Get()
  async getFormData() {
    const getData = this.formService.findForm();
    await getData
    return getData
  }

  @Put('update/:id') // ---> actualizar registro por el parametro id 
  async updateForm(@Param('id') id: number, @Body() updateFormDto: UpdateFormDto) {
      const updateData = this.formService.updateForm(+id, updateFormDto);
      await updateData;
      return updateData
  }

  @Delete('remove/:id') //---> borrar registro por el parametro id 
  async deleteForm(@Param('id') id: number) {
    const deleteData = this.formService.removeForm(+id)
    await deleteData
    return deleteData
  }
}
