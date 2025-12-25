export interface Post {
  id?: number;
  user: string;
  content: string;
  image?:string | null;
  likes: number;
  liked: boolean;
}
