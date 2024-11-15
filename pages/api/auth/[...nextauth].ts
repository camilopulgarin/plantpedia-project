import NextAuth from 'next-auth'

import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

const options: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'platzi',
      credentials: {
        // username: {
        //   label: 'Username',
        //   type: 'text',
        //   placeholder: 'mail@example.com',
        // },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '****************',
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-type': 'application/json' },
        })

        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
  ],
}

export default NextAuth(options)