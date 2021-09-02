import { Injectable } from '@nestjs/common';
import {Board, BoardStatus} from "./board.model"
//v1버전을 사용한다
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-baord.dto';
@Injectable()
export class BoardService {
  private boards: Board[] =[];

  getAllBoards(): Board[]{
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto){
    const {title,description} = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status:BoardStatus.PUBLIC
    }
    this.boards.push(board);
    return board;
  }
  getBoardById(id:string):Board{
    return this.boards.find((board)=>board.id === id)
  }
  /*:void 아무것도 반환하지 x*/
  deleteBoard(id:string){
    return this.boards.filter((board)=>board.id !== id)
  }

  /*상태변경*/
  updateBoardStatus(id:string,status:BoardStatus):Board{
    const board = this.getBoardById(id);
    board.status= status;
    return board;
  }
}
