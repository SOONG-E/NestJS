import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from "typeorm";
import { Board } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<Board> { //<entity>
	constructor(private dataSource: DataSource) {
		super(Board, dataSource.createEntityManager());
	}

}