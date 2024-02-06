'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { InputWithContent } from './ui/input-with-content'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { CheckboxWithText } from './ui/checkbox'
import { DonationFormSelect } from './DonationFormSelect'
import { Separator } from './ui/separator'
import { Dictionary, getChainWallets, getChainsList, getChainsMap } from '@/lib/chains/utils'
import Chains from '@/lib/chains/client/apis'
import getRates from '@/lib/utils/rates'

export default function DonationForm(props:any) {
  //console.log('Props', props)
  const initiative = props.initiative
  const organization = initiative.organization

  function $(id:string){ return document.getElementById(id) as HTMLInputElement }

  function validEmail(text:string){
    return text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  }

  function getWalletByChain(wallets:[any], chain:string){
    for(let i=0; i<wallets.length; i++){
      if(wallets[i].chain==chain){
        return wallets[i]
      }
    }
    return null
  }

  async function sendReceipt(data:any){
    console.log('Sending receipt...', data)
    try {
      const opts = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(data)
      }
      const response = await fetch('/api/receipt', opts)
      console.log('Receipt sent')
      const result = await response.json()
      console.log('Result', result)
      return {success:true}
    } catch(ex:any) {
      console.warn('Error sending receipt', ex)
      return {success:false, error:ex.message}
    }
  }

  async function mintNFT(chain:string, txid:string, address:string, itag:string){
    console.log('Minting NFT in', chain, txid, itag)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({chain, txid, itag})
    }
    const response = await fetch('/api/nft/mint', options)
    //console.log('Minting response', response)
    const result = await response.json()
    console.log('>>>Result', result)
    if (!result.success) {
      console.error('Error', result.error)
      setMessage('Error minting NFT')
      return {success:false, error:'Error minting NFT'}
    }

    // Offer only for XRPL
    if(chain=='XRPL'){
      const offer = await createOffer(result.tokenId, address)
      if(offer.success){
        acceptOffer(offer.offerId, address, txid, result.tokenId, result.image, result.metadata)
      }
    } else {
      setMessage(`NFT minted successfully • <a href="${result.image}" target="_blank">Image</a> • <a href="${result.metadata}" target="_blank">Meta</a>`)
      return result
    }
  }

  // Offer only for XRPL
  async function createOffer(tokenid:string, address:string){
    setMessage('Generating NFT offer, wait a moment...')
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({chain:'XRPL', tokenid, address})
    }
    const response = await fetch('/api/nft/offer', options)
    //console.log('Offer response', response)
    if (!response) {
      console.log('No offer response')
      return { success:false, error: 'Error creating sell offer' }
    }
    const result = await response.json()
    console.log('Offer result', result)
    return result
  }

  async function acceptOffer(offerid:string, address:string, txid:string, tokenId:string, image:string, metadata:string){
    setMessage('Check your Xaman wallet events for NFT offer and sign it')
    Chains['XRPL'].acceptSellOffer(offerid, address, (result:any)=>{
      console.log('RESULT', result)
      if(result?.error){
        console.log('Error accepting offer', result.error)
        setMessage('Error accepting offer')
        return {success:false, error:'Error accepting offer'}
      }
      if(result?.success==false){
        console.log('Offer rejected')
        setMessage('Offer rejected by user')
        return {success:false, error:'Offer rejected by user'}
      }
      setMessage('NFT minted successfully')
      //setMessage(`NFT minted successfully • <a href="${result.image}" target="_blank">Image</a> • <a href="${result.metadata}" target="_blank">Meta</a>`)
      //router.push(`/donation_confirmation?ok=true&chain=${chain}&txid=${txid}&nft=true&nftid=${encodeURIComponent(tokenId)}&urinft=${encodeURIComponent(image)}&urimeta=${encodeURIComponent(metadata)}`)
    })
  }

  async function donate(){
    const chainName = currentChain
    const chainInfo = chainLookup[chainName]
    const wallet    = currentWallet.value
    const currency  = chainInfo?.symbol || ''
    const amount    = $('amount')?.value || '0'
    const name      = $('name-input')?.value || ''
    const email     = $('email-input')?.value || ''
    const receipt   = $('receipt-check')?.dataset.state=='checked'
    const mintnft   = $('mintnft-check')?.dataset.state=='checked'
    console.log('FORM --------')
    console.log('Chain:',    chainName)
    console.log('Currency:', currency)
    console.log('Wallet:',   wallet)
    console.log('Amount:',   amount)
    console.log('Name:',     name)
    console.log('Email:',    email)
    console.log('Receipt:',  receipt)
    console.log('MintNFT:',  mintnft)
    
    // Validate required data
    if(!parseInt(amount)){
      setMessage('Enter a valid amount')
      return
    }
    if(receipt && !validEmail(email)){
      setMessage('Enter a valid email')
      return
    }

    // TODO: Donate and mint
    //setButtonText('WAIT')
    //setDisabled(true)
    setMessage('Sending payment, wait a moment...')
    if(chainName=='XRPL'){
      setMessage('Sign payment in your Xaman wallet events')
    } else if(chainName=='Stellar'){
      setMessage('Approve payment in your Freighter wallet')
    } else {
      setMessage('Approve payment in your wallet')
    }

    const chainText = chainName.startsWith('Ethereum') ? 'Ethereum' : chainName
    const orgwallet = getWalletByChain(organization?.wallets, chainText)
    console.log('Org wallet', orgwallet)
    if(!orgwallet || !orgwallet?.address){
      console.log('Error sending payment, no wallet found for chain', chainName)
      setMessage('Error: no wallet in this organization for ' + chainName)
      return
    }
    const address = orgwallet.address
    const sdk = Chains[chainName]
    if(!sdk){
      console.log('Error sending payment, blockchain not implemented', chainName)
      setMessage('Error: '+ chainName+' blockchain not implemented')
      return
    }
    const destinationTag = initiative.tag
    // TODO: if amount in USD convert by coin rate
    const rate = await getRates(currency, true) // get from server, CORS sucks 
    //const rate = 0.1 // TODO: get rate by coin
    const amountNum = parseInt(amount)
    const coinValue = showUSD ? amountNum : (amountNum / rate)
    const usdValue  = showUSD ? (amountNum * rate) : amountNum
    const rateMsg   = showUSD 
      ? `USD ${usdValue.toFixed(2)} at ${rate.toFixed(2)} ${currency}/USD` 
      : `${coinValue.toFixed(2)} ${currency} at ${rate.toFixed(2)} ${currency}/USD`
    console.log('AMT', showUSD, coinValue, usdValue)
    setRateMessage(rateMsg)
    sdk.sendPayment(address, coinValue, destinationTag, async (result:any)=>{
      if(result?.error){
        console.log('Error sending payment', result.error)
        setMessage('Error sending payment')
        return
      }
      if(result?.success==false){
        console.log('Payment rejected')
        setMessage('Payment rejected by user')
        //router.push(`/donation_failed`);
        return
      }
      console.log('TXID', result.txid)
      console.log('ADDR', result.address)
      console.log('ORG', organization)
      // TODO: Save donation to DB
      if(receipt){
        console.log('YES receipt...')
        setMessage('Sending receipt, wait a moment...')
        const data = {
          name:     name,
          email:    email,
          org:      organization.name,
          address:  organization.mailingAddress,
          ein:      organization.EIN,
          currency: currency,
          amount:   coinValue.toFixed(2),
          usd:      usdValue.toFixed(2)
        }
        const rec = await sendReceipt(data)
        console.log('Receipt sent', rec)
      }
      if(mintnft){
        setMessage('Minting NFT, wait a moment...')
        setTimeout(async ()=>{
          const minted = await mintNFT(chainName, result.txid, result.address, initiative.tag)
          if(minted?.success){
            setButtonText('DONE')
            setDisabled(true)
            setMessage('Thank you for your donation!')
          }
        }, 2000)
      } else {
        //setButtonText('DONE')
        //setDisabled(true)
        setMessage('Thank you for your donation!')
      }
    })
  }

  const chains = getChainsList()
  const chainLookup = getChainsMap()
  const chainWallets = getChainWallets(chains[0].symbol)

  // TODO: Get rate after chain selected?
  // TODO: currentChain should be currently selected chain in wallet instead of first one
  const [showUSD, toggleShowUSD] = useState(false)
  const [currentChain, setCurrentChain] = useState(chains[0].value || '')
  const [wallets, setWallets] = useState(chainWallets)
  const [currentWallet, setCurrentWallet] = useState(wallets[0])
  const amountInputRef = useRef(null)
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState('Donate')
  const [message, setMessage] = useState('One wallet confirmation required')
  const [rateMessage, setRateMessage] = useState('USD conversion rate')

  //console.log({wallets})
  //console.log({currentChain})
  //console.log({currentWallet})
  
  //const { register, watch, handleSubmit, formState } = useForm({
  //  defaultValues: { amount:0, name: '', email: '', receipt: false, mintnft: false }
  //})
  //const { errors } = formState
  //const [amount, name, email, receipt, mintnft] = watch(['amount', 'name', 'email', 'receipt', 'mintnft'])

  return (
    <div className="flex min-h-full w-full">
      <Card className="py-6 w-full">
        <div className="px-6">
          <Label htmlFor="currency-select" className="mb-2">
            Currency
          </Label>
          <DonationFormSelect
            id="currency-select"
            className="mb-6"
            options={chains}
            currentOption={currentChain ?? ''}
            handleChange={(chain: string) => {
              const chainSymbol = Object.keys(chainLookup).length>0 ? chainLookup[chain].symbol : ''
              const listWallets = getChainWallets(chainSymbol)
              setCurrentChain(chain)
              setWallets(listWallets)
            }}
            placeHolderText="...select a cryptocurrency"
          />
          <Label htmlFor="wallet-select" className="mb-2">
            Wallet
          </Label>
          <DonationFormSelect
            id="wallet-select"
            className="mb-6"
            options={wallets}
            currentOption={currentWallet?.value ?? ''}
            handleChange={(wallet: { value: string; image: string }) =>
              setCurrentWallet(wallet)
            }
            placeHolderText="...select a cryptowallet"
          />
        </div>
        <Separator />
        <div className="px-6">
          <div className="w-full my-6">
            <div className="flex flex-row justify-between items-center mb-2">
              <Label>Amount</Label>{' '}
              <div className="flex flex-wrap">
                <Label htmlFor="show-usd-toggle">USD</Label>
                <Switch
                  id="show-usd-toggle"
                  valueBasis={showUSD}
                  handleToggle={() => {
                    toggleShowUSD(!showUSD)
                  }}
                />
                <Label>{chainLookup[currentChain].symbol}</Label>
              </div>
            </div>
            <div className="my-auto">
              <InputWithContent
                className="pl-4"
                type="text"
                id="amount"
                text={ showUSD ? '| ' + chainLookup[currentChain].symbol : '| USD' }
                divRef={amountInputRef}
              />
            </div>
            <Label className="block mt-2 text-right">{rateMessage}</Label>
          </div>
          <Label htmlFor="name-input" className="mb-2">
            Name (optional)
          </Label>
          <Input type="text" className="pl-4 mb-6" id="name-input" />
          <Label htmlFor="email-input" className="mb-2">
            Email address (optional)
          </Label>
          <Input type="text" className="pl-4 mb-6" id="email-input" />
          <CheckboxWithText
            id="receipt-check"
            text="I'd like to receive an emailed receipt"
            className="mb-2"
          />
          <CheckboxWithText
            id="mintnft-check"
            text="I'd like to receive an NFT receipt"
            className="mb-6"
          />
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-center">
          <Button disabled={disabled} className="mt-6 mx-6 w-[250px] h-[50px] bg-blue-600 text-white text-lg outline outline-slate-300 outline-1 hover:bg-blue-700 hover:shadow-inner" onClick={donate}>
            {buttonText}
          </Button>
          <p className="mt-2 text-sm">{message}</p>
        </div>
      </Card>
    </div>
  )
}
