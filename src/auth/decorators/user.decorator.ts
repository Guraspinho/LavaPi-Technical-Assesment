// this file is responsible for extracting user information from access tokens

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ExtractId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
    {
        const request = ctx.switchToHttp().getRequest();
        
        // returning only the id because that is the only thing that is needed for identification
        return request.user.id;
    },
);