import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      //protected Route
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');


      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false;
        // Redirect unauthenticated users to login page
      }
      else if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL('/admin', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
