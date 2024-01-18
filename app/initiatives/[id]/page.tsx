import StoryCard from '@/components/StoryCard'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import Image from 'next/image'
import OrganizationAvatar from '@/components/OrganizationAvatar'
import Link from 'next/link'
import { getInitiativeById } from '@/lib/utils/registry'
import NFTReceipt, { Status } from '@/components/NFTReceipt'
import DonationForm from '@/components/DonationForm'
import InitiativeCardCompact from '@/components/initiativeCardCompact'
import { Separator } from '@/components/ui/separator'

const initiative = {
  imgSrc:
    'https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75',
  start: 100000,
  donations: 5,
  goal: 50,
  title: 'burning fire',
  description: 'burning a big fire to destroy evil',
  lastmonth: 4000,
  donors: 22,
  institutions: 50,
  amountRaised: 40000,
  amountTarget: 50000,
  name: 'fire starters',
  avatarImg:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IOGGKcmJMYKPkMuimQDLnwHaHv%26pid%3DApi%26h%3D160&f=1&ipt=944cafc6104e904b7776f748ee311ce1318b52ab6ec349dddbdc9f85850f4890&ipo=images',
  key: Math.random(),
}

const initiatives = [initiative, initiative, initiative]

const story = {
  name: 'Food for Pakistan',
  orgName: 'Food not bombs',
  description:
    'These siblings have been displaced, oh no! One is in the pacific, and the other in the atlantic. Alas! How can we rectify this? Leave it to us! Your donations go towards this heart-warming reunion.',
  images: [
    'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  ],
  timestamp: Date.now(),
  address: 'www.google.com',
  imgSrc:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IOGGKcmJMYKPkMuimQDLnwHaHv%26pid%3DApi%26h%3D160&f=1&ipt=944cafc6104e904b7776f748ee311ce1318b52ab6ec349dddbdc9f85850f4890&ipo=images',
}

const stories = [story, story, story, story]

const dummyNFTReceiptProps = {
  status: Status.failed,
  image:
    'https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75',
  organization: {
    name: 'Food not bombs',
    ein: '45-5yu62340u',
    address: '123 Fake St \nBuffalo, NZ 12345',
  },
  date: 123456, //timestamp
  amount: 233.6,
  ticker: ['XRP', 'XDC'],
  amountFiat: 112.3,
  fiatCurrencyCode: 'USD',
  donor: {
    name: 'Evan Hudson',
  },
}

const dummyOrganization = {
  name: 'Food not bombs is good so so good',
  avatarImg:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IOGGKcmJMYKPkMuimQDLnwHaHv%26pid%3DApi%26h%3D160&f=1&ipt=944cafc6104e904b7776f748ee311ce1318b52ab6ec349dddbdc9f85850f4890&ipo=images',
  image:
    'https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75',
  address: 'www.google.com',
  twitterAddress: 'www.twitter.com',
  facebookAddress: 'www.facebook.com',
  stats: {
    amountRaised: 10000,
    amountTarget: 8000,
    donorCount: 50,
    institutionalDonorCount: 1,
    initiativeCount: 2,
    raisedThisMonth: 700,
  },
  descriptionJsonRtf: {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        data: {},
        content: [
          {
            nodeType: 'text',
            value:
              'At Food Not Bombs, our mission is to combat hunger and nourish communities through grassroots, direct action. We believe that access to nutritious food is a fundamental human right, and we are committed to addressing the root causes of hunger by repurposing wasted resources. Guided by the principles of social justice, environmental sustainability, and community empowerment, Food Not Bombs strives to create a world where no one goes to bed hungry. We envision a society that values people over profit, prioritizes the well-being of the marginalized, and promotes a sustainable and equitable food system. Our dedicated volunteers work tirelessly to rescue surplus food that would otherwise go to waste and redistribute it to those in need. By transforming surplus into sustenance, we challenge the wasteful practices of our current food system and advocate for systemic change.',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  },
}

export default async function Home(props: any) {
  console.log('PROPS', props)
  const initid = props?.params?.id || null
  const data = (await getInitiativeById(initid)) || {}
  console.log('INIT', data)

  return (
    <main className="w-full bg-gradient-to-t from-slate-200">
      <div className="relative flex flex-col px-[5%] container pt-24 w-full h-full">
        <div className="flex overflow-hidden mb-4 flex-col md:flex-row">
          <div className="relative w-full md:w-[45%] h-[200px] md:h-[300px] mb-6 md:mb-0">
            <Image
              className="h-[300px]"
              src={dummyOrganization.image}
              alt="IMG BG"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="flex flex-col w-full h-auto">
            <div className="w-auto w-max-full px-[5%] pb-6">
              <OrganizationAvatar
                name={dummyOrganization.name}
                image={dummyOrganization.avatarImg}
                avatarProps={{ size: 'md' }}
              />
            </div>
            <h1 className="px-[5%] text-2xl font-medium pb-4">
              Core operations
            </h1>
            <div className="flex mx-[5%] pb-3 overflow-hidden h-max-[40px]">
              <span className="text-sm overflow-hidden line-clamp-6">
                {documentToReactComponents(
                  dummyOrganization.descriptionJsonRtf as Document
                )}
              </span>
            </div>
            <Link
              className="px-[5%] font-bold hover:underline"
              href="www.google.com"
            >
              See more initiatives...
            </Link>
          </div>
        </div>

        <Separator className='mb-6' />

        <div className="md:flex md:flex-col items-center">
          <div className="flex flex-wrap lg:flex-nowrap gap-12 items-start">
            <div className="w-full lg:w-[60%]">
              <DonationForm />
            </div>
            <div className="lg:w-[40%]">
              <NFTReceipt data={dummyNFTReceiptProps} />
            </div>
          </div>
        </div>

        <div className="pt-10 flex justify-center w-full">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-9 xl:max-w-screen-xl">
            <div className="flex flex-col gap-5 w-full md:w-2/6 min-w-[400px]">
              <p className="text-3xl font-semibold">Other Initiatives</p>
              {initiatives?.length > 0 ? (
                initiatives.map((item: any) => (
                  <InitiativeCardCompact
                    key={item.key}
                    imgSrc={item.imgSrc}
                    title={item.title}
                    description={item.description}
                    amountRaised={item.amountRaised}
                    amountTarget={item.amountTarget}
                    avatarImg={item.avatarImg}
                  />
                ))
              ) : (
                <h1 className="m-4">No initiatives found</h1>
              )}
              <Link href="google.com">
                <h3 className="text-2xl font-semibold hover:underline">
                  More...
                </h3>
              </Link>
            </div>
            <div className="flex flex-col gap-5 md:w-4/6">
              <p className="text-3xl font-semibold">Stories</p>
              {stories?.length > 0 ? (
                stories.map((item: any) => (
                  <StoryCard
                    key={Math.random()}
                    name={item.name}
                    imgSrc={item.imgSrc}
                    address={item.address}
                    timestamp={item.timestamp}
                    description={item.description}
                    images={item.images}
                  />
                ))
              ) : (
                <h1 className="m-4">No initiatives found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
