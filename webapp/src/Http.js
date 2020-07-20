export default class Http
{
    constructor(url)
    {
        this.baseUrl = url;
        this.token = sessionStorage.getItem("token");
    }

    async req(method, url, params = undefined)
    {
        const opts = {
            method: method,
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
        return (await this.req("get", url));
    }
    async post(url, params)
    {
        return (await this.req("post", url, params));
    }
    setToken(token)
    {
        if (!token)
            sessionStorage.removeItem("token");
        else
            sessionStorage.setItem("token", token);
        this.token = token;
        return (this);
    }
    get isConnected()
    {
        return (this.token !== undefined)
    }
}