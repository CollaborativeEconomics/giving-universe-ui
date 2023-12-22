import Image from 'next/image'
import { Image as Picture, Newspaper, LayoutList } from 'lucide-react'
import { ListObject } from '@/components/ui/list-object'
import { coinFromChain } from '@/lib/utils/chain'
import { localDate } from '@/lib/utils/date'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { getUserById, getNFTsByAccount, getDonationsByUser, getFavoriteOrganizations, getUserBadges, getRecentStories } from '@/lib/utils/registry'
import StoryCardCompactVert from '@/components/StoryCardCompactVert'


export default async function Profile(props: any) {
  const userid = props?.params?.userId
  const search = props?.searchParams?.tab || 'receipts'
  //TODO: Get from auth session or pass as url/id
  //const userid = '910a21eb-d9b9-43a2-ada8-127069188d92'
  const user = await getUserById(userid)
  if(!user){
    return (
      <main className="flex min-h-screen flex-col items-stretch container py-24">
        <h1 className="m-4">User not found</h1>
      </main>
    )
  }
  const receipts  = await getNFTsByAccount(userid) || []
  const donations = await getDonationsByUser(userid) || []
  const favorgs   = await getFavoriteOrganizations(userid) || []
  const badges    = await getUserBadges(userid) || []
  const stories   = await getRecentStories(5) || []

  return (
    <main className="flex min-h-screen flex-col items-stretch container py-24">
      <div className="flex flex-row justify-between">

        {/* Avatar */}
        <div className="border rounded-md p-8 w-1/3 bg-white">
          <div className="flex flex-row flex-start items-center rounded-full">
            <Image className="mr-8 rounded-full" src={user.image} width={100} height={100} alt="Avatar" />
            <div className="flex flex-col flex-start items-start rounded-full">
              <h1 className="font-bold text-lg">{user.name}</h1>
              <h2 className="">{user.email}</h2>
            </div>
          </div>
        </div>

        {/* Empty */}
        <div className="p-4 w-1/3">&nbsp;</div>

        {/* Chains */}
        <div className="flex flex-col items-center border rounded-md p-4 w-1/3 bg-white">
          {user.wallets ? (
            <>
              <h1>Active Chains</h1>
              <div className="mt-4 pb-4 w-full border-b">
                {user.wallets.map((item:any)=>{
                  return (
                    <span key={item.id} className="inline-block border rounded-full p-1 mx-1">
                      <Image src={'/coins/' + (coinFromChain(item.chain)||'none') + '.png'} width={48} height={48} alt="Chain" />
                    </span>
                  )
                })}
                <span key={0} className="inline-block border rounded-full p-1">
                  <Image src={'/coins/newcoin.png'} width={48} height={48} alt="New chain" />
                </span>
              </div>
              <button className="block w-2/3 mt-4 mx-auto py-1 px-8 bg-red-400 text-white rounded-full">Log Out</button>
            </>
          ) : (
            <>
              <p>No wallets</p>
              <button>Connect Wallet</button>
            </>
          )}
        </div>
      </div>

      {/* Mid Section */}
      <div className="mt-12 flex flex-row justify-between">

        {/* Sidebar */}
        <div className="w-1/4 mr-12">
          
          {/* Fav Orgs */}
          <h1 className="text-2xl font-medium">Favorite Organizations</h1>
          <div className="grid grid-cols-2 gap-2 mb-8">
            {favorgs.map((item:any)=>{
              const org = item.organization
              return (
                <div key={org.id} className="flex flex-row justify-start items-center content-center mt-4">
                  <Image className="rounded-full mr-1" src={org.image} width={64} height={64} alt="Organization" />
                  <h1 className="text-sm text-center">{org.name}</h1>
                </div>
              )
            })}
          </div>
          
          {/* Badges */}
          <h1 className="text-2xl font-medium mb-4">Badges</h1>
          <div className="grid grid-cols-4 gap-2 mb-8">
            {badges.map((item:any)=>{
              const badge = item.category
              return (<Image key={badge.id} className="mr-1" src={badge.image} width={72} height={72} alt="Badge" />)
            })}
          </div>

          {/* Stories */}
          <h1 className="text-2xl font-medium">Recent Stories</h1>
          <div className="">
            {stories.map((item:any)=>{
              return (
                <div className="my-4" key={item.id}>
                  <StoryCardCompactVert />
                </div>
              )
            })}
          </div>

        </div>

        {/* Table */}
        <div className="w-3/4">
          <h1 className="text-2xl font-medium mb-4">Donation Data</h1>
          <Tabs className="TabsRoot" defaultValue="tab1">
            <div className="flex flex-row justify-between items-center">
              <div className="mb-2">
                <TabsList className="TabsList" aria-label="Donations data">
                  <TabsTrigger className="TabsTrigger" value="tab1">
                    NFTs Receipts
                  </TabsTrigger>
                  <TabsTrigger className="TabsTrigger" value="tab2">
                    My Donations
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex flex-row">
                <Newspaper size={32} className="pr-2 cursor-pointer" />
                <LayoutList size={32} className="pr-2 cursor-pointer" />
                <Picture size={32} className="pr-2 cursor-pointer" />
              </div>
            </div>
            <div className="w-full border rounded-md p-10 bg-white">
              <TabsContent className="TabsContent" value="tab1">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Initiative</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Coin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receipts.length ? receipts.map((item:any)=>{
                      const image = item.imageUri.startsWith('ipfs') ? 'https://ipfs.filebase.io/ipfs/'+item.imageUri.substr(5) : item.imageUri
                      return (
                        <TableRow key={item.id}>
                          <TableCell><Image src={image} width={64} height={64} alt="NFT" /></TableCell>
                          <TableCell>{item.initiative.title}</TableCell>
                          <TableCell>{item.organization.name}</TableCell>
                          <TableCell>{item.coinValue}</TableCell>
                          <TableCell>{item.coinSymbol}</TableCell>
                        </TableRow>
                      )
                    }) : (
                      <TableRow>
                        <TableCell className="col-span-5">No receipts found</TableCell>
                      </TableRow>
                    )}  
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent className="TabsContent" value="tab2">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Initiative</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Coin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.length ? donations.map((item:any)=>{
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{localDate(item.created)}</TableCell>
                          <TableCell>{item.initiative.title}</TableCell>
                          <TableCell>{item.organization.name}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>{coinFromChain(item.chain).toUpperCase()}</TableCell>
                        </TableRow>
                      )
                    }) : (
                      <TableRow>
                        <TableCell className="col-span-5">No donations found</TableCell>
                      </TableRow>
                    )}  
                  </TableBody>
                </Table>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
