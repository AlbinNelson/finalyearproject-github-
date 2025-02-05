import Link from "next/link"
import React from "react"

type Props = {

}

const Unauthorized = (props: Props) => {
    return(
        <div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
            <h1 className="text-3xl md:text-6xl">Unauthorized Acces</h1>
            <p>You dont have access, contact Agency</p>
            <Link href="/" className="mt-4 bg-primary p-2">Back to hoime</Link>
        </div>
    )
}

export default Unauthorized;