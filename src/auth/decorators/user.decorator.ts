// this file is responsible for extracting user information from access tokens

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
    {
        const request = ctx.switchToHttp().getRequest();
        
        // returning only the id because that is the only thing that i need for identification
        return request.user.id;
    },
);