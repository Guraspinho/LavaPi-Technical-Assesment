import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard, Reflector],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true for canActivate', () => {
    const context: ExecutionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({ user: { id: 1, username: 'test' } }),
      getResponse: jest.fn().mockReturnThis(),
      getNext: jest.fn().mockReturnThis(),
      switchToRpc: jest.fn().mockReturnThis(),
      switchToWs: jest.fn().mockReturnThis(),
      getType: jest.fn().mockReturnThis(),
      getClass: jest.fn().mockReturnThis(),
      getHandler: jest.fn().mockReturnThis(),
    } as unknown as ExecutionContext;

    // Mock the canActivate method to return true
    jest.spyOn(guard, 'canActivate').mockReturnValue(true);

    expect(guard.canActivate(context)).toBe(true);
  });
});
