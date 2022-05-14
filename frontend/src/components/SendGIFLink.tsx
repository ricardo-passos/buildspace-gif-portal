import { useState } from 'react'
import { Group, TextInput, Button } from '@mantine/core'

// hooks
import { useProgram } from '../hooks/useProgram'
import { useAccount } from '../hooks/useAccount'
import { useUserContext } from '../hooks/useUserContext'

// types
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setGifList: Dispatch<
    SetStateAction<null | { gifLink: string; userAddress: string }[]>
  >
}

function SendGIFLink({ setGifList }: Props) {
  // states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [gifUrl, setGifUrl] = useState<null | string>(null)

  // hooks
  const { program } = useProgram()
  const { baseAccount } = useAccount()
  const { walletAddress } = useUserContext()

  async function sendGIF() {
    setError('')
    setIsLoading(true)

    if (!gifUrl) {
      setError('Invalid input!')
    } else {
      if (baseAccount && walletAddress) {
        try {
          await program?.rpc?.addGif(gifUrl, {
            accounts: {
              baseAccount: baseAccount?.publicKey,
              user: walletAddress,
            },
          })

          const newGifData = {
            gifLink: gifUrl,
            userAddress: walletAddress || '',
          }

          setGifList((currentGIFs) =>
            currentGIFs === null ? [newGifData] : [newGifData, ...currentGIFs]
          )
        } catch (err) {
          console.log(err)
        }
      }
    }

    setGifUrl('')
    setIsLoading(false)
  }

  return (
    <Group
      noWrap
      direction='row'
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextInput
        error={error}
        value={gifUrl || ''}
        placeholder='Enter GIF link!'
        onChange={({ target: { value } }) => setGifUrl(value)}
      />

      <Button
        onClick={sendGIF}
        loading={isLoading}
        style={{ alignSelf: 'flex-start' }}
      >
        {isLoading ? 'Sending' : 'Send'}
      </Button>
    </Group>
  )
}

export { SendGIFLink }
