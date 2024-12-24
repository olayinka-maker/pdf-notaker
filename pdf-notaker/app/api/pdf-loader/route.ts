import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from '@langchain/core/documents';


type ResponseData = {
  message: string
}

const pdfUrl = "https://wry-deer-720.convex.cloud/api/storage/af37e3af-0b03-4ac5-90de-6131eb8afbc7"

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const response = await fetch(pdfUrl)
    const data = await response.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()

    let pdfTextContent = ""
    for (const doc of docs) {
        pdfTextContent += doc.pageContent
    }

    // split the text content into smaller  chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });
      
      const output = await splitter.createDocuments([pdfTextContent]);

      // store output in form of List

      let splitterList: string[] = []; // Declare splitterList as an array of strings

      output.forEach((element: Document<Record<string, any>>) => {
        splitterList.push(element.pageContent); 
      });
      



    return NextResponse.json({ message: splitterList})
  } catch (error) {
    return NextResponse.json({ message: 'Error loading PDF' }, { status: 500 })
  }
}