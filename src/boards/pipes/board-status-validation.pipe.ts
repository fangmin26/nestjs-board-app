import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the options`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    //상태값 status에 기입한 값이 indexOf 하였을때 false(배열 안에 없으면 -1이 나옴)
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
