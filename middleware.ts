import NextAuth from "next-auth";

import {auth} from "@/auth"

export default auth((req) => {

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}