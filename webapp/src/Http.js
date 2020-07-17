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
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: method === "post" ? params : undefined,
            credentials: "same-origin"
        };
        let res;

        try {
            res = await fetch(this.baseUrl + url, opts);
            return (res.json());
        }
        catch (err) {
            return ({error: err.toString()});
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