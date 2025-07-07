import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {prompt} =await req.json()
    const url = 'https://api.hyperbolic.xyz/v1/image/generation';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HYPERBOLIC_API_KEY}`,
    },
    body: JSON.stringify({
      'model_name': 'SDXL1.0-base',
      'prompt': prompt,
      'enable_refiner': 'false',
      'negative_prompt': '',
      'strength': '0.8',
      'steps': '30',
      'cfg_scale': '5',
      'resolution': '1024x1024',
      'backend': 'auto',
      "height":1024,"width":1024
    }),
  });
  
  //{"prompt":"a man on a cow",,"cfg_scale":5,"enable_refiner":false,"model_name":"SDXL1.0-base","steps":30,"strength":0.8}
  const json = await response.json();
  
  const output = json.images[0];
  console.log(output);
  return NextResponse.json(output)
}