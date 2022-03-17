
import logo from './logo.svg';
import './App.css'; 
import doSign from './doSign.ts'
import { React } from 'react'
import { Signer } from '@solana/web3.js';
import * as solanaStakePool from '@solana/spl-stake-pool';

import { Keypair, sendAndConfirmRawTransaction, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { STAKE_POOL_INSTRUCTION_LAYOUTS,
  STAKE_POOL_PROGRAM_ID,
  DepositSolParams,
  StakePoolInstruction,
  depositSol,
  withdrawSol,
  withdrawStake } from '@solana/spl-stake-pool'

import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Provider, getProvider } from '@project-serum/anchor'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
var dwSol = 0.0138
const sp = new PublicKey("F8h46pYkaqPJNP2MRkUUUtRkf8efCkpoqehn9g1bTTm7")
const WithdrawOneDropletFromSoceanButton = ({theSol}) => {
  const wallet = useWallet();
  const onClick = async () => {
   await solanaStakePool.withdrawStake(connection,sp,
      wallet.publicKey, 
      theSol * LAMPORTS_PER_SOL
    );
  };

  return (
    <button onClick={onClick}>
      Withdraw {theSol}
    </button>
  );
};

const StakeOneLamportWithSoceanButton = ({theSol}) => {

  const wallet = useWallet()
  const mint = new PublicKey('C4kq9QRFLAqwYHK7p4Ez54KMZLZNw2yLsiT3KN4FSmdH')



  const onClick = async () => {
  
  //depositSol(connection: Connection, stakePoolAddress: PublicKey, from: PublicKey, lamports: number, destinationTokenAccount?: PublicKey, referrerTokenAccount?: PublicKey, depositAuthority?: PublicKey): Promise<{
let res = await    depositSol(connection,
sp,
wallet.publicKey,
theSol * LAMPORTS_PER_SOL)/*
'withdrawAuthority': new PublicKey("6X3oVE5Hq923M2UEJregoA7zLxuc2jXcJJegpy24pb2T"),
'reserveStake':  new PublicKey("GYEzowUBH3XeLjke9z38To1HP8T88K1MGaCq7GJYSso7"),
'fundingAccount': ,
'destinationPoolAccount':  new PublicKey("F8h46pYkaqPJNP2MRkUUUtRkf8efCkpoqehn9g1bTTm7"),
'managerFeeAccount': new PublicKey("6X3oVE5Hq923M2UEJregoA7zLxuc2jXcJJegpy24pb2T"),
'poolMint':  mint,
'lamports': ,
'depositAuthority' : new PublicKey("936eLWSCVF4EVZiEDVtBfE5VL5ZieBkdGHvaMTukYk3i")) 
*/
  console.log(res) 
  let t = new Transaction(res)

  t.feePayer = wallet.publicKey;
  t.recentBlockhash = ( await connection.getRecentBlockhash('finalized')
  ).blockhash;
  

    console.log(t)
var signed = await doSign(t)
console.log(signed)
    signed = await wallet.signTransaction(signed)
    console.log(signed)

  
    const signature = await sendAndConfirmRawTransaction(connection,
      signed.serialize(),{preflightCommitment: 'recent', commitment: 'recent'});

console.log(signature)
  };
  
  return  ( <button onClick={onClick}>Stake {theSol} with JarePool</button> )
};

// you can also use a custom rpc endpoint
let connection, c2, pr
 function App() {
   var [dwSol, setDwSol] = useState(0.0138)
  connection = new Connection("https://solana--mainnet.datahub.figment.io/apikey/995d9d62662252c679a6e673fb31b392")
  c2 = useConnection()
 const wallet = useWallet()
 var { publicKey } = useWallet();

pr = new Provider(connection, wallet)
function doSetDwSol(e){
  try{
  setDwSol(parseFloat(e.target.value))
  }
  catch(err){

  }
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <WalletMultiButton />
                  <WalletDisconnectButton />
                  <br /> 
                  <br /> 
                  Sol to deposit/withdraw: <br />
                  <input type="text" onChange={doSetDwSol} placeholder={0.0138} ></input>
                  <br />
                  <br /> 
        <StakeOneLamportWithSoceanButton theSol={dwSol} />
        <WithdrawOneDropletFromSoceanButton theSol={dwSol} />
      </header>
    </div>
  );
}

export default App;
