export interface Pagination {
  limit: number;
  skip: number;
  populate?: string;
  paginate?: boolean;
}
