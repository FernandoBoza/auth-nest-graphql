import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log(GqlExecutionContext.create(context).getContext().req.user);
    const { _id, email } = GqlExecutionContext.create(
      context,
    ).getContext().req.user;
    return {
      _id,
      email,
    };
  },
);
