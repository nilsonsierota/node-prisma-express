import { prisma } from '../database';
import { IPostRepository, Post } from '../interfaces/IPostRepository';

class PostRepository implements IPostRepository {
  public async create(title: string, content: string, userId: number) : Promise<Post>{
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId
      }
    });

    return post;
  }

  public async list(id: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    });

    return post;
  }

  public async update(id: string, title: string, content: string){
    const post = await prisma.post.update({
      where: {
        id
      },
      data: {
        title,
        content
      }
    });

    return post;
  }
}

export {
  PostRepository
};