import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
// import DiscordProvider from "next-auth/providers/discord";
// import FacebookProvider from "next-auth/providers/facebook";
// import LinkedinProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import EmailProvider from "next-auth/providers/email";
// import MediumProvider from "next-auth/providers/medium";

const authOptions:NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_ID!,
      clientSecret: process.env.YANDEX_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_ID!,
    //   clientSecret: process.env.DISCORD_SECRET!,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID!,
    //   clientSecret: process.env.FACEBOOK_SECRET!,
    // })
  ],
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // }
};
export { authOptions };