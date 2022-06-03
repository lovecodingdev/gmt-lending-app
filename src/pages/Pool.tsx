import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import landing_bg_left from "../assets/svg/land.svg";
import brand from "../assets/svg/brand.svg";
import github_black from "../assets/svg/github-black.svg";
import discord_black from "../assets/svg/discord-black.svg";
import twitter_black from "../assets/svg/twitter-black.svg";
import exchange from "../assets/svg/exchange.svg";

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import {SolendAction, SolendReserve, SolendObligation, SolendMarket} from "../solend"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { BN } from 'bn.js';

const GMT_LENGING_MARKET = new PublicKey("GmyaXZ92dK3p84CuHJLJdWa6iiyEXE8kuoj8V6WFucQZ")

const TabHeader:FC<{ activeTab: string, onSelect: (tab: string)=>void }> = ({ activeTab, onSelect }) => {
  return (
    <div className="custom-cart-header">
      <div className={"custom-cart-tab " + (activeTab=="supply"?"active":"")}>
        <a onClick={()=>onSelect("supply")}>Supply</a>
      </div>
      <div className={"custom-cart-tab " + (activeTab=="borrow"?"active":"")}>
        <a onClick={()=>onSelect("borrow")}>Borrow</a>
      </div>
      <div className={"custom-cart-tab " + (activeTab=="withdraw"?"active":"")}>
        <a onClick={()=>onSelect("withdraw")}>Withdraw</a>
      </div>
      <div className={"custom-cart-tab " + (activeTab=="repay"?"active":"")}>
        <a onClick={()=>onSelect("repay")}>Repay</a>
      </div>
    </div>
  )
}
const TabFooter = () => {
  return (
    <div className="cart-list custom-cart-footer">
      <div className="wallet-amount">
        <span>0</span>
        &nbsp;GMT in wallet
      </div>
      <div className="borrow-amount">
        <span>0</span>
        &nbsp;GMT borrowed
      </div>
    </div>
  )
}

