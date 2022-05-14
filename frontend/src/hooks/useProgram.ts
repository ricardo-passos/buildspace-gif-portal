import { useState, useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { Program } from '@project-serum/anchor'

// hooks
import { useProvider } from './useProvider'

// IDLs
import backendIDL from '../web3/IDLs/backend.json'

function useProgram() {
  // states
  const [program, setProgram] = useState<null | Program>(null)

  // hooks
  const { provider } = useProvider()

  useEffect(() => {
    if (provider) {
      const programID = new PublicKey(backendIDL.metadata.address)
      const program = new Program(backendIDL, programID, provider)

      setProgram(program)
    }
  }, [provider])

  return { program }
}

export { useProgram }
