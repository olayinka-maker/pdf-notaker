import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});





export const uploadFileToDb = mutation({
  args: {
            fileId:v.string(),
            StorageId:v.string(),
            fileName :v.string(),
            createdBy:v.string()
   },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("pdfFiles", { fileId: args.fileId, StorageId:  args.StorageId, fileName:args.fileName, createdBy: args.createdBy });
    
    return "Inserted"
  },
});