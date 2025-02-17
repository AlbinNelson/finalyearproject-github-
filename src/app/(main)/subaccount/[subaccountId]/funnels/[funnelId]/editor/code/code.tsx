'use client'
import { getFunnelPageCode } from "@/lib/queries";
import { useEffect, useState } from "react";

type Props = {
  funnelId: string
  subaccountId: string
  funnelPageId: string
}

const Code = ({funnelId, subaccountId, funnelPageId}: Props) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchCode = async () => {
      const result = await getFunnelPageCode(funnelPageId);
      if (result) setCode(result);
      else console.error("Failed to fetch code");
    };
    fetchCode();
  }, [funnelPageId]);

  return (
    <div className="h-full w-full overflow-scroll bg-gray-900 text-white transition-all rounded-md m-0">
      <pre className="p-4">{code}</pre>
  </div>
  );      
};

export default Code;