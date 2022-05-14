import { Group, Title, Text } from '@mantine/core'

// components
import { List } from '../components/Grid/List'
import { WalletConnection } from '../components/WalletConnection'

// contexts
import { UserContextProvider } from '../contexts/User'

function Home() {
  return (
    <UserContextProvider>
      <Group
        p='md'
        direction='column'
        sx={{
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title order={1}>🖼 GIF Portal</Title>

        <Text align='center'>View your GIF collection in the metaverse ✨</Text>

        <WalletConnection />

        <List />
      </Group>
    </UserContextProvider>
  )
}

export default Home
