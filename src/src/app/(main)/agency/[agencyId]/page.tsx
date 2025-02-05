import { UserButton } from "@clerk/nextjs";
import React from "react";

const Page = ({params}:{params:{agencyId:string}}) => {
    return(
        <div>
            <div>{params.agencyId}</div>
            <div>Dashboard</div>
            
        </div>
    )
}

export default Page;