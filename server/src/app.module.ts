import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormModule } from './form/form.module';

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
  }), FormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
