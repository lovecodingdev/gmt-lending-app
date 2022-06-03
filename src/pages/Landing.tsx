import React from "react";
import { Link } from "react-router-dom";

import landing_bg_left from "../assets/svg/land.svg";
import landing_bg_right from "../assets/svg/big-g.svg";
import supply from "../assets/svg/supply.svg";
import withdraw from "../assets/svg/withdraw.svg";
import borrow from "../assets/svg/borrow.svg";
import repay from "../assets/svg/repay.svg";
import bitcoin from "../assets/svg/bitcoin.svg";
import face from "../assets/svg/face.svg";
import tree from "../assets/svg/tree.svg";

const landing = () => {
    return (
        <>
            <div className="content">
                <img src={landing_bg_left} alt="" className="img-background first" />
                <img src={landing_bg_right} alt="" className="img-background second" />
                <div className="custom-container">
                    <div className="custom-row">
                        <div className="landing-text">
                            <h1>Liquidity for staked assets</h1>
                            <span>Simplified and secure staking for digital assets</span>
                            <div className="custom-btn btn-stake">Stake now</div>
                        </div>
                        <div className="how">
                            <div className="how-header">
                                <h2>How It Works</h2>
                                <span>Lido builds state of the art liquid staking protocols to grow the staking economy</span>
                            </div>
                            <div className="how-content">
                                <div className="cscol-md-6 cscol-sm-12">
                                    <div className="how-method">
                                        <img src={supply} alt="" />
                                        <h4>Supply</h4>
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes, libero mattis tortor augue risus varius id vestibulum pellentesque. At.</span>
                                    </div>
                                    <div className="how-method">
                                        <img src={withdraw} alt="" />
                                        <h4>Withdraw</h4>
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper curabitur amet laoreet accumsan varius elementum dignissim. Semper sed ullamcorper risus non est diam ligula.</span>
                                    </div>
                                </div>
                                <div className="cscol-md-6 cscol-sm-12">
                                    <div className="how-method">
                                        <img src={borrow} alt="" />
                                        <h4>Borrow</h4>
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus vel a vitae volutpat ullamcorper amet, velit adipiscing. Viverra sapien rhoncus, maecenas tempus tellus felis. Vel risus ut nec.</span>
                                    </div>
                                    <div className="how-method">
                                        <img src={repay} alt="" />
                                        <h4>Repay</h4>
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa tellus magna ultricies lorem nulla pellentesque. Tincidunt congue odio eget condimentum facilisis. In amet vitae vitae purus in. </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="from-blog">
                            <h2>From the blog</h2>
                            <div className="blog-content">
                                <div className="blog-item">
                                    <img src={bitcoin} alt="" />
                                    <span>Lido stAssets Collateral Risk Monitoring</span>
                                    <Link to="" className="blog-link">Read</Link>
                                </div>
                                <div className="blog-item">
                                    <img src={face} alt="" />
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta.</span>
                                    <Link to="" className="blog-link">Read</Link>
                                </div>
                                <div className="blog-item">
                                    <img src={tree} alt="" />
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis.</span>
                                    <Link to="" className="blog-link">Read</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default landing;