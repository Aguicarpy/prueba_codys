import { Module } from '@nestjs/common';
import { AppController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'form_codys',
      entities: [],
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [FormService],
})
export class FormModule {}
