import { generateReactHelpers, generateUploadDropzone} from '@uploadthing/react'
//import {generateReactHelpers} from '@uploadthing/react/hooks'
import { generateUploadButton } from "@uploadthing/react";



import type {OurFileRouter} from '@/app/api/uploadthing/core'


export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();



//export const {UploadButton,UploadDropzone,Uploader} = 
//   generateComponents<OurFileRouter>()

export const {useUploadThing,uploadFiles} = 
    generateReactHelpers<OurFileRouter>()