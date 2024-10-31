const ACCESS_TOKEN = 'marketplace:v1:accessToken'

export function useSessionStorage() {
  function getSessionToken() {
    const token = sessionStorage.getItem(ACCESS_TOKEN)
    return token
  }

  function setSessionToken(token: string) {
    sessionStorage.setItem(ACCESS_TOKEN, token)
  }

  return {
    getSessionToken,
    setSessionToken
  }
}
