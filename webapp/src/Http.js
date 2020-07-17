export default class Http
{
    constructor(url)
    {
        this.baseUrl = url;
        this.token = undefined;
    }

    async req(method, url, params)
    {
        const opts = {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: method === "post" ? JSON.stringify(params) : undefined,
            credentials: "same-origin"
        };
        let res;

        try {
            res = await fetch(this.baseUrl + url, opts);
            return (res.json());
        }
        catch (err) {
            return (new Promise((res, rej) => {
                res({error: err.toString()});
            }));
        }
    }
    
    async get(url)
    {
        return (await this.req("get", url, {}))
    }
    async post(url, params)
    {
        return (await this.req("post", url, params));
    }
    setToken(token)
    {
        this.token = token;
    }
    get isConnected()
    {
        return (this.token !== undefined)
    }
}