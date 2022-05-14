import { Button } from '@mantine/core'
import { SystemProgram } from '@solana/web3.js'

// hooks
import { useProgram } from '../hooks/useProgram'
import { useAccount } from '../hooks/useAccount'
import { useUserContext } from '../hooks/useUserContext'

// types
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setGifList: Dispatch<
    SetStateAction<null | { gifLink: string; userAddress: string }[]>
  >
}

function CreateGifAccount({ setGifList }: Props) {
  // hooks
  const { program } = useProgram()
  const { baseAccount } = useAccount()
  const { walletAddress } = useUserContext()

  async function createGifAccount() {
    if (program && walletAddress && baseAccount) {
      console.log('create GIF account', baseAccount?.publicKey.toString())

      try {
        // this shit is deprecated but it works. documentation sucks for now
        await program?.rpc.startStuffOff({
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: walletAddress,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        })

        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        )

        setGifList(account.gifList)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Button onClick={createGifAccount}>
      Do One-Time Initialization For GIF Program Account
    </Button>
  )
}

export { CreateGifAccount }
