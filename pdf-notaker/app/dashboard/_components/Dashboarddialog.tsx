import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/convex/_generated/api";
import { generateUploadUrl, uploadFileToDb } from "@/convex/fileStorage";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "convex/react";
import { randomUUID } from "crypto";
import { Loader } from "lucide-react";
import { useState } from "react";

export function DialogDemo({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const [file, SetFile] = useState<File | null>(null);
    const addFiletoDb = useMutation(api.fileStorage.uploadFileToDb)
    const [loading, setLoading]= useState(false)

    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        SetFile(event.target.files[0]);
      }
    }

    const UploadSelectedFile = async () =>{
      setLoading(true)
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file!.type },
        body: file,
      });
      const { storageId } = await result.json();
      console.log("storage Id :", storageId );

      const fileId = randomUUID()
      const user = useUser()

      const response = await addFiletoDb({
        fileId:fileId,
        StorageId:storageId,
        fileName: file?.name,
        createdBy: user?.user?.primaryEmailAddress?.emailAddress,
        
     })
      
        setLoading(false)
    }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-400 py-4 w-[90%]">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>Upload Pdf File </DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="file" className=" text-gray-400 text-right">
            Select a file to upload
            </Label>
            <Input
              id="file"
              onChange={onSelectFile}
              accept="application/pdf"
              className="col-span-3"
              type="file"
            />
          </div>
          <div className="">
            <Label htmlFor="username" className=" text-gray-400 text-right">
              File Name*
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={UploadSelectedFile}>
            { loading ? <Loader className=" animate-spin"/> : "Upload"}
           </Button>
          <DialogClose>
          <Button type="submit">cancle</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
