import { validate } from "class-validator";
import { RegisterUserDto } from "./registerUser.dto";

describe("RegisterUserDto", () => 
{
    it("should succeed validation with valid data", async () => 
    {
        const dto = new RegisterUserDto();
        dto.firstName = "Peter";
        dto.lastName = "Parker";
        dto.email = "user@example.com";
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBe(0);  // No validation errors
    });

    it("should fail validation if firstName exceeds max length", async () => 
    {
        const dto = new RegisterUserDto();
        dto.firstName = "A very long first name exceeding max length";
        dto.lastName = "Parker";
        dto.email = "user@example.com";
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.maxLength).toBeDefined();  // Should contain maxLength error
    });

    it("should fail validation if firstName is not provided", async () => 
    {
        const dto = new RegisterUserDto();
        dto.firstName = '';  // Empty string
        dto.lastName = "Parker";
        dto.email = "user@example.com";
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isNotEmpty).toBeDefined();  // Should contain isNotEmpty error
    });

    it("should fail validation if email is not valid", async () => 
    {
        const dto = new RegisterUserDto();
        dto.firstName = "Peter";
        dto.lastName = "Parker";
        dto.email = "invalid-email";  // Invalid email
        dto.password = "password123";

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isEmail).toBeDefined();  // Should contain isEmail error
    });

    it("should fail validation if password is shorter than 8 characters", async () => 
    {
        const dto = new RegisterUserDto();
        dto.firstName = "Peter";
        dto.lastName = "Parker";
        dto.email = "user@example.com";
        dto.password = "short";  // Password shorter than 8 characters

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.minLength).toBeDefined();  // Should contain minLength error
    });
});