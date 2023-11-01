export async function getUserByWallet(address){
  const result = await fetch('/api/user?wallet='+address)
  const data   = await result.json()
  console.log('API USER', data)
  if(!data || data?.error){
    return null
  }
  return data
}

export async function newUser(rec){
  console.log('API NEW USER', rec)
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rec)
  }
  const result = await fetch('/api/user', opts)
  const info   = await result.json()
  console.log('API SAVED USER', info)
  if(!info || info?.error){
    return null
  }
  return info.data
}

export async function newSession(rec){
  console.log('API NEW SESSION', rec)
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rec)
  }
  const result = await fetch('/api/session', opts)
  const info   = await result.json()
  console.log('API SAVED SESSION', info)
  if(!info || info?.error){
    return null
  }
  return info.data
}
