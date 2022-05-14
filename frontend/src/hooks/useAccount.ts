import { useState, useEffect } from 'react'
import { web3 } from '@project-serum/anchor'

// hooks
import { useProgram } from './useProgram'
import { useProvider } from './useProvider'

// web3
import gifKeyPair from '../web3/accounts/gif.json'

// types
import { Idl, IdlTypes } from '@project-serum/anchor'
import { IdlAccountDef } from '@project-serum/anchor/dist/cjs/idl'
import { TypeDef } from '@project-serum/anchor/dist/cjs/program/namespace/types'

function useAccount() {
  // states
  const [account, setAccount] = useState<null | TypeDef<
    IdlAccountDef,
    IdlTypes<Idl>
  >>(null)
  const [baseAccount, setBaseAccount] = useState<null | web3.Keypair>(null)

  // hooks
  const { program } = useProgram()
  const { provider } = useProvider()

  useEffect(() => {
    if (provider) {
      const secretKey = Object.values(gifKeyPair._keypair.secretKey)
      const bytesKeyPair = new Uint8Array(secretKey)
      const baseAccount = web3.Keypair.fromSecretKey(bytesKeyPair)
      setBaseAccount(baseAccount)
    }
  }, [provider])

  useEffect(() => {
    if (baseAccount && provider && program) {
      ;(async () => {
        try {
          const account = await program.account.baseAccount.fetch(
            baseAccount.publicKey
          )

          setAccount(account)
        } catch (err) {
          console.log(err)
        }
      })()
    }
  }, [baseAccount, provider, program])

  return { account, baseAccount }
}

export { useAccount }
