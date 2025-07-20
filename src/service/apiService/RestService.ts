export default class RestService {
    private authorized: boolean = false;
    private authorizedId: string;

    constructor(authId: string){
        this.authorizedId = authId;
    }

    public setAuthorizedId(authId: string){
        this.authorizedId = authId
    }

    public setAuthorized(authorized: boolean){
        this.authorized = authorized
    }

    public getAuthorized(): boolean {
        return this.authorized
    }

    private getHeaders(): HeadersInit{
        return {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${this.authorizedId}`
        }
    }

    public async processInvoice(){
        const res = await fetch("/api/invoice", {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify("")
        })
        if (!res.ok) throw new Error(`POST api/invoice failed: ${res.status}`)
        return res.json()
    }
}