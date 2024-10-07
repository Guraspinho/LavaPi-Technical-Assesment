import { validate } from "class-validator";
import { LoginUserDto } from "./loginUser.dto";

describe("LoginUserDto", () =>
{
    it("should succeed validation when email and password are valid", async () =>
    {
        const dto = new LoginUserDto();
        dto.email = "user@example.com";
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBe(0);  // No validation errors
    });

    it("should fail validation if email is not valid", async () =>
    {
        const dto = new LoginUserDto();
        dto.email = "invalid-email";
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isEmail).toBeDefined();  // Should contain isEmail error
    });

    it("should fail validation if email is empty", async () =>
    {
        const dto = new LoginUserDto();
        dto.email = '';
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isNotEmpty).toBeDefined();  // Should contain isNotEmpty error
    });

    it("should fail validation if password is empty", async () =>
    {
        const dto = new LoginUserDto();
        dto.email = "user@example.com";
        dto.password = '';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isNotEmpty).toBeDefined();  // Should contain isNotEmpty error
    });

    it("should fail validation if password is not a string", async () =>
    {
        const dto = new LoginUserDto();
        dto.email = "user@example.com";
        dto.password = 123 as any;  // Invalid type

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isString).toBeDefined();  // Should contain isString error
    });
});
