interface SetCookieOptions {
    path?: string
    expires?: Date | string
    maxAge?: number
    domain?: string
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
}

export function setCookie(
    name: string,
    value: string,
    options: SetCookieOptions = {}
) {
    options = {
        path: '/',
        ...options,
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (const optionKey of Object.keys(options) as Array<
        keyof SetCookieOptions
    >) {
        if (optionKey === 'maxAge') {
            updatedCookie += '; Max-Age=' + options[optionKey]
        } else {
            updatedCookie += '; ' + optionKey
            const optionValue = options[optionKey]
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue
            }
        }
    }

    document.cookie = updatedCookie
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') +
                '=([^;]*)'
        )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export function deleteCookie(name: string) {
    setCookie(name, '', {
        maxAge: -1,
    })
}
