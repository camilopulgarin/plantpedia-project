import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useServerStyles } from '@ui/ssr'
import { QueryProvider } from '@api/QueryProvider'

import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <QueryProvider>
        <Component {...pageProps} />
    </QueryProvider>
  )
}

export default appWithTranslation(NextApp)