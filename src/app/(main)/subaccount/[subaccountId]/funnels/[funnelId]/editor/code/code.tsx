'use client'
import { getFunnelPageCode } from "@/lib/queries";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  funnelId: string
  subaccountId: string
  funnelPageId: string
}

const Code = ({funnelId, subaccountId, funnelPageId}: Props) => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCode = async () => {
      const result = await getFunnelPageCode(funnelPageId);
      if (result) setCode(result);
      else console.error("Failed to fetch code");
    };
    fetchCode();
  }, [funnelPageId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    router.push(`/subaccount/${subaccountId}/funnels/${funnelId}/editor/${funnelPageId}`);
  };

  return (
    <div className="relative h-full w-full bg-gray-900 text-white transition-all rounded-md">
      <div className="sticky top-0 z-10 bg-gray-900 flex justify-between items-center p-2">
        <button 
          onClick={handleBack} 
          className="p-2 hover:bg-gray-700 rounded-md transition-colors"
        >
          <ArrowLeft className="text-white" />
        </button>
        <button 
          onClick={handleCopy} 
          className="p-2 hover:bg-gray-700 rounded-md transition-colors"
        >
          {copied ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Copy className="text-white" />
          )}
        </button>
      </div>
      <div className="overflow-auto h-[calc(100%-50px)]">
        <SyntaxHighlighter 
          language="html" 
          style={materialDark} 
          customStyle={{
            margin: 0,
            height: '100%',
            background: 'transparent',
            padding: '1rem'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );      
};

export default Code;