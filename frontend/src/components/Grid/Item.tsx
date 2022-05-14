import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { Box, Card, Image, Text, Group, ActionIcon } from '@mantine/core'

// hooks
import { useUserContext } from '../../hooks/useUserContext'

type Props = {
  gifUrl: string
}

function Item({ gifUrl }: Props) {
  // hooks
  const { walletAddress, formattedWalletAddress } = useUserContext()

  return (
    <Card shadow='sm' p='lg' pb={0}>
      <Card.Section>
        <Image src={gifUrl} alt='' />
      </Card.Section>

      <Group
        py={4}
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box>
          <ActionIcon>
            <BiUpvote />

            <Text component='p'></Text>
          </ActionIcon>

          <ActionIcon>
            <BiDownvote />

            <Text component='p'></Text>
          </ActionIcon>
        </Box>

        <Text m={0} component='p' weight={400}>
          sent by:{' '}
          <Text weight={700} component='span'>
            {formattedWalletAddress}
          </Text>
        </Text>
      </Group>
    </Card>
  )
}

export { Item }
