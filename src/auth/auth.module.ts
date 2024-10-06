import { forwardRef, Module } from '@nestjs/common';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';


@Module({
	imports:
	[
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.register({
			secret: process.env.ACCESS_TOKEN_SECRET,
			signOptions: {expiresIn: process.env.ACCESS_TOKEN_LIFETIME}
		})
	],
  	providers: [JwtStrategy],
	exports: [JwtModule],
})
export class AuthModule {}
