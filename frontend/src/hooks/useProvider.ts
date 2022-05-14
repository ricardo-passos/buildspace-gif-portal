import { useState, useEffect } from 'react'
import { AnchorProvider } from '@project-serum/anchor'
import { Connection, clusterApiUrl } from '@solana/web3.js'

function useProvider() {
  // states
  const [provider, setProvider] = useState<null | AnchorProvider>(null)

  useEffect(() => {
    const connection = new Connection('http://127.0.0.1:8899', 'processed')
    const provider = new AnchorProvider(connection, window.solana, {
      preflightCommitment: 'processed',
    })

    setProvider(provider)
  }, [])

  return { provider }
}

export { useProvider }
