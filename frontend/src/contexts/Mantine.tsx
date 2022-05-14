import {
  MantineProvider as Provider,
  MantineThemeOverride,
  MantineTheme,
} from '@mantine/core'

// types
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
}

function MantineProvider({ children }: Props) {
  return (
    <Provider withNormalizeCSS withGlobalStyles theme={theme}>
      {children}
    </Provider>
  )
}

export { MantineProvider }
