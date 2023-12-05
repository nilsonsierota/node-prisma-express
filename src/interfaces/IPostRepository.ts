export type Post = {
  id: number;
  title: string | null;
  content: string;
  userId: number;
}

export interface IPostRepository {
 create(title : string, content : string, userId : number) : Promise<Post>;
 list(id: number) : Promise<Post>
}