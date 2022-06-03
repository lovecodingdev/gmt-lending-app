import React from "react";
import { Link, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import Sociallinkdesktop from "../../components/Sociallinkdesktop";

import footer_bg_big from "../../assets/svg/footer-big.svg";
import footer_bg_small from "../../assets/svg/footer-small.svg";
import telegram from "../../assets/svg/telegram.svg";
import discord from "../../assets/svg/discord.svg";
import github from "../../assets/svg/github.svg";
import twitter from "../../assets/svg/twitter.svg";
import github_white from "../../assets/svg/github-white.svg";
import discord_white from "../../assets/svg/discord-white.svg";
import twitter_white from "../../assets/svg/twitter-white.svg";

const Footer = () => {
    const imagelinks1 = [telegram, discord, github, twitter];
    const sociallinks1 = ["Telegram", "Discord", "Github", "Twitter"];
    const sociallinks2 = [github_white, discord_white, twitter_white];
    const location = useLocation()

    return (
        location.pathname==="/" ?
        <>
            <footer>
                <img src={footer_bg_big} alt="" />
                <img src={footer_bg_small} alt="" />
                <div className="footer-content">
                    <div className="custom-container">
                        <div className="custom-row">
                            <h2>Join our community</h2>
                            <p>Learn more about Lido, chat with us and have your say in the future of the Lido ecosystem</p>
                            <div className="contact-info">
                                <div className="contact-link">
                                    <img src={telegram} alt="" />
                                    <span>Telegram</span>
                                </div>
                                <div className="contact-link">
                                    <img src={discord} alt="" />
                                    <span>Discord</span>
                                </div>
                                <div className="contact-link">
                                    <img src={github} alt="" />
                                    <span>Github</span>
                                </div>
                                <div className="contact-link">
                                    <img src={twitter} alt="" />
                                    <span>Twitter</span>
                                </div>
                                {/* {imagelinks1.map((imagelink, i)=><Sociallinkdesktop image={imagelink} link={sociallinks1[i]} /> )} */}
                            </div>
                            <hr className="footer-line" />
                            <div className="footer-social">
                                <h4>Social Networks</h4>
                                <div className="social-links">
                                    <Link to="" className="social-link social-github">
                                        <img src={github_white} alt="Github" />
                                    </Link>
                                    <Link to="" className="social-link social-discord">
                                        <img src={discord_white} alt="Discord" />
                                    </Link>
                                    <Link to="" className="social-link social-twitter">
                                        <img src={twitter_white} alt="Twitter" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>:<></>
    );
}

export default Footer;