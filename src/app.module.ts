import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import dbConfig from '../mikro-orm.config';
import { DocumentValidatorModule } from './modules/document-validator/document-validator.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    DocumentValidatorModule,
    MikroOrmModule.forRoot(dbConfig),
  ],
  providers: [AppService],
})
export class AppModule {}
