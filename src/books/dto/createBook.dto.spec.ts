import { validate } from "class-validator";
import { CreateBookDto } from "./createBook.dto"; // Adjust the path accordingly

describe("CreateBookDto", () =>
{
    it("should validate a valid DTO", async () =>
    {
        const dto = new CreateBookDto();
        dto.title = "Valid Title";
        dto.author = "Valid Author";
        dto.publishDate = new Date("2023-10-07T00:00:00.000Z");

        const errors = await validate(dto);
        expect(errors.length).toBe(0); // No validation errors should be present
    });

    it("should not validate a DTO with missing fields", async () =>
    {
        const dto = new CreateBookDto();
        dto.title = ''; // Invalid: empty string
        dto.author = "Valid Author";
        dto.publishDate = new Date("2023-10-07T00:00:00.000Z");

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0); // Expect validation errors
    });

    it("should not validate a DTO with an invalid publishDate", async () =>
    {
        const dto = new CreateBookDto();
        dto.title = "Valid Title";
        dto.author = "Valid Author";
        dto.publishDate = null; // Invalid: should be a Date

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0); // Expect validation errors
    });
});

// I am not writing tests for editBook.dto.ts because it just inherits everything from this file