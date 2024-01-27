import NextAuth, { type DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
    // You can add other providers here
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = account.providerAccountId
        token.image = profile.picture || profile.avatar_url || null
      }
      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ auth }) {
      return !!auth?.user // Ensures there is a logged-in user for every request
    }
  },
  pages: {
    signIn: '/sign-in' // Custom sign-in page
  },
  secret: process.env.AUTH_SECRET // Ensure you have a NEXTAUTH_SECRET set in your environment
})
