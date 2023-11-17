import OrganizationAvatar from '@/components/OrganizationAvatar';
import StoryCard from '@/components/StoryCard';
import InitiativeCard from '@/components/initiativeCard';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from "@contentful/rich-text-types";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import { OrgStats } from '@/components/ui/org-stats';
import { OrgSocials } from '@/components/ui/org-socials';

const dummyImgSrc: string = "https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75";
const dummyOrganization = {
    name: "Food not bombs",
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

export default function Home() {
    return (
        <main className="w-full bg-gradient-to-t from-slate-200">
            <div className="relative flex min-h-screen flex-col sm:px-[5%] lg:px-0 lg:container pt-24 lg:w-full">

                <div className="relative h-96">
                    <Image
                        className="absolute -z-1"
                        src={dummyImgSrc}
                        alt="IMG BG"
                        fill style={{
                            objectFit: 'cover',
                        }}
                    />
                    <div className="bg-gradient-to-t from-black to-transparent opacity-50 h-full w-full z-5" />
                </div>

                <div className="absolute flex flex-wrap lg:flex-nowrap gap-3 pt-24 lg:pt-60 items-center justify-between pl-[5%] pr-[20%] w-full">
                    <OrganizationAvatar avatarProps={{ size: "lg", title: dummyOrganization.name }} />
                    <div className="flex flex-col items-center pb-5">
                        <Button className="bg-white text-black w-48">Donate</Button>
                        <p className="text-sm font-semibold text-white">
                            in <span className="underline"><a href={dummyOrganization.address}>{dummyOrganization.name}</a></span>
                        </p>
                    </div>
                </div>

                <OrgSocials
                    twitterLabel={dummyOrganization.twitterAddress}
                    twitterAddress={dummyOrganization.twitterAddress}
                    facebookLabel={dummyOrganization.facebookAddress}
                    facebookAddress={dummyOrganization.facebookAddress}
                    websiteLabel={dummyOrganization.address}
                    websiteAddress={dummyOrganization.address}
                />

                <div className="pt-20">
                    <Tabs defaultValue="about">
                        <TabsList className="bg-slate-100">
                            <TabsTrigger value="about" className="font-semibold text-md">About</TabsTrigger>
                            <TabsTrigger value="stats" className="font-semibold text-md">Stats</TabsTrigger>
                        </TabsList>
                        <div className="mt-4 py-5 px-7 rounded-md bg-white text-black gap-3">
                            <TabsContent value="about">{documentToReactComponents(dummyOrganization.descriptionJsonRtf as Document)}</TabsContent>
                            <TabsContent value="stats">
                                <div className="px-6">
                                    <OrgStats orgStatProps={{
                                        amountRaised: dummyOrganization.stats.amountRaised,
                                        amountTarget: dummyOrganization.stats.amountTarget,
                                        raisedThisMonth: dummyOrganization.stats.raisedThisMonth,
                                        donorCount: dummyOrganization.stats.donorCount,
                                        institutionalDonorCount: dummyOrganization.stats.institutionalDonorCount,
                                        initiativeCount: dummyOrganization.stats.initiativeCount,
                                    }}
                                    />
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <div className="pt-10 flex gap-9 w-full">
                    <div className="flex flex-col gap-5 w-2/6">
                        <p className="text-3xl font-semibold">Initiatives</p>
                        <InitiativeCard />
                        <InitiativeCard />
                        <InitiativeCard />
                        <InitiativeCard />
                        <InitiativeCard />
                    </div>
                    <div className="flex flex-col gap-5 w-4/6">
                        <p className="text-3xl font-semibold">Stories</p>
                        <StoryCard />
                        <StoryCard />
                        <StoryCard />
                        <StoryCard />
                        <StoryCard />
                        <StoryCard />
                    </div>
                </div>

            </div>
        </main>
    )
}