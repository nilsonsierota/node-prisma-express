import {Request, Response} from 'express';
import { prisma } from '../database';

export default {
  async create(request:Request, response:Response) {
    try {
      const { name, email } = request.body;
      const userExists = await prisma.user.findUnique({
        where: email
      });

      if(userExists){
        return response.json({
          error: true,
          message: 'Erro: Usuario já existe!'
        });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email
        }
      });

      return response.json({
        error: false,
        message: 'Sucesso: Usuario cadastrado com sucesso!',
        user
      });

    } catch (error) {
      return response.json({message: error.message});
    }
  }
};