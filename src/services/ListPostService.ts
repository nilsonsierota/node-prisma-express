import { IPostRepository } from '../interfaces/IPostRepository';

class ListPostService {
  constructor(
    private PostRepository: IPostRepository
  ){}

  public async execute(id: number){
    const post = await this.PostRepository.list(
      id
    );

    return post;
  }
}

export {
  ListPostService
};