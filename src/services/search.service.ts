import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/interfaces/pagination.interface';

@Injectable()
export class SearchService {
  private entityModel: any;
  constructor(entityModel: any) {
    this.entityModel = entityModel;
  }

  private populateQuery = (populate, query) => {
    if (populate) {
      const entities = populate.split('|');
      query.populate(entities);
    }
    return query;
  };

  protected paginate = async (
    searchTerm: string,
    { skip, limit, populate }: Pagination,
  ) => {
    const searchQuery = searchTerm ? { $text: { $search: searchTerm } } : {};
    let query = this.entityModel.find(searchQuery);
    query = this.populateQuery(populate, query);
    query.sort({ _id: 1 }).skip(skip);
    if (limit) {
      query.limit(limit);
    }
    const results = await query;
    const count = await this.entityModel.count();
    return { results, count };
  };
}