const ActionTab:FC<{ action: string }> = ({action}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [ solendMarket, setSolendMarket ] = useState<SolendMarket>();
  const [ obligation, setObligation ] = useState<SolendObligation>();
  const [ balance, setBalance ] = useState(0);
  const [ isMore, setIsMore ] = useState(false);
  const [ signature, setSignature ] = useState("");

  useEffect(()=>{
    SolendMarket.initialize(
      connection,
      "devnet", // optional environment argument
      "GmyaXZ92dK3p84CuHJLJdWa6iiyEXE8kuoj8V6WFucQZ" // optional market address (TURBO SOL). Defaults to 'Main' market
    ).then(sm=>setSolendMarket(sm));
  }, [connection])

  useEffect(()=>{
    if(!solendMarket || !publicKey) return;
    const fetchObligation = async () => {
      const obligation = await solendMarket.fetchObligationByWallet(publicKey);
      if(obligation){
        console.log(obligation)
        setObligation(obligation);
      }
    }
    fetchObligation();
  }, [solendMarket, publicKey, signature])

  const onSupply = async () => {
    if(publicKey){
      try {
        const solendAction = await SolendAction.buildDepositTxns(
          connection,
          new BN(balance * 10 ** 9),
          "SOL",
          publicKey,
          "devnet",
          GMT_LENGING_MARKET // optional market address (TURBO SOL). Defaults to 'Main' market
        );
        const signature = await solendAction.sendTransactions(sendTransaction); // sendTransaction from wallet adapter or custom
        console.log(signature)
        setSignature(signature)
      } catch (error) {
        console.log(error)        
      }
    }
  }

  const onBorrow = async () => {
    if(publicKey){
      console.log("borrow", balance * 10 ** 6)
      try {
        const solendAction = await SolendAction.buildBorrowTxns(
          connection,
          new BN(balance * 10 ** 6),
          "USDC",
          publicKey,
          "devnet",
          undefined,
          GMT_LENGING_MARKET // optional market address (TURBO SOL). Defaults to 'Main' market
        );
        const signature = await solendAction.sendTransactions(sendTransaction); // sendTransaction from wallet adapter or custom
        console.log(signature)
        setSignature(signature)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onWithdraw = async () => {
    if(publicKey){
      console.log("withdraw")
      try {
        const solendAction = await SolendAction.buildWithdrawTxns(
          connection,
          new BN(balance * 10 ** 9),
          "SOL",
          publicKey,
          "devnet",
          GMT_LENGING_MARKET // optional market address (TURBO SOL). Defaults to 'Main' market
        );
        const signature = await solendAction.sendTransactions(sendTransaction); // sendTransaction from wallet adapter or custom
        console.log(signature)
        setSignature(signature)
      } catch (error) {
        console.log(error)
      }
    }
  }


  const onRepay = async () => {
    if(publicKey){
      console.log("repay")
      try {
        const solendAction = await SolendAction.buildRepayTxns(
          connection,
          new BN(balance * 10 ** 6),
          "USDC",
          publicKey,
          "devnet",
          GMT_LENGING_MARKET // optional market address (TURBO SOL). Defaults to 'Main' market
        );
        const signature = await solendAction.sendTransactions(sendTransaction); // sendTransaction from wallet adapter or custom
        console.log(signature)
        setSignature(signature)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const actions: {[key: string]: any} = {
    "supply": onSupply,
    "borrow": onBorrow,
    "withdraw": onWithdraw,
    "repay": onRepay,
  }

  return (
    <div className="custom-cart-body">
      <hr className="cart-line"/>
      <div className="cart-exchange">
        <div className="input-gmt">
          <input type="text" placeholder="GMT" onChange={e=>setBalance(parseFloat(e.target.value) || 0)}/>
          <a href="" className="btn-max">Max</a>
        </div>
        <a href="" className="transfer">
          <img src={exchange} alt=""/>
        </a>
        <div className="usd-amount">
          <span>0</span>
          USD
        </div>
      </div>
      <div 
        className="custom-btn btn-connect-wallet"
        onClick={actions[action]}
      >
        {action}
      </div>
      <hr className="cart-line"/>
      <div className="cart-list">
        <div>
          <span>User borrow limit</span>
          <span>${obligation?.obligationStats.borrowLimit.toFixed(2)}</span>
        </div>
        <div>
          <span>Utilization</span>
          <span>{((obligation?.obligationStats.borrowUtilization || 0) * 100).toFixed(2)}%</span>
        </div>
        {(action=="supply" || action=="withdraw") &&
          <div>
            <span>Supply APY</span>
            <span>26.97%</span>
          </div>
        }
        {action=="borrow" &&
          <>
            <div>
              <span>Borrow APY</span>
              <span>26.97%</span>
            </div>
            <div>
              <span>Borrow fee</span>
              <span>0.00%</span>
            </div>
          </>
        }
      </div>
      <div className="cart-spec-line">
        <hr className="cart-line"/>
        <a onClick={()=>setIsMore(!isMore)}>More Parameters</a>
      </div>
      {isMore && 
      <>
        <div className="cart-list">
          <div>
            <span>Total deposit</span>
            <span>${obligation?.obligationStats.userTotalDeposit.toFixed(2)}</span>
          </div>
          <div>
            <span>Total borrow</span>
            <span>${obligation?.obligationStats.userTotalBorrow.toFixed(2)}</span>
          </div>
          <div>
            <span>Loan to value (LTV ratio)</span>
            <span>10%</span>
          </div>
          <div>
            <span>Liquidation threshold</span>
            <span>${obligation?.obligationStats.liquidationThreshold.toFixed(2)}</span>
          </div>
          <div>
            <span>Liquidation penalty</span>
            <span>26.97%</span>
          </div>
          <div>
            <span>Max borrow APR</span>
            <span>10%</span>
          </div>
          <div>
            <span>Target borrow APR</span>
            <span>26.97%</span>
          </div>
          <div>
            <span>Target utilization </span>
            <span>10%</span>
          </div>
          <div>
            <span>Current asset utilization </span>
            <span>26.97%</span>
          </div>
        </div>
        <hr className="cart-line"/>
      </>
      }
    </div>
  )
}

const Pool = () => {
  const [activeTab, setActiveTab] = useState("supply");

  return (
    <>
      <div className="modal-header">
        <div className="custom-container">
          <div className="custom-row">
            <Link to="/" className="modal-logo">
              <img src={brand} alt="" />
            </Link>
            <WalletMultiButton className="wallet-address"/>
          </div>
        </div>
      </div>
      <img src={landing_bg_left} alt="" className="cart-bg"/>
      <div className="custom-cart cart-supply">
        <TabHeader activeTab={activeTab} onSelect={tab=>setActiveTab(tab)}/>
        {
        activeTab == 'supply'? <ActionTab action="supply"/>:
        activeTab == 'borrow'? <ActionTab action="borrow" />:
        activeTab == 'withdraw'? <ActionTab action="withdraw" />:
        activeTab == 'repay'? <ActionTab action="repay" />:null
        }
        <TabFooter />
      </div>
      <div className="modal-footer">
        <div className="custom-container">
          <div className="custom-row">
            <a href="">
              <img src={brand} alt="" width="40px" height="40px"/>
            </a>
            <div className="modal-social">
              <span>Social Networks</span>
              <div className="modal-social-links">
                <a href="" className="modal-social-link">
                  <img src={github_black} alt=""/>
                </a>
                <a href="" className="modal-social-link">
                  <img src={discord_black} alt=""/>
                </a>
                <a href="" className="modal-social-link">
                  <img src={twitter_black} alt=""/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pool;