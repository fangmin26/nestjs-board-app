import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
//v1버전을 사용한다
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  getBoardById(id: string): Board {
    //특정 게시물 있는 경우
    const found = this.boards.find((board) => board.id === id);
    //특정 게시물 찾을때 없는 경우 결과값 처리(하단 값 안넣어주면 공백으로만 나옴)
    //: nestjs의 NotFoundException
    if (!found) {
      throw new NotFoundException(`Can't find id for ${id}`);
    }
    return found;
  }
  /*:void 아무것도 반환하지 x*/
  deleteBoard(id: string) {
    const found = this.getBoardById(id);
    return this.boards.filter((board) => board.id !== found.id);
  }

  /*상태변경*/
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
