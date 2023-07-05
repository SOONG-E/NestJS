import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(Board)
		private boardRepository: Repository<Board>
	   ) {}
	  

	// constructor(private readonly boardRepository: BoardRepository) {}
	// getAllBoards() : Board[]{
	// 	return this.boards;
	// }

	// createBoard(createBoardDto : CreateBoardDto){
	// 	const {title, description} = createBoardDto;
	// 	const board : Board = {
	// 		id : uuid(),
	// 		title : title,
	// 		description : description,
	// 		status : BoardStatus.PUBLIC
	// 	}
	// 	this.boards.push(board);

	// 	return board;
	// }
	async getBoardById(id : number) : Promise<Board>{
		const found = await this.boardRepository.findOneBy({id});

		if (!found){
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		return found;
	}
	// getBoardById(id: string) : Board{
	// 	return this.boards.find((board) => board.id === id);
	// }

	// deleteBoard(id : string) : void{
	// 	const found = this.getBoardById(id)
	// 	this.boards = this.boards.filter((board) => board.id !== found.id);
	// }

	// updateBoardStatus(id : string, status: BoardStatus) : Board{
	// 	const board = this.getBoardById(id);
	// 	board.status = status;
	// 	return board;
	// }
}
