import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useServerStyles } from '@ui/ssr'
import { QueryProvider } from '@api/QueryProvider'
import { SessionProvider as AuthProvider } from 'next-auth/react';


import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <AuthProvider session={pageProps.session}>
      <QueryProvider>
          <Component {...pageProps} />
      </QueryProvider>
    </AuthProvider>
  )
}

export default appWithTranslation(NextApp)