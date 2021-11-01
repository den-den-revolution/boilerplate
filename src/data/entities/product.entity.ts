import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product extends BaseEntity<Product, 'id'> {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @Property()
  @ApiProperty()
  title: string;

  @Property()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @Property({ type: 'number' })
  price: number;
}
