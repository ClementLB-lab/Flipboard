type JwtToken = string

export function getAuthToken(req: Express.Request) {
    return req.session.authToken
}

export function setAuthToken(req: Express.Request, token: JwtToken) {
    req.session.authToken = token
}
