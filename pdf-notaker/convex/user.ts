import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { 
    email: v.string(),
    userName: v.string(),
    imageUrl:v.string()

 },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").filter((q) => q.eq(q.field('email'),args.email))
    .collect();

    if(user.length == 0){
        await  ctx.db.insert('users',{email:args.email, userName:args.userName, imageUrl:args.imageUrl})

        return "New User Inserted..."
    }
    return 'User Already Exist..'
  },
});