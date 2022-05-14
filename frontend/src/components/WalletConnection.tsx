import { Button } from '@mantine/core'

// hooks
import { useUserContext } from '../hooks/useUserContext'

function WalletConnection() {
  // hooks
  const { walletAddress, connectWallet } = useUserContext()

  return (
    <>
      {!walletAddress && (
        <Button onClick={connectWallet}>Connect my wallet</Button>
      )}
    </>
  )
}

export { WalletConnection }
