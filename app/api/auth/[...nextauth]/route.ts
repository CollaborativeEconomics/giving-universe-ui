import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByWallet, newUser } from '@/lib/utils/registry'
import { UUID } from '@/lib/utils/random'
//import { PrismaAdapter } from "@auth/prisma-adapter"
//import { PrismaClient } from "@prisma/client"

//const prisma = new PrismaClient()

interface Credentials {
  address:  string
  chain:    string
  chainid:  string
  network:  string
  currency: string
}

interface Users {
  id: string
  name?: string
  email?: string
  image?: string
  address?: string
  chain?: string
  chainid?: string
  network?: string
  currency?: string
}

async function getUserByCredentials(credentials:Credentials){
  console.log('CREDS', credentials)
  try {
    let user = await getUserByWallet(credentials?.address||'')
    console.log('USER', user)
    if(!user || user?.error){
      const uuid = UUID()
      const mail = '_' + uuid.substr(0,8) + '@example.com'
      user = {
        created:       (new Date()).toJSON(),
        api_key:       uuid,
        name:          'Anonymous',
        description:   '',
        email:         mail,
        emailVerified: false,
        image:         '',
        inactive:      false,
        wallet:        credentials?.address||'',
        wallets: {
          create: [
            {
              chain: credentials?.chain||'',
              address: credentials?.address||''
            }
          ]
        }
      }
      const result = await newUser(user)
      if(!result.id){
        return null
      }
      user.id = result.id
    }
    const info = {
      id:       user?.id,
      name:     user?.name  || 'Anonymous',
      email:    user?.email || 'test@example.com',
      image:    user?.image || '/media/nopic.png',
      address:  credentials?.address||'',
      chain:    credentials?.chain||'',
      chainid:  credentials?.chainid||'',
      network:  credentials?.network||'',
      currency: credentials?.currency||''
    }
    return info
  } catch(ex) {
    console.error(ex)
    return null
  }
}

const credentials = {
  //id:      {label:'id',     type:'text'},
  address:  {label:'address', type:'text'},
  chain:    {label:'chain',   type:'text'},
  chainid:  {label:'chainid', type:'text'},
  network:  {label:'network', type:'text'},
  currency: {label:'currency',type:'text'}
}

const providers = [
  CredentialsProvider({
    id: 'Arbitrum',
    name: 'Arbitrum - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Arbitrum', credentials)
        const user = await getUserByCredentials(credentials)
        //const user = {id:123, chain:'test'}
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Avalanche',
    name: 'Avalanche - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Avalanche', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Base',
    name: 'Base - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Base', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Binance',
    name: 'Binance - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Binance', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Celo',
    name: 'Celo - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Celo', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'EOS',
    name: 'EOS - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-EOS', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Ethereum',
    name: 'Ethereum - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Ethereum', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'EthereumUSDC',
    name: 'Ethereum (USDC) - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-EthereumUSDC', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'EthereumUSDT',
    name: 'Ethereum (USDT)- Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-EthereumUSDT', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Filecoin',
    name: 'Filecoin - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Filecoin', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Flare',
    name: 'Flare - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Flare', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Optimism',
    name: 'Optimism - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Optimism', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Polygon',
    name: 'Polygon - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Polygon', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'Stellar',
    name: 'Stellar - Lobstr',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-Stellar', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'XRPL',
    name: 'XRPL - Xaman',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-XRPL', credentials)
        const user = await getUserByCredentials(credentials)
        return user
      } catch (e) {
        return null
      }
    },
  }),
  CredentialsProvider({
    id: 'XinFin',
    name: 'XinFin - Metamask',
    credentials,
    authorize: async (credentials:any) => {
      try {
        console.log('-XinFin', credentials)
        const user = await getUserByCredentials(credentials)
        return user
        //return {id:credentials.address}
      } catch (e) {
        return null
      }
    },
  })
]

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// https://next-auth.js.org/configuration/providers/oauth
const authOptions: NextAuthOptions = {
  //adapter: PrismaAdapter(prisma),
  //adapter: MyAdapter(),
  pages: {
    signIn: '/signin'
  },
  providers,
  callbacks: {
    //async signIn(args) {
    //  console.log('LGN----', args)
    //  const { user, account, credentials } = args
    //  // Stuff with user, account, credentials:{csrfToken}
    //  return true
    //},
    async jwt(args) {
      //console.log('JWT----', args)
      const { token, user, account, profile, isNewUser, trigger, session } = args
      if(account){
        token.userid   = account?.providerAccountId || ''
        token.address  = user?.address  || ''
        token.chain    = account?.provider || ''
        token.chainid  = user?.chainid  || ''
        token.network  = user?.network  || ''
        token.currency = user?.currency || ''
        //token.image    = user?.image    || ''
        //token.name     = user?.name     || ''
        //token.email    = user?.email    || ''
      }
      if(trigger=='update' && session){
        token.name    = session?.name  || ''
        token.email   = session?.email || ''
        token.picture = session?.image || '/media/nopic.png'
        //token.image   = session?.image || '/media/nopic.png'
      }
      return token
    },
    async session(args) {
      //console.log('SSN----', args)
      const { session, token, user } = args
      // Send properties to the client
      session.userid     = (token?.userid   as string) || ''
      session.address    = (token?.address  as string) || ''
      session.chain      = (token?.chain    as string) || ''
      session.chainid    = (token?.chainid  as string) || ''
      session.network    = (token?.network  as string) || ''
      session.currency   = (token?.currency as string) || ''
      if(!session?.user) { session.user = {} }
      session.user.name  = (token?.name     as string) || ''
      session.user.email = (token?.email    as string) || ''
      session.user.image = (token?.picture  as string) || ''
      //session.decimals = (token?.decimals as string) || ''
      //session.wallet = (token?.wallet as string) || ''
      //console.log('SXN----', session)
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
