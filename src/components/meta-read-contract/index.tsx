import { ethers } from 'ethers';
import React, { useState } from 'react'
import { ERC20ABI } from '../../contracts/ERC20ABI/ERC20ABI';

declare var window: any;

interface Contract {
    address: string;
    tokenName: string;
    tokenSymbol: string;
    totalSupply: string;
    deployedAt?: string;
  }

export default function MetaReadContract() {

    const [contractInfo, setContractInfo] = useState<Contract>({
        address: "-",
        tokenName: "-",
        tokenSymbol: "-",
        totalSupply: "-",
      });
      const [balanceInfo, setBalanceInfo] = useState({
        address: "-",
        balance: "-",
      });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const erc20 = new ethers.Contract(
      data.get("addr")?.toString()!,
      ERC20ABI,
      provider
    );

    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    console.log(tokenName);

    setContractInfo({
      address: data.get("addr")?.toString()!,
      tokenName,
      tokenSymbol,
      totalSupply,
    });
  };

  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(
      contractInfo.address,
      ERC20ABI,
      provider
    );
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance),
    });
  };
    return (

      <div>
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Read from smart contract
            </h1>
            <div className="">
              <div className="my-3">
                <input
                  type="text"
                  name="addr"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="ERC20 contract address"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Get token info
            </button>
          </footer>
          <div className="px-4">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Total supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{contractInfo.tokenName}</th>
                    <td>{contractInfo.tokenSymbol}</td>
                    <td>{String(contractInfo.totalSupply)}</td>
                    <td>{contractInfo.deployedAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={getMyBalance}
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Get my balance
            </button>
          </div>
          <div className="px-4">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{balanceInfo.address}</th>
                    <td>{balanceInfo.balance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
    )
}