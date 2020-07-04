import jwt from 'jsonwebtoken'

const JWT_SIGN_SECRET = "ofinweofnIUWEF013jAFefnjFG0oieg4ON0oin42f4on09gfj098uB32"

export type Token = string

export function getTokenForUser(user: any) : Token {
    return jwt.sign({
        'userId': user.id
    },
        JWT_SIGN_SECRET,
        {
            expiresIn: "1h"
        })
}

/**
 * @return user id or null if no such user exists
 */
export function getUserIdFromToken(token: Token) {
    let jwtToken = null

    if (!token)
        return null
    try {
        jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
    } catch { // will throw if it has expired
        return null
    }

    if (jwtToken === null)
        return null

    return jwtToken.userId
}

export function usePasswordHashToMakeToken(user: any) : Token {
    console.log("sign : createdat : " + user.createdAt)
    const secret = user.passwordHash + "-" + user.createdAt
    return jwt.sign({
        'userId': user.id
    },
        secret,
        {
            expiresIn: 3600 // 1 hour
        })
}

export function decodeToken(user: any, token: Token) {
    let jwtToken = null
    const secret = user.passwordHash + "-" + user.createdAt

    if (!token || !user)
        return null
    try {
        jwtToken = jwt.verify(token, secret)
    } catch {
        return null
    }

    if (jwtToken === null)
        return null

    return jwtToken.userId
};
