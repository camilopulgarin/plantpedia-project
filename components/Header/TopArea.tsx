import { useRouter } from 'next/router'

import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

export function TopArea() {
  const { locales, locale } = useRouter()

  // Locales aren't configured
  if (locales == undefined || locale == undefined) {
    return null
  }

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <LoginLogout />
      </Grid>
      <Grid item>
        <Typography variant="body2" component="span" className="pr-3">
          Language:
        </Typography>
        {locales.map((loc) => (
          <form
            action="/api/language"
            method="POST"
            key={loc}
            className="inline-block"
          >
            <input name="preferredLocale" value={loc} type="hidden"></input>
            <Button
              variant={loc === locale ? 'outlined' : 'text'}
              className="ml-1"
              type="submit"
            >
              {loc}
            </Button>
          </form>
        ))}
      </Grid>
    </Grid>
  )
}

const LoginLogout = () => {
  const { data: session, status } = useSession() // obteniendo status
  const { t } = useTranslation(['common'])

  if (status === 'loading') return null // si esta cargando no mostrar nada

  if (!session) return <Button onClick={() => signIn()}>{t('signIn')}</Button>

  return (
    <>
      <span>{session.user?.name}</span>
      <Button onClick={() => signOut()}>{t('signOut')}</Button>
    </>
  )
}