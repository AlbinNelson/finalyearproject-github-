import React from "react";
import FunnelEditorNavigation from "../funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-navigation";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type Props ={
    params: {
        subaccountId: string
        funnelId: string
        funnelPageId: string
      }
}



const a = async ({params}:Props) => {

    
        const funnelPageDetails = await db.funnelPage.findFirst({
          where: {
            id: params.funnelPageId,
          },
        })
        if (!funnelPageDetails) {
          return redirect(
            `/subaccount/${params.subaccountId}/funnels/${params.funnelId}`
          )
        }


    return <FunnelEditorNavigation
    funnelPageId={params.funnelPageId}
    funnelId={params.funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={params.subaccountId}/>
}

export default a;