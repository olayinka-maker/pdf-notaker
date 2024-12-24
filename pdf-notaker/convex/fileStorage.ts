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
            createdBy:v.string(),
            fileUrl :v.string()
   },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("pdfFiles", { fileId: args.fileId, StorageId:  args.StorageId, fileName:args.fileName, createdBy: args.createdBy , fileUrl:args.fileUrl});
    
    return "Inserted"
  },
});



export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});