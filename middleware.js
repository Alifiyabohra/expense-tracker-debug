import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)"
]);
export default clerkMiddleware(async (auth,request)=>{
  const { userid } = await auth();
  
  if(!userid && isProtectedRoute(request)){
    const { redirectToSignIn} = await auth();

    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)).*)",
    "/(api|trpc)(.*)",
  ],
};