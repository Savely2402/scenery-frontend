import Cookie from 'js-cookie'

const accessTokenName = 'access_token'
const refreshTokenName = 'refresh_token'

const accessTokenExpires = new Date(Date.now() + 5 * 60 * 1000)
const refreshTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

type GetToken = () => string | undefined
type SetToken = (token: string, expires?: number | Date) => void

export const getAccessToken: GetToken = () => Cookie.get(accessTokenName)

export const getRefreshToken: GetToken = () => Cookie.get(refreshTokenName)

export const setRefreshToken: SetToken = (
    refreshToken,
    expires = refreshTokenExpires
) => Cookie.set(refreshTokenName, refreshToken, { expires })

export const setAccessToken: SetToken = (
    accessToken,
    expires = accessTokenExpires
) => Cookie.set(accessTokenName, accessToken, { expires })

export const removeAllTokens: () => void = () =>
    [accessTokenName, refreshTokenName].forEach((tokenName) =>
        Cookie.remove(tokenName)
    )
