import { User } from './../auth/user.entity';
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
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository
	   ) {}

	async getAllBoards(user: User) : Promise<Board[]>{
		const query = this.boardRepository.createQueryBuilder('board');

		query.where('board.userId = :userId', {userId: user.id});

		const boards = await query.getMany();

		return boards;
	}
	
	createBoard(createBoardDto : CreateBoardDto, user: User) : Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto, user);
	}

	async getBoardById(id : number) : Promise<Board>{
		const found = await this.boardRepository.findOneBy({id});

		if (!found){
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		return found;
	}

	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.boardRepository.delete({id, user: {id: user.id}});

		if (result.affected === 0){
			throw new NotFoundException(`Can't find Board with ID ${id}`);
		}

		console.log('result', result);
	}

	async updateBoardStatus(id : number, status: BoardStatus) : Promise<Board>{
		const board = await this.getBoardById(id);

		board.status = status;
		await this.boardRepository.save(board);

		return board;
	}
}
