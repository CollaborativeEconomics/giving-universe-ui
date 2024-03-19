export interface WalletProvider {
  id: number
  name: string
  symbol: string
  decimals: number
  gasprice: string
  explorer: string
  rpcurl: string
  wssurl?: string
}

export interface Organization {
  id: number
  name: string
  description: string
  defaultAsset: string
  walletProvider: WalletProvider

}

export interface Initiative {
  id?: string;
  title: string;
  description: string;
  defaultAsset: string;
  start: Date;
  end: Date;
  tag: number;
  organizationId: string;
  inactive: boolean;
  imageUri?: string;
  contractnft?: string;
  contractcredit?: string;
  wallet?: string;
  country?: string;
  categoryId?: string;
  donors: number;
  institutions: number;
  goal: number;
  received: number;
  lastmonth: number;
}


export const ReceiptStatus = {
  claim: 'Claim',
  failed: 'Failed',
  minted: 'Minted',
  minting: 'Minting',
  pending: 'Pending',
  rejected: 'Rejected'
}

