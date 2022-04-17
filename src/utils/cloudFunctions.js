import firebase from './firebase'

export async function getUploadUrl () {
  const fn = firebase.functions().httpsCallable('getUploadUrl')
  const result = await fn()
  console.log(result)
  return result.data
}

export async function createTokenMetadata (data) {
  const fn = firebase.functions().httpsCallable('createTokenMetadata')
  const result = await fn(data)
  console.log(result)
  return result.data
}
