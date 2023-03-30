import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginationType {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
}

export interface IPaginatedType<T> {
  pagination: IPaginationType;
  list: T[];
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Paginated`)
  abstract class PaginationMetaType {
    @Field()
    currentPage: number;

    @Field()
    lastPage: number;

    @Field()
    total: number;

    @Field()
    perPage: number;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => [classRef], { nullable: true })
    list: T[];

    @Field((type) => PaginationMetaType, { nullable: true })
    pagination: PaginationMetaType;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
