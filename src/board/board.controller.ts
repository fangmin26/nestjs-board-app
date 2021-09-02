import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import {Board, BoardStatus} from "./board.model";
import { CreateBoardDto } from './dto/create-baord.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService:BoardService){}

  @Get('/')
  getAllBoard() : Board[]{
    return this.boardService.getAllBoards();
  }
  /* @Body('title')title 하면 title 정보가져올수 있음*/
  /*type 설정해줄때 Board[]는 Board 전체를, Board는 Board의 일부를 가져오는 것*/
  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto
  ):Board{
    return this.boardService.createBoard(createBoardDto)
  }

  // localhost:5000?id=qelktjd&title=wetasd
  // 위와 같은 두개의 파라미터를 가져올때는
  // getAllParams(@Param() params:string[])
  @Get('/:id')
  getBoardById(@Param('id') id : string):Board{
    return this.boardService.getBoardById(id)
  }

  @Delete()
  deleteBoard(@Param('id') id:string):void{
    this.boardService.deleteBoard(id)
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param('id') id:string,
    @Body('status') status: BoardStatus,
  ){
    return this.boardService.updateBoardStatus(id,status
      )
  }
}
