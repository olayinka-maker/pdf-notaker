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
import { generateUploadUrl, getFileUrl, uploadFileToDb } from "@/convex/fileStorage";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAction, useMutation } from "convex/react";
import { randomUUID } from "crypto";
import { Loader } from "lucide-react";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { myActions} from ".../convex/myActions"


export function DialogDemo({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const embeddedDocument = useAction(myActions)
    const [file, SetFile] = useState<File | null>(null);
    const addFiletoDb = useMutation(api.fileStorage.uploadFileToDb)
    const getFileUrl = useMutation(api.fileStorage.getFileUrl)
    const [loading, setLoading]= useState(false)
    const [fileName, SetFileName] = useState<string>("")

    const fileId = uuidv4()
    const user = useUser()

    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        SetFile(event.target.files[0]);
      }
    }

    const UploadSelectedFile = async () =>{
      // setLoading(true)
      // const postUrl = await generateUploadUrl();

      // const result = await fetch(postUrl, {
      //   method: "POST",
      //   headers: { "Content-Type": file!.type },
      //   body: file,
      // });
      // const { storageId } = await result.json();
      // console.log("storage Id :", storageId );
      // const fileLink = await getFileUrl({storageId:storageId})


     

      // const response = await addFiletoDb({
      //   fileId: fileId,
      //   StorageId: storageId,
      //   fileName: fileName ?? "Untitled File",
      //   createdBy: user?.user?.primaryEmailAddress?.emailAddress ?? "unknown",
      //   fileUrl:fileLink ?? "unknown"
      // });
      
      // console.log(response);

      const apiRes = await axios.get('/api/pdf-loader')
      console.log(apiRes.data.message);
      
      
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
                 Upload a File
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
            onChange={(e:ChangeEvent<HTMLInputElement>)=>SetFileName(e.target.value)}
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
