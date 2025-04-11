import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const config = {
    providers: [GitHub]
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);