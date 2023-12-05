export type Post = {
  id: number;
  title: string | null;
  content: string;
  userId: number;
}

export interface IPostRepository {
 create(title : string, content : string, userId : number) : Promise<Post>;
 list(id: string) : Promise<Post>;
 update(id: string, title: string, content: string): Promise<Post>;
}