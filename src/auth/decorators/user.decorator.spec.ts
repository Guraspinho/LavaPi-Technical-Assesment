import { ExecutionContext } from "@nestjs/common";
import { ExtractId } from './user.decorator';

describe("ExtractId Decorator", () => {
    it("should extract user id from request", () => {
        // Mock the request and user
        const mockRequest = {
            user: { id: 123 },
        };

        // Mock the execution context
        const mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue(mockRequest),
        } as unknown as ExecutionContext;

        // Simulate how the NestJS system calls the decorator
        const decoratorFunction = ExtractId(null, mockExecutionContext);

        // Now call the returned function with necessary arguments
        const result = decoratorFunction(null, undefined, 0);

        // Assert that the result is the expected user id
        expect(result).toBe(123);
    });
});