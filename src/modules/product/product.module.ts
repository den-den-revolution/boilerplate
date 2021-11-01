import { Module } from '@nestjs/common';
import ProductController from './product.controller';
import ProductService from './product.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '../../data/entities/product.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
