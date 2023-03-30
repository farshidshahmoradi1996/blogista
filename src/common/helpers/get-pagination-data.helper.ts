import { IPaginationType } from '../types/paginated';

interface PaginationInput {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export const getPaginationMetaData = (
  paginationInput: PaginationInput,
): IPaginationType => {
  const { total, pageNumber, pageSize } = paginationInput;
  const lastPage = Math.ceil(total / pageSize);

  return {
    lastPage,
    currentPage: pageNumber,
    perPage: pageSize,
    total,
  };
};
