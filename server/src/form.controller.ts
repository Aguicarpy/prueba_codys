import { Body, Param, Controller, Get, Post, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/imageHelper';

@Controller('form')
export class AppController {
  constructor(private readonly formService: FormService) {} // ---> Inyección de dependencia del servicio a utilizar

  @Post()
  @UseInterceptors(FileInterceptor('profile', { // --> permite la manipulacion de los archivos locales
    storage: diskStorage({ // --> metódo encargado de almacenar la imagen
      destination: './upload',
      filename: renameImage,
    }),
    fileFilter: fileFilter,
  }))
  async postForm(@UploadedFile() file: Express.Multer.File, @Body() createFormDto: CreateFormDto) {
    const getData = this.formService.createNewForm(createFormDto, file);
    await getData
    return getData
  }

  @Get()
  async getFormData() {
    const getData = this.formService.findForm();
    await getData
    return getData
  }

  @Put('update/:id') // ---> actualizar registro por el parametro id 
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: './upload',
      filename: renameImage,
    }),
    fileFilter: fileFilter,
  }))
  async updateForm(@UploadedFile() file: Express.Multer.File, @Param('id') id: number, @Body() updateFormDto: UpdateFormDto) {
      const updateData = this.formService.updateForm(+id, updateFormDto, file);
      await updateData;
      return updateData
  }

  @Delete('remove/:id') //---> borrar registro por el parametro id 
  async deleteForm(@Param('id') id: number, file: Express.Multer.File) {
    const deleteData = this.formService.removeForm(+id)
    await deleteData
    return deleteData
  }
}
