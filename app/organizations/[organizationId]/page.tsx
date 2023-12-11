import Link from 'next/link';
import Image from 'next/image';
import StoryCard from '@/components/StoryCard';
import InitiativeCard from '@/components/initiativeCard';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from "@contentful/rich-text-types";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrgStats } from '@/components/ui/org-stats';
import { OrgSocials } from '@/components/ui/org-socials';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import { getOrganizationById, getStoriesByOrganization } from '@/lib/utils/registry'

const dummyImgSrc: string = "https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75";
const dummyOrganization = {
  name: "Food not bombs is good so so good",
  imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IOGGKcmJMYKPkMuimQDLnwHaHv%26pid%3DApi%26h%3D160&f=1&ipt=944cafc6104e904b7776f748ee311ce1318b52ab6ec349dddbdc9f85850f4890&ipo=images",
  address: "www.google.com",
  twitterAddress: "www.twitter.com",
  facebookAddress: "www.facebook.com",
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
            value: "At Food Not Bombs, our mission is to combat hunger and nourish communities through grassroots, direct action. We believe that access to nutritious food is a fundamental human right, and we are committed to addressing the root causes of hunger by repurposing wasted resources. Guided by the principles of social justice, environmental sustainability, and community empowerment, Food Not Bombs strives to create a world where no one goes to bed hungry. We envision a society that values people over profit, prioritizes the well-being of the marginalized, and promotes a sustainable and equitable food system. Our dedicated volunteers work tirelessly to rescue surplus food that would otherwise go to waste and redistribute it to those in need. By transforming surplus into sustenance, we challenge the wasteful practices of our current food system and advocate for systemic change.",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  }
}

export default async function Home(props: any) {
  //console.log('PROPS', props)
  const orgid = props?.params?.organizationId || null
  const organization = await getOrganizationById(orgid) || {}
  const initiatives = organization.initiative || []
  const stories = await getStoriesByOrganization(orgid) || []
  //console.log('ORGANIZATION', organization)
  //console.log('INITIATIVES', initiatives.length)
  //console.log('STORIES', stories.length)

  return (
    <main className="w-full bg-gradient-to-t from-slate-200">
      <div className="relative flex flex-col px-[5%] container pt-24 w-full h-full">

        <div className="relative h-96">
          <Image
            className="absolute -z-1"
            src={organization.image}
            alt="organization image"
            fill style={{ objectFit: 'cover' }}
          />
          <div className="bg-gradient-to-t from-slate-800 to-transparent opacity-50 h-full w-full z-5" />
          <div className="absolute flex flex-row items-center justify-between gap-y-5 w-full w-max-full px-[5%] -translate-y-[80%]">
            <OrganizationAvatar name={organization.name} image={organization.image} avatarProps={{ size: "lg", title: organization.name }} />
            <div className="flex flex-col items-center pb-5 ml-4">
              <Button className="bg-white text-black w-48">Donate</Button>
              {organization.url 
                ? <p className="text-sm font-semibold text-white text-center">
                    in <span className="underline"><Link href={organization?.url ?? 'https://example.com'}>{organization.name}</Link></span>
                  </p>
                : <></>
              }
            </div>
          </div>
        </div>

        <OrgSocials
          className="pt-[25rem] ml-56 pl-[5%] gap-1 lg:gap-3"
          twitterLabel={organization.twitter || 'twitter.com'}
          twitterAddress={organization.twitter || 'twitter.com'}
          facebookLabel={organization.facebook || 'facebook.com'}
          facebookAddress={organization.facebook || 'facebook.com'}
          websiteLabel={organization.url || 'example.com'}
          websiteAddress={organization.url || 'example.com'}
        />

        <div className="pt-20">
          <Tabs defaultValue="about">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="about" className="font-semibold text-md">About</TabsTrigger>
              <TabsTrigger value="stats" className="font-semibold text-md">Stats</TabsTrigger>
            </TabsList>
            <div className="mt-4 py-5 px-7 rounded-md bg-white text-black gap-3">
              <TabsContent value="about">{organization.description}</TabsContent>
              <TabsContent value="stats">
                <OrgStats orgStatProps={{
                  amountRaised: organization.donations || 0,
                  amountTarget: organization.goal || 0,
                  raisedThisMonth: organization.lastmonth || 0,
                  donorCount: organization.donors || 0,
                  institutionalDonorCount: organization.institutions || 0,
                  initiativeCount: organization.initiative?.length || 0
                }}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="pt-10 flex justify-center w-full">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-9 lg:max-w-screen-lg">
            <div className="flex flex-col gap-5 w-full md:w-2/6 min-w-[350px]">
              <p className="text-3xl font-semibold">Initiatives</p>
              {initiatives.map(item=>{
                return <InitiativeCard key={item.id} data={item} />
              })}
            </div>
            <div className="flex flex-col gap-5 md:w-4/6">
              <p className="text-3xl font-semibold">Stories</p>
              {stories.map(item=>{
                return <StoryCard key={item.id} data={item} organization={organization} />
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}