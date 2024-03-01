import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import LinkedinProvider from "next-auth/providers/linkedin";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import DiscordProvider from "next-auth/providers/discord";
// import EmailProvider from "next-auth/providers/email";
// import MediumProvider from "next-auth/providers/medium";
// import YandexProvider from "next-auth/providers/yandex";

// import Providers from "next-auth/providers";

const authOptions:NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    // }), 
  //     Providers.GITHUB({
  //   clientId: process.env.GITHUB_ID,
  //   clientSecret: process.env.GITHUB_SECRET
  // }),
  // Providers.GOOGLE({
  //   clientId: process.env.GOOGLE_ID,
  //   clientSecret: process.env.GOOGLE_SECRET
  // })
  ],
};
export { authOptions };

// import Providers from `next-auth/providers`
// providers: [
//   Providers.Twitter({
//     clientId: process.env.TWITTER_ID,
//     clientSecret: process.env.TWITTER_SECRET
//   })
// ],