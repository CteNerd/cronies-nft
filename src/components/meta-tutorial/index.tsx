import React, { useState, useEffect, FormEvent } from "react";
import "./meta-payment.css";
import { ethers } from "ethers";
import {ERC20ABI} from '../../contracts/ERC20ABI/ERC20ABI'
import MetaTransfer, {Tranx } from '../meta-transfer'
import MetaReadContract from "../meta-read-contract";

declare var window: any;

interface Contract {
  address: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
  deployedAt?: string;
}

export default function MetaTutorial() {
  const [txs, setTxs] = useState(Array<Tranx>());
  const [contractListened, setContractListened] =
    useState<ethers.Contract | null>(null);
  const [error, setError] = useState();
  const [contractInfo, setContractInfo] = useState<Contract>({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const erc20 = new ethers.Contract(
        contractInfo.address,
        ERC20ABI,
        provider
      );

      erc20.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount),
          },
        ]);
      });
      setContractListened(erc20);

      return () => {
        if (contractListened) {
          contractListened.removeAllListeners();
        }
      };
    }
  }, [contractInfo.address]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <MetaReadContract />
      <MetaTransfer contractInfoAddress={contractInfo.address} Txs={txs}/>
    </div>
  );
}
