import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table"
import StoryCardCompact from '@/components/StoryCardCompact'
import DonationsSwitch from '@/components/DonationsSwitch'
import { getUserById, getNFTsByAccount} from '@/lib/utils/registry'

// TODO: REMOVE WHEN READY
const favorgs = [
  {id:101, name:'CFCE', image:'https://ipfs.filebase.io/ipfs/QmTJ1XysvrAvVCRWTYvaDd839Rdj2KMnqN9AQGs26HDLyh'},
  {id:102, name:'Public Node', image:'https://ipfs.filebase.io/ipfs/QmfUK8dZNrZUqJTLAuaSJ37bmWpMQ2NfJ8JQbvXEkSGrtN'},
  {id:103, name:'La Tigra', image:'https://ipfs.filebase.io/ipfs/QmRXq65J5gCcVoFDsXHBuafuoTubvJVHyEnZhgH9KbDM6g'},
]

const badges = [
  {id:101, name:'cat1', image:'/categories/sdg06.png'},
  {id:102, name:'cat2', image:'/categories/sdg13.png'},
  {id:103, name:'cat3', image:'/categories/sdg16.png'},
  {id:104, name:'cat4', image:'/categories/sdg10.png'},
  {id:105, name:'cat5', image:'/categories/sdg17.png'}
]

const stories = [
  {"id":"f3ace58b-d9d3-42b7-af7d-b53893cb894b","created":"2023-10-19T18:19:04.595Z","inactive":false,"organizationId":"066509a2-c40d-4f8b-863a-574a39a9953f","initiativeId":"1b773d96-b641-4c7d-a874-afda7f9742f0","name":"Meal preparation for community","description":"Preparing food in the local kitchen to support the community","amount":0,"image":"https://ipfs.filebase.io/ipfs/QmZ9cVVJdrRN2k4EAfAZwASeQSjDEqAT7tT2SaF5XnmC7R","tokenId":"0x653173198829f3706b4ed04b","metadata":"ipfs:QmbrThESVfnoyebvZini5fH8MU2rG7hnHRwtJ4KQ1bNmUm","organization":{"id":"066509a2-c40d-4f8b-863a-574a39a9953f","created":"2023-11-29T14:43:35.079Z","inactive":false,"slug":"barichara","EIN":"","country":"Colombia","description":"Our mission is to lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat","image":"https://ipfs.filebase.io/ipfs/QmTWVCp8NewcVfGYUbUaJUcPenKgoZGF8GqtFP948rEJwR","mailingAddress":"","name":"Barichara","phone":"","email":"test@gmail.com","url":"https://example.com/barichara","twitter":null,"facebook":null,"categoryId":"29fafb04-d8b9-4c8d-a3d8-c884c2e94e69","featured":false,"donors":4560,"institutions":35,"donations":45600,"lastmonth":10250,"goal":100000},"initiative":{"id":"1b773d96-b641-4c7d-a874-afda7f9742f0","created":"2023-11-29T15:30:07.574Z","inactive":false,"slug":"feed_indigenous_people","organizationId":"066509a2-c40d-4f8b-863a-574a39a9953f","chapterId":null,"categoryId":null,"title":"Feed indigenous people","description":"Feed indigenous people in the Barichara reservations","defaultAsset":"https://ipfs.filebase.io/ipfs/QmTWVCp8NewcVfGYUbUaJUcPenKgoZGF8GqtFP948rEJwR","imageUri":null,"start":"2023-10-19T00:00:00.000Z","finish":"2024-01-01T00:00:00.000Z","tag":66885521,"contract":"CDHGVKFRG7CFXVKTZGNM7VKEQWZDBLH733FD6AD3SN7JZIRZSHZM5Q2S","wallet":null,"country":"Colombia","donors":54,"institutions":2,"goal":120000,"donations":95000,"lastmonth":2450}},
  {"id":"22c64b93-f893-44aa-acf7-d70dfb21f6cb","created":"2023-10-19T18:17:54.527Z","inactive":false,"organizationId":"066509a2-c40d-4f8b-863a-574a39a9953f","initiativeId":"1b773d96-b641-4c7d-a874-afda7f9742f0","name":"Kids help prepare communal meal","description":"Fresh local vegetables being put towards a good cause","amount":0,"image":"https://ipfs.filebase.io/ipfs/QmawwBysMb94dAKqUfn4wgZL26hoxC6SrVqHjjUAySwtPk","tokenId":"0x653172d38829f3706b4ed04a","metadata":"ipfs:QmUaUndAxzGsHsv712ATLXuZhU4Lq98TixpuWH5JUR13qR","organization":{"id":"066509a2-c40d-4f8b-863a-574a39a9953f","created":"2023-11-29T14:43:35.079Z","inactive":false,"slug":"barichara","EIN":"","country":"Colombia","description":"Our mission is to lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat","image":"https://ipfs.filebase.io/ipfs/QmTWVCp8NewcVfGYUbUaJUcPenKgoZGF8GqtFP948rEJwR","mailingAddress":"","name":"Barichara","phone":"","email":"test@gmail.com","url":"https://example.com/barichara","twitter":null,"facebook":null,"categoryId":"29fafb04-d8b9-4c8d-a3d8-c884c2e94e69","featured":false,"donors":4560,"institutions":35,"donations":45600,"lastmonth":10250,"goal":100000},"initiative":{"id":"1b773d96-b641-4c7d-a874-afda7f9742f0","created":"2023-11-29T15:30:07.574Z","inactive":false,"slug":"feed_indigenous_people","organizationId":"066509a2-c40d-4f8b-863a-574a39a9953f","chapterId":null,"categoryId":null,"title":"Feed indigenous people","description":"Feed indigenous people in the Barichara reservations","defaultAsset":"https://ipfs.filebase.io/ipfs/QmTWVCp8NewcVfGYUbUaJUcPenKgoZGF8GqtFP948rEJwR","imageUri":null,"start":"2023-10-19T00:00:00.000Z","finish":"2024-01-01T00:00:00.000Z","tag":66885521,"contract":"CDHGVKFRG7CFXVKTZGNM7VKEQWZDBLH733FD6AD3SN7JZIRZSHZM5Q2S","wallet":null,"country":"Colombia","donors":54,"institutions":2,"goal":120000,"donations":95000,"lastmonth":2450}},
  {"id":"72c491e6-b18f-4217-aafe-03fef8aac090","created":"2023-10-19T18:14:55.075Z","inactive":false,"organizationId":"066509a2-c40d-4f8b-863a-574a39a9953f","initiativeId":"1b773d96-b641-4c7d-a874-afda7f9742f0","name":"Creating shelter for the homeless","description":"Building housing for the disadvantaged with local sustainable practices","amount":0,"image":"https://ipfs.filebase.io/ipfs/QmT7xPsu7aoSRKDxBhoN4AoKTsmKHQkY5DC3cBGrUn66Rw","tokenId":"0x653172208829f3706b4ed049","metadata":"ipfs:QmTLpaeGUEoSeWtAyRUF6HbhMjeJ7ibPKTmce25DGn8c2w","organization":{"id":"066509a2-c40d-4f8b-863a-574a39a9953f","created":"2023-11-29T14:43:35.079Z","inactive":false,"slug":"barichara","EIN":"","country":"Colombia","description":"Our mission is to lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat","image":"https://ipfs.filebase.io/ipfs/QmTWVCp8NewcVfGYUbUaJUcPenKgoZGF8GqtFP948rEJwR","mailingAddress":"","name":"Barichara","phone":"","email":"test@gmail.com","url":"https://example.com/barichara","twitter":null,"facebook":null,"categoryId":"29fafb04-d8b9-4c8d-a3d8-c884c2e94e69","featured":false,"donors":4560,"institutions":35,"donations":45600,"lastmonth":10250,"goal":100000},"initiative":{"id":"1b773d96-b641-4c7d-a874-afda7f9742f0","created":"2023-11-29T15:30:07.574Z","inactive":false,"slug":"feed_indigenous_people","organizationId":"066509a2-c40d-4f8b-863a-574a39a9953f","chapterId":null,"categoryId":null,"title":"Feed indigenous people","description":"Feed indigenous people in the Barichara reservations","defaultAsset":"https://ipfs.filebase.io/ipfs/QmTWVCp8NewcVfGYUbUaJUcPenKgoZGF8GqtFP948rEJwR","imageUri":null,"start":"2023-10-19T00:00:00.000Z","finish":"2024-01-01T00:00:00.000Z","tag":66885521,"contract":"CDHGVKFRG7CFXVKTZGNM7VKEQWZDBLH733FD6AD3SN7JZIRZSHZM5Q2S","wallet":null,"country":"Colombia","donors":54,"institutions":2,"goal":120000,"donations":95000,"lastmonth":2450}},
]

