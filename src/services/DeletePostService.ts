import { IPostRepository } from '../interfaces/IPostRepository';

class DeletePostService {
  constructor(
    private PostRepository: IPostRepository
  ){}

  public async execute(id: string){
    const post = await this.PostRepository.delete(
      id
    );

    return post;
  }
}

export {
  DeletePostService
};