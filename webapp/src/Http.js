export default class Http
{
    SERVER_URL = "http://localhost:8080";
    
    async get(url, params = {})
    {
        const opts = {
            method: "get",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        };
        let res;

        try {
            res = await fetch(this.SERVER_URL + url, opts);
            return (res.json());
        }
        catch (err) {
            return (err);
        }
    }
}