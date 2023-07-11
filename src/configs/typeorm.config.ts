import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');
export const typeORMConfig : TypeOrmModuleOptions = {
	type : dbConfig.type,
	host : process.env.HOS_HOSTNAME || dbConfig.host,
	port : process.env.HOS_PORT || dbConfig.port,
	username : process.env.HOS_USERNAME || dbConfig.username,
	password : process.env.HOS_PASSWORD || dbConfig.password,
	database : process.env.HOS_DB_NAME || dbConfig.database,
	entities : [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize : dbConfig.synchronize
}