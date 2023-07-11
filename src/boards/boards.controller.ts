import { User } from './../auth/user.entity';
import { GetUser } from './../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Body, Controller, Get, Post, Param, Delete, Patch, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
	constructor(private boardsService: BoardsService){}

	@Get() 
	getAllBoard() : Promise<Board[]>{
		return this.boardsService.getAllBoards();
	}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
		return this.boardsService.createBoard(createBoardDto, user);
	}


	@Get('/:id')
	getBoardById(@Param('id') id:number) : Promise<Board>{
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id: number) : Promise<void>{
		return this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(@Param('id', ParseIntPipe) id :number,
					 @Body('status', BoardStatusValidationPipe) status:BoardStatus){
		return this.boardsService.updateBoardStatus(id, status);
	}
}
