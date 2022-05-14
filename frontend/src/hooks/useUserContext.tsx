import { useContext } from 'react'

// contexts
import { UserContext } from '../contexts/User'

const useUserContext = () => useContext(UserContext)

export { useUserContext }
