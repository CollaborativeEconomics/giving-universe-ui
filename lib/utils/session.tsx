import { useState, useEffect, createContext, useContext } from 'react'
import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import { getUserByWallet, newUser, newSession } from 'utils/api'
import { UUID } from 'utils/random'

interface UserData {
  id:       string
  name:     string
  email:    string
  image:    string
}

interface WalletData {
  chain:    string
  address:  string
}

export interface SessionData {
  wallet:   string
  address:  string
  chain:    string
  chainid:  string
  currency: string
  network:  string
  signed:   boolean
  token:    string
  topic:    string
  user?:    UserData
}

var _session:SessionData = {
  signed:  false,
  wallet:  '',
  address: '',
  chain:   '',
  chainid: '',
  currency:'',
  network: '',
  token:   '',
  topic:   '',
  user: {
    id:    '',
    name:  'Anonymous',
    email: '',
    image: 'nopic.png'
  }
}

function getCookieString(text:string){
  let cookie = getCookie(text) || ''
  cookie = cookie ? cookie.toString() : ''
  return cookie 
}

async function getUserByAddress(address){
  const anon:UserData = {
    id:    '',
    name:  'Anonymous',
    email: '',
    image: 'nopic.png'
  }
  var user = await getUserByWallet(address)
  if(!user || user?.error){
    return anon
  } else {
    return user
  }
}

function nextYear(){
  var date = new Date()
  date.setDate(date.getDate() + 365)
  return new Date(date)
}

async function createSession(token, userId){
  const oneYear = nextYear().toJSON()
  const state = {
    sessionToken: token,
    userId: userId,
    expires: oneYear
  }
  const rec = await newSession(state)
  return rec
}

async function createUser(token, chain, address){
  const user = {
    action:  'new',
    name:    'Anonymous',
    email:   token+'@example.com',
    image:   'nopic.png',
    address: address,
    chain:   chain
  }
  const rec = await newUser(user)
  return rec
}

async function Session(){
  //console.log('GET Session...')
  const session = {..._session}
  const token = getCookieString('token')
  //const token = '7d133cc6-427f-4e09-a64d-f07aab70f4f6'
  //console.log('Session Token', token)
  if(!token){ return session }
  const req = await fetch('api/session?token='+token)
  const res = await req.json()
  if(res?.error){ return session }
  if(res?.success){
    //const state = res.data
    session.chain    = getCookieString('chain')     //state.chain
    session.chainid  = ''
    session.network  = getCookieString('network')   //state.network
    session.currency = getCookieString('currency')  //state.currency
    session.wallet   = getCookieString('wallet')    //state.wallet
    session.address  = getCookieString('address')   //state.address
    session.signed   = true
    session.token    = token
    session.topic    = ''
    session.user     = await getUserByAddress(session.address)
  }
  //console.log('Session', session?.chain)
  return session
}


//const SessionContext = createContext({session:{signed:false}})
//const SessionContext = createContext<SessionData>([{}, ()=>{}])
//const SessionContext = createContext([_session, (arg)=>{}])
const SessionContext = createContext([])
 
function SessionProvider({children}) {
  const [session, setSession] = useState(_session)
  //const [session, setSession] = useState()
  //const session = await Session()
  //console.log('Session provider...')
  useEffect(() => {
    //console.log('Session provider effect...')
    async function getSession(){
      const state = await Session()
      setSession(state)
      //console.log('Session context', state)
    }
    getSession()
  },[setSession])

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  )
}

//const session = SessionManager()
// session.signIn(wallet)
// session.signOut()
// session.get()
// session.set(newState)
// session.getValue('key')
// session.setValue('key', 'val')
const SessionManager = ()=>{
  const [session, setSession] = useContext(SessionContext)
  //console.log('Session Manager', session)

  const signIn = async (wallet)=>{
    const state    = {..._session}
    state.wallet   = wallet.wallet
    state.address  = wallet.address
    state.chain    = wallet.chain
    state.chainid  = ''
    state.currency = wallet.currency
    state.network  = wallet.network
    state.signed   = true
    state.token    = UUID()
    state.topic    = ''
    state.user     = await getUserByAddress(wallet.address)
    if(!state.user.id){
      const created = await createUser(state.token, state.chain, state.address)
      state.user = created
      //console.log('NEW USER', state.user)
    }
    //console.log('SESSION SIGNIN', state)
    setCookie('wallet',   state.wallet)
    setCookie('address',  state.address)
    setCookie('chain',    state.chain)
    setCookie('currency', state.currency)
    setCookie('network',  state.network)
    setCookie('token',    state.token)
    //console.log('SESSION USER', state.user)
    const saved = await createSession(state.token, state.user.id)
    //console.log('SESSION SAVED', saved)
    setSession(state)
    return state
  }

  const signOut = async ()=>{
    deleteCookie('wallet')
    deleteCookie('address')
    deleteCookie('chain')
    deleteCookie('currency')
    deleteCookie('network')
    deleteCookie('token')
    const state = {..._session}
    state.wallet   = ''
    state.address  = ''
    state.chain    = ''
    state.chainid  = ''
    state.currency = ''
    state.network  = ''
    state.signed   = false
    state.token    = ''
    state.topic    = ''
    state.user     = null
    //console.log('SESSION SIGNOUT', state)
    setSession(state)
    // TODO: delete state in db
    return state
  }

  return {session, signIn, signOut}
}

export {
  Session,
  SessionContext,
  SessionProvider,
  SessionManager
}
