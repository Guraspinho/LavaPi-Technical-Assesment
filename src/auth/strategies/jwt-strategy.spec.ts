import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

describe("JwtStrategy", () =>
{
	let strategy: JwtStrategy;

	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true })],
			providers: [JwtStrategy],
		}).compile();

		strategy = module.get<JwtStrategy>(JwtStrategy);
	});

	it("should be defined", () =>
	{
		expect(strategy).toBeDefined();
	});

	it("should validate and return the payload", async () =>
	{
		const payload = { firstName: "Peter", lastName: "Parker", id: 1 };

		const result = await strategy.validate(payload);

		expect(result).toEqual({ firstName: "Peter", lastName: "Parker", id: 1 });
	});
});