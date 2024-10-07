import { validate } from "class-validator";
import { SearchBookDto } from "./searchBook.dto";

describe("SearchBookDto", () =>
{
    it("should succeed validation when title and author are valid", async () =>
    {
        const dto = new SearchBookDto();
        dto.title = "Valid Title";
        dto.author = "Valid Author";

        const errors = await validate(dto);
        expect(errors.length).toBe(0);  // No validation errors
    });

    it("should fail validation if title is too long", async () =>
    {
        const dto = new SearchBookDto();
        dto.title = 'a'.repeat(256);  // Exceeds the length limit

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        // console.log(errors[0].constraints);  // Logged constraints to see what properties it contains
        expect(errors[0].constraints?.isLength).toBeDefined();  // Should contain isLength error
    });

    it("should fail validation if title is not a string", async () =>
    {
        const dto = new SearchBookDto();
        dto.title = 123 as any;  // Invalid type

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);  // Should have validation errors
        expect(errors[0].constraints?.isString).toBeDefined();  // Should contain isString error
    });

    it("should pass validation if fields are optional", async () =>
    {
        const dto = new SearchBookDto();
        const errors = await validate(dto);

        expect(errors.length).toBe(0);  // No validation errors since both fields are optional
    });
});