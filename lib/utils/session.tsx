import { useState, useEffect, createContext, useContext } from 'react'
import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import { getUserByWallet, newUser, newSession } from './api'
import { UUID } from './random'

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

async function getUserByAddress(address:string){
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

async function createSession(token:string, userId:string){
  const oneYear = nextYear().toJSON()
  const state = {
    sessionToken: token,
    userId: userId,
    expires: oneYear
  }
  const rec = await newSession(state)
  return rec
}

async function createUser(token:string, chain:string, address:string){
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
  const session = {..._session}
  const token = getCookieString('token')
  if(!token){ return session }
  const req = await fetch('api/session?token='+token)
  const res = await req.json()
  if(res?.error){ return session }
  if(res?.success){
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
  return session
}

const SessionContext = createContext([])
 
/*
function SessionProvider(props:any) {
  const children:any = props?.children
  const [session, setSession] = useState(_session)
  useEffect(() => {
    async function getSession(){
      const state = await Session()
      setSession(state)
    }
    getSession()
  },[setSession])

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  )
}
*/

/*
//const session = SessionManager()
const SessionManager = ()=>{
  const [session, setSession] = useContext(SessionContext)
  //console.log('Session Manager', session)

  const signIn = async (wallet:any)=>{
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
    if(!state?.user?.id){
      const created = await createUser(state.token, state.chain, state.address)
      state.user = created
    }
    setCookie('wallet',   state.wallet)
    setCookie('address',  state.address)
    setCookie('chain',    state.chain)
    setCookie('currency', state.currency)
    setCookie('network',  state.network)
    setCookie('token',    state.token)
    const saved = await createSession(state?.token, state?.user?.id || '')
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
    setSession(state)
    // TODO: delete state in db
    return state
  }

  return {session, signIn, signOut}
}
*/

export {
  Session,
  SessionContext,
  //SessionProvider,
  //SessionManager
}
