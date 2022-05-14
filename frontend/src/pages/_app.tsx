// contexts
import { MantineProvider } from '../contexts/Mantine'

// types
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
