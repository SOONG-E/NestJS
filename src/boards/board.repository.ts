import { User } from './../auth/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> { //<entity>
	constructor(private dataSource: DataSource) {
		super(Board, dataSource.createEntityManager());
	}

	async createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board>{
		const { title, description } = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user
		})

		await this.save(board);
		return board;
	}
}