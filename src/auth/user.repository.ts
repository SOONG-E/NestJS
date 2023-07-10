import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User>{
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}
}