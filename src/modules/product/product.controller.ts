import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/jwt.guard';
import ProductService from './product.service';
import CreateProductDto from './dto/create-product.dto';
import { Product } from '../../data/entities/product.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import UpdateProductDto from './dto/update-product.dto';

@ApiBearerAuth()
@Controller('/products')
@ApiTags('products')
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  @ApiOperation({ summary: 'Get list of all product' })
  @ApiResponse({
    type: Product,
    isArray: true,
    status: 200,
  })
  @HttpCode(200)
  public list(): Promise<Product[]> {
    return this.productService.list();
  }

  @UseGuards(AuthGuard)
  @Get('/:productId')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    type: Product,
    status: 200,
  })
  @HttpCode(200)
  public details(@Param('productId') productId: string): Promise<Product> {
    return this.productService.getProductById(Number(productId));
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    type: Product,
    status: 201,
  })
  public createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @UseGuards(AuthGuard)
  @Put('/:productId')
  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({
    type: Product,
    status: 204,
  })
  @HttpCode(204)
  public editProduct(
    @Param('productId') productId: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(Number(productId), data);
  }
}
