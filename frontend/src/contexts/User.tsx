import { useState, useEffect, createContext, useContext } from 'react'

// types
import type { ReactNode } from 'react'

type UserContextProps = {
  walletAddress: null | string
  connectWallet: () => Promise<void>
  formattedWalletAddress: null | string
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

type Props = {
  children: ReactNode
}

function UserContextProvider({ children }: Props) {
  const [walletAddress, setWalletAddress] = useState<null | string>(null)
  const [formattedWalletAddress, setFormattedWalletAddress] = useState<
    null | string
  >()

  async function checkIfWalletIsConnected() {
    if (!('solana' in window)) {
      console.log('Solana object not found! Get a Phantom Wallet 👻')

      return
    }

    const solanaProvider = window.solana

    try {
      const response = await solanaProvider.connect({ onlyIfTrusted: true })

      setWalletAddress(response.publicKey.toString())
    } catch (err) {
      console.error(err.message)
    }
  }

  async function connectWallet() {
    const solanaProvider = window.solana

    try {
      const response = await solanaProvider.connect()
      setWalletAddress(response.publicKey.toString())
    } catch (err) {}
  }

  useEffect(() => {
    ;(async () => await checkIfWalletIsConnected())()
  }, [])

  useEffect(() => {
    if (walletAddress) {
      const walletAddressFirstPart = walletAddress.substring(0, 4)
      const walletAddressSecondPart = walletAddress.substring(40)

      setFormattedWalletAddress(
        `${walletAddressFirstPart} ... ${walletAddressSecondPart}`
      )
    }
  }, [walletAddress])

  return (
    <UserContext.Provider
      value={{ walletAddress, connectWallet, formattedWalletAddress }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