function coinFromChain(chain){
  return {
    'Avalanche':'avax',
    'Binance'  :'bnb',
    'Celo'     :'celo',
    'Ethereum' :'eth',
    'Flare'    :'flr',
    'Polygon'  :'matic',
    'Stellar'  :'xlm',
    'XRPL'     :'xrp',
    'XinFin'   :'xdc',
  }[chain]
}
export default async function Profile(props: any) {
  // TODO: Get from auth session
  const userid = '910a21eb-d9b9-43a2-ada8-127069188d92'
  const user = await getUserById(userid)
  const nfts = await getNFTsByAccount(userid) || []

  if(!user){
    return (
      <main className="flex min-h-screen flex-col items-stretch container py-24">
        <h1 className="m-4">User not found</h1>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-stretch container py-24">
      <div className="flex flex-row justify-between">

        {/* Avatar */}
        <div className="border rounded-md p-8 w-1/3">
          <div className="flex flex-row flex-start items-center rounded-full">
            <img className="mr-8 rounded-full" src={user.image} width={100} height={100}></img>
            <h1 className="font-bold text-lg">{user.name}</h1>
          </div>
        </div>

        {/* Empty */}
        <div className="p-4 w-1/3">&nbsp;</div>

        {/* Chains */}
        <div className="flex flex-col items-center border rounded-md p-4 w-1/3">
          {user.wallets ? (
            <>
              <h1>Active Chains</h1>
              <div className="mt-4">
              {user.wallets.map(item=>{
                return (
                  <span key={item.id}>
                    <img src={'/coins/' + (coinFromChain(item.chain)||'none') + '.png'} width={48} height={48} />
                  </span>
                )
              })}
              </div>
              <button className="block w-2/3 mt-4 mx-auto py-1 px-8 bg-red-400 text-white rounded-full">Connect Wallet</button>
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
        <div className="w-1/4 pr-8">
          
          {/* Fav Orgs */}
          <h1 className="text-2xl font-medium">Favorite Organizations</h1>
          <div className="grid grid-cols-4 gap-2 mb-8">
            {favorgs.map(item=>{
              return (
                <div key={item.id} className="flex flex-col justify-start items-center content-center mt-4">
                  <img className="rounded-full mb-1" src={item.image} width={64} height={64} />
                  <h1 className="text-sm text-center">{item.name}</h1>
                </div>
              )
            })}
          </div>
          
          {/* Badges */}
          <h1 className="text-2xl font-medium mb-4">Badges</h1>
          <div className="grid grid-cols-4 gap-2 mb-8">
            {badges.map(item=>{
              return (<img key={item.id} className="mr-1" src={item.image} width={72} height={72} />)
            })}
          </div>

          {/* Stories */}
          <h1 className="text-2xl font-medium">Recent Stories</h1>
          <div className="">
            {stories.map(item=>{
              return (
                <div className="my-4" key={item.id}>
                  <StoryCardCompact />
                </div>
              )
            })}
          </div>

        </div>

        {/* Table */}
        <div className="w-3/4">
          <h1 className="text-2xl font-medium mb-4">Donation Data</h1>
          {/* TODO: nft/receipt buttons */} {/* TODO: view icons */}
          <DonationsSwitch />
          <div className="w-full border rounded-md p-10">
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
                {nfts.length ? nfts.map(item=>{
                  const image = item.imageUri.startsWith('ipfs') ? 'https://ipfs.filebase.io/ipfs/'+item.imageUri.substr(5) : item.imageUri
                  return (
                    <TableRow key={item.id}>
                      <TableCell><img src={image} width={64} height={64} /></TableCell>
                      <TableCell>{item.initiative.title}</TableCell>
                      <TableCell>{item.organization.name}</TableCell>
                      <TableCell>{item.coinValue}</TableCell>
                      <TableCell>{item.coinSymbol}</TableCell>
                    </TableRow>
                  )
                }) : (
                  <TableRow>
                    <TableCell className="col-span-5">No donations found</TableCell>
                  </TableRow>
                )}  
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  )
}
