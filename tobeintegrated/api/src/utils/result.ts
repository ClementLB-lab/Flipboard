/**
 * @brief Utility class to represent the result of an operation that may fail
 */
export default class Result<Tdata = any, Terr = string> {
    private _success: boolean = true
    private _error: Terr = null
    private _data: Tdata = null


    /**
     * Creates a new successful Result
     */
    public static success<Tdata = any, Terr = any>(data?: Tdata) {
        let res = new Result<Tdata, Terr>()
        res._success = true
        res._data = data

        return res
    }

    /**
     * Creates a new unsuccessful Result
     */
    public static error<Tdata = any, Terr = any>(err?: Terr) {
        let res = new Result<Tdata, Terr>()
        res._success = false
        res._error = err

        return res
    }


    public isSuccessful(): boolean {
        return this._success
    }

    public getError(): Terr {
        return this._error
    }

    public getData(): Tdata {
        return this._data
    }
}
