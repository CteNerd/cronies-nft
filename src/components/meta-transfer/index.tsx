import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import TxList from '../meta-transaction-list/TxList';
import {ERC20ABI} from '../../contracts/ERC20ABI/ERC20ABI'

declare var window: any;

interface Props {
    contractInfoAddress: string
    Txs: Array<Tranx>
}

export interface Tranx {
  txHash: string;
  from: string;
  to: string;
  amount: string;
}

export default function MetaTransfer(props: Props) {
useEffect(() => {
    setTxs(props.Txs);
}, [])

    const [txs, setTxs] = useState(Array<Tranx>());

  const handleTransfer = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(
      props.contractInfoAddress,
      ERC20ABI,
      signer
    );
    await erc20.transfer(data.get("recipient"), data.get("amount"));
  };
  
    return (
        <div>

        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Write to contract
            </h1>

            <form onSubmit={handleTransfer}>
              <div className="my-3">
                <input
                  type="text"
                  name="recipient"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Recipient address"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  name="amount"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Amount to transfer"
                />
              </div>
              <footer className="p-4">
                <button
                  type="submit"
                  className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                >
                  Transfer
                </button>
              </footer>
            </form>
          </div>
        </div>
      <div>
        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Recent transactions
            </h1>
            <p>
              <TxList txs={txs} />
            </p>
          </div>
        </div>
    </div>
        </div>
        )
}