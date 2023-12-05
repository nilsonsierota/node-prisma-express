import { Request, Response } from 'express';
import { prisma } from '../database';
import { CreatePostService } from '../services/CreatePostService';
import { PostRepository } from '../repositories/PostRepository';
import { ListPostService } from '../services/ListPostService';

export default {
  async create(request:Request, response:Response) {
    try {
      const { title, content, userId } = request.body;

      const createPost = new CreatePostService(new PostRepository());

      const post = createPost.execute(
        title,
        content,
        userId
      );

      return response.json({
        error: false,
        message: 'Sucesso: Post cadastrado com sucesso!',
        post
      });

    } catch (error) {
      return response.json({message: error.message});
    }
  },

  async list(request:Request, response:Response) {
    try {
      const { id } = request.params;

      const listPost = new ListPostService(new PostRepository());

      const post = listPost.execute(Number(id));

      if(!post){
        return response.json({
          error: true,
          message: 'Erro: Post nao encontrado!'
        });
      }

      return response.json({
        error: false,
        post
      });

    } catch (error) {
      return response.json({message: error.message});
    }
  },

  async update(request:Request, response:Response) {
    try {
      const { id, title, content } = request.body;

      const postExists = await prisma.post.findUnique({
        where: { id: Number(id) }
      });

      if(!postExists){
        return response.json({
          error: true,
          message: 'Erro: Post nao encontrado!'
        });
      }

      const post = await prisma.post.update({
        where: {
          id: Number(request.body.id)
        },
        data: {
          title,
          content
        }
      });

      return response.json({
        error: false,
        message: 'Sucesso: Post atualizado com sucesso!',
        post
      });

    } catch (error) {
      return response.json({message: error.message});
    }
  },

  async delete(request:Request, response:Response) {
    try {
      const { id } = request.params;

      const postExists = await prisma.post.findUnique({
        where: { id: Number(id) }
      });

      if(!postExists){
        return response.json({
          error: true,
          message: 'Erro: Post nao encontrado!'
        });
      }

      const post = await prisma.post.delete({
        where: {
          id: Number(request.params.id)
        }
      });

      return response.json({
        error: false,
        message: 'Sucesso: Post deletado com sucesso!',
        post
      });

    } catch (error) {
      return response.json({message: error.message});
    }
  }
};