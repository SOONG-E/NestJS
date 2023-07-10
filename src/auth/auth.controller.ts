import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	constructor( private authService: AuthService){}

	@Post('/signup')
	signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void>{
		return this.authService.signUp(authCredentialDto);
	}

	@Post('/signin')
	signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<string>{
		return this.authService.signIn(authCredentialDto);
	}
}
