import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/interfaces/pagination.interface';

@Injectable()
export class SearchService {
  private entityModel: any;
  constructor(entityModel: any) {
    this.entityModel = entityModel;
  }

  protected paginate = async (
    searchTerm: string,
    { skip, limit }: Pagination,
  ) => {
    const searchQuery = searchTerm ? { $text: { $search: searchTerm } } : {};
    const query = this.entityModel
      .find(searchQuery)
      .sort({ _id: 1 })
      .skip(skip);

    if (limit) {
      query.limit(limit);
    }
    const results = await query;
    const count = await this.entityModel.count();
    return { results, count };
  };
}
