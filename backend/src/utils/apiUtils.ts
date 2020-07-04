import request from 'request';

const API_URI = `http://localhost:3001`


export function get(address: string, query?: Object) {
    return new Promise<any>((resolve, reject) => {
        const opt = {
            url: `${API_URI}${address}`,
            qs: query,
        }

        request.get(opt, (err, res, body) => {
            if (err || res.statusCode != 200) {
                if (err)
                    console.warn(`API : GET ${address} : ${err}`)
                else
                    console.warn(`API : GET ${address} : ${res.statusCode} ${res.statusMessage}`)

                reject(res)
            } else
                resolve(JSON.parse(body))
        })
    })
}

export function post(address: string, body?: Object) {
    return new Promise<any>((resolve, reject) => {
        const opt = {
            url: `${API_URI}${address}`,
            json: body
        }

        request.post(opt, (err, res, body) => {
            if (err || res.statusCode != 200) {
                if (err)
                    console.warn(`API : POST ${address} : ${err}`)
                else
                    console.warn(`API : POST ${address} : ${res.statusCode} ${res.statusMessage}`)

                reject(res)
            } else
                resolve(body)
        })
    })
}
