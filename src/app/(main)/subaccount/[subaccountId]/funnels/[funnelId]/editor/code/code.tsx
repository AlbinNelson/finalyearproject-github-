'use client'
import { getFunnelPageCode } from "@/lib/queries";
import { useEffect, useState } from "react";
import React from "react";

type Props = {
    funnelId:string
} 

const Code = ({funnelId}:Props) => {
    const [code, setCode] = useState('');
  
    useEffect(() => {
      const fetchCode = async () => {
        const result = await getFunnelPageCode(funnelId);
        if (result) setCode(result);
        else console.error("Failed to fetch code");
      };
      fetchCode();
    }, [funnelId]);
  
    return (
        <div className="h-full w-full overflow-scroll bg-gray-900 text-white transition-all rounded-md mr-[385px]">
          <pre className="p-4">{code}</pre>
        </div>
      );      
  };
  
  export default Code;
  