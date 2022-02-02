import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import UAuthSPA from '@uauth/js'

import web3modal, { uauthOptions } from '../../Web3Modal'
import * as UAuthWeb3Modal from '@uauth/web3modal'


import DonationLog from "../../DonationLog";
import LoginButton from "../../LoginButton";
import UserContext from "../UserContext";

import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import ContractMeta from '../../../util/CreatorManager'


export default function LogPane({ creatorAccount,allDonations }) {

    const [uauth, setUauth] = useState();
    const {
        user, setUser, provider, setProvider, reload, setReload
    } = useContext(UserContext);

    const [donations, setDonations] = useState([])

    const connectWallet = async () => {
        console.log("Loggin you in")
        const provider = await web3modal.connect()
        console.log("Provider", provider)
        setProvider(provider)
        try {
            const user = await uauth.user();
            console.log("User", user);
            setUser(user);
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        setUauth(UAuthWeb3Modal.getUAuth(UAuthSPA, uauthOptions))
    }, [])

    useEffect(() => {
        if(!uauth) return;
        checkIfWalletIsConnected()
    }, [uauth])

     const checkIfWalletIsConnected = async () => {
        uauth.loginCallback()
          .then(async () => {
            const provider = await web3modal.connectTo('custom-uauth')
            setUser(await uauth.user());
            setProvider(provider)
          })
          .catch(error => {
            // Redirect to failure page
            console.error("checkIfWalletIsConnected", error)
          })
    };

    const getDonations = async () => {
        if (!provider) {
            console.log("Hey, not done yet")
        }

        try {
            const newProvider = new ethers.providers.Web3Provider(provider);
            const signer = newProvider.getSigner();
            const manager = new ethers.Contract(
                ContractMeta.address,
                ContractMeta.abi.abi,
                signer
            );
            let donationSize = await manager.totalCreatorDonations(creatorAccount.address);
            console.log("Donations Made", donationSize);
            let donations = [];
            while (donationSize > 0) {
                donations.push(await manager.donationsToUser(creatorAccount.address, --donationSize))
            }
            setDonations(donations);
        } catch (error) {
            console.log("Error in Get Donations")
            console.error(error);
        }
    };

    useEffect(() => {
        getDonations();
        return;
    }, [reload, provider]);


    return (
        <div>
            <div className="log-header flex flex-row gap-x-4 justify-end">
                {!user && (<LoginButton onClickHandler={connectWallet} />)}
                {user && (<Button variant="outlined" endIcon={<LogoutIcon />}>{user.sub}</Button>)}
            </div>
            <div classname="flex flex-col gap-y-12">
                {donations.map((donation, index) => {
                    console.log(donation);
                    return (
                        <DonationLog
                            key={index}
                            waver={donation._undAddress}
                            timestamp={new Date(donation._ts * 1000)}
                            message={donation.message}
                            amount={`${donation.amountInWei.toString()} MATIC`}
                        />)
                })}
            </div>
        </div>
    )


    }