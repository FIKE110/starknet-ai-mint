import { pinata } from "@/app/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
const { name, description,image } = await req.json();
const address="0x02893833938383"
  console.log('NFT Submitted:');
  console.log('Name:', name);
   console.log('Image:', image);
  console.log('Description:', description);
  const result=await uploadImageToPinata(image,Date.now().toString()) 
  const metadata=generateImageMetadataJson(name,description,`https://plum-above-pigeon-646.mypinata.cloud/ipfs/${result.cid}/`,address)
  const resultMetadata=await uploadJsonToPinata(JSON.stringify(metadata))
  console.log(resultMetadata.cid)
  return NextResponse.json({ message: 'NFT data received!',url:`https://plum-above-pigeon-646.mypinata.cloud/ipfs/${resultMetadata.cid}/` });
}


function base64ToFile(base64: string, mimeType: string ,filename:string) {
  const byteChars = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteChars.length).fill(0).map((_, i) => byteChars.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const bytes=new Blob([byteArray], { type: mimeType });
  return new File([bytes], filename, { type: mimeType });
}

function getMimeType(base64: string): string | null {
  const match = base64.match(/^data:(.+?);base64,/);
  return match ? match[1] : null;
}

async function uploadImageToPinata(image:string,filename:string){
    const file=base64ToFile(image,getMimeType(image) as string,filename)
    const result=await pinata.upload.public
    .file(file)
    .name(generateFilename({extension:getMimeType(image)?.split("/")[1] as string,prefix:"image_"}))
    console.log(result)
    return result
}

async function uploadJsonToPinata(json:string){
   const blob = new Blob([json], { type: "application/json" });
    const file=new File([blob], generateFilename({extension:'json'}), { type: "application/json" });
    const result=await pinata.upload.public
    .file(file)
    .name(generateFilename({extension:"json"}))
    console.log(result)
    return result
}


function generateImageMetadataJson(name:string,desc:string,image:string,address:string){
   const json= {
        "name": name,
        "description": desc,
        "image": image,
        "banner_image": image,
        "featured_image": image,
        "external_link": image,
        "collaborators": [address]
        }

        return json
}

function generateFilename(options?: {
  prefix?: string;
  suffix?: string;
  extension?: string;
}): string {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, ""); // e.g. 20240624T122233
  const prefix = options?.prefix ?? "file";
  const suffix = options?.suffix ? `-${options.suffix}` : "";
  const extension = options?.extension ? `.${options.extension}` : "";

  return `${prefix}-${timestamp}${suffix}${extension}`;
}
