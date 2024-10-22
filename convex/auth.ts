import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { Password } from '@convex-dev/auth/providers/Password';
import { convexAuth } from '@convex-dev/auth/server';
import { DataModel } from './_generated/dataModel';
import { z } from 'zod';
import { ConvexError } from 'convex/values';

const ParamsSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    // .regex(/\d/, { message: "Password must contain at least one number" }),
});

const CustomPassword = Password<DataModel>({
  profile(params) {
    const { error, data } = ParamsSchema.safeParse(params);
    if (error) {
      throw new ConvexError(error.format());
    }

    return {
      email: data.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword, GitHub, Google],
});
