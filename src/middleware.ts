import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ['/site','/api/uploadthing'],
  async afterAuth(auth, req) {
    const url = req.nextUrl
    const searchParams = url.searchParams.toString()
    const host = req.headers.get('host') || ''

    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}`:''}`

    // Refined subdomain detection
    const customSubDomain = host.replace(`.${process.env.NEXT_PUBLIC_DOMAIN}`, '')

    if (customSubDomain && customSubDomain !== host) {
      return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url))
    }

    // Your existing routing logic remains the same
    if(url.pathname==="/sign-in"|| url.pathname==="/sign-up") {
      return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
    }

    if(url.pathname==="/" || url.pathname==="/site" && url.host===process.env.NEXT_PUBLIC_DOMAIN) {
      return NextResponse.rewrite(new URL('/site', req.url))
    }

    if(url.pathname.startsWith('/agency')||url.pathname.startsWith('/subaccount')) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};