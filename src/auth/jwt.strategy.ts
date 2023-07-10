import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
	//module에 디폴트로 jwt를 등록해둬서 jwt Strategy를 passport-jwt를 이용해 정의한다.
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository){
			super({
				secretOrKey: 'Sercret1234',
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
			})
		}
	
	async validate(payload){
		const { username } = payload;
		const user: User = await this.userRepository.findOneBy({ username });

		if (!user){
			throw new UnauthorizedException();
		}
		return user;
	}
}