import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name:'DebBuild',
        description:'A website builder',
        start_url:'/',
        display:'standalone',
        icons:[
            {
                src:'/assets/plura-logo.svg',
                sizes:'192x192',
                type:'image/svg+xml'
            },
            {
                src:'/assets/plura-logo.svg',
                sizes:'512x512',
                type:'image/svg+xml'
            }
        ]
    }
}
//can be removed if not working