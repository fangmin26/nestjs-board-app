export interface Board{
  id: string;
  title:string;
  description:string;
  //status: 공개글인지 비공개글인지(다른값올수x)
  status:BoardStatus;
}
export enum BoardStatus{
  PUBLIC='PUBLIC',
  PRIVATE="PRIVATE"
}