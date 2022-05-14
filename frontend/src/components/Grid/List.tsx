import { Group } from '@mantine/core'
import { useState, useEffect } from 'react'

// components
import { Item } from './Item'
import { SendGIFLink } from '../SendGIFLink'
import { CreateGifAccount } from '../CreateGifAccount'

// hooks
import { useAccount } from '../../hooks/useAccount'
import { useUserContext } from '../../hooks/useUserContext'

function List() {
  // states
  const [gifList, setGifList] = useState<
    null | { gifLink: string; userAddress: string }[]
  >(null)

  // hooks
  const { account } = useAccount()
  const { walletAddress } = useUserContext()

  useEffect(() => {
    if (walletAddress && account) {
      setGifList(account.gifList.reverse())
    }
  }, [walletAddress, account])

  return (
    <>
      {gifList ? (
        <Group
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SendGIFLink setGifList={setGifList} />

          {gifList.map((gif, i) => (
            <Item gifUrl={gif.gifLink} key={gif.gifLink.substring(8, 12) + i} />
          ))}
        </Group>
      ) : (
        <CreateGifAccount setGifList={setGifList} />
      )}
    </>
  )
}

export { List }
