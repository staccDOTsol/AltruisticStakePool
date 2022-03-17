import { Signer, Transaction } from "@solana/web3.js"

export default async function doSign(t: any) : Promise<any>{
    var signed:  any
    for (var m in t.signers){
         (t as Transaction).partialSign(t.signers[m] as Signer)
    }
   
   return t
}