import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";


{/* state is from stripe, use it if it is needed 6:12 */}
type Props = {
    searchParams:{ state: string; code:string } 
}

const SubAccountMainPage = async ({searchParams}:Props) => {
    const agencyId = await verifyAndAcceptInvitation()

    if(!agencyId) {
        return <Unauthorized/>
    }
     const user = await getAuthUserDetails()
     if(!user) return

     const getFirstSubaccountWithAccess = user.Permissions.find(
        (permission)=>permission.access===true
    )

    {/* state is for stripe ig..., probably for payment checking */}
    if(searchParams.state){
        const statePath = searchParams.state.split('___')[0]
        const stateSubaccountId = searchParams.state.split('___')[1]
        if(!stateSubaccountId) return <Unauthorized/>
        return redirect(`/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`)
    }

    {/* To get the first subaccount for a user and return to that page */}
    if(getFirstSubaccountWithAccess)
    {
        return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`)
    }

    return <Unauthorized/>
}

export default SubAccountMainPage;