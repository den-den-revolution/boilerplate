import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Product } from '../../data/entities/product.entity';

@Injectable()
export default class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: EntityRepository<Product>,
  ) {}

  public async list(): Promise<Product[]> {
    return this.repo.find({});
  }

  public async getProductById(id: number): Promise<Product> {
    const product = await this.repo.findOne({ id });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  public async createProduct(data): Promise<Product> {
    const product = this.repo.create(data);

    const persisted = await this.repo.persist(product);

    await persisted.flush();

    return this.repo.findOne({ id: persisted.id });
  }

  public async updateProduct(productId: number, data) {
    const product = await this.repo.findOne({ id: productId });

    if (!product) {
      throw new NotFoundException();
    }

    product.assign(data);

    await this.repo.persistAndFlush(product);

    return product;
  }
}
