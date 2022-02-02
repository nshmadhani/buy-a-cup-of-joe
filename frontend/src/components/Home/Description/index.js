import React from "react"
import { ethers } from "ethers"



import { ProfileAvatar } from "../../Avatar"
import MessageDialog from "../../MessageDialog"
import { Button } from "@mui/material"
import { useContext, useState } from "react"
import UserContext from "../UserContext"

import ContractMeta from '../../../util/CreatorManager'

export default function Description ({ creatorAccount }){

    const { user, setUser, provider, setProvider, reload, setReload } = useContext(UserContext)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    const makeDonation = async (msg) => {
        if (!user) {
            alert("Login First")
            return;
        }

        const newProvider = new ethers.providers.Web3Provider(provider);
        const signer = newProvider.getSigner();
        const manager = new ethers.Contract(
            ContractMeta.address,
            ContractMeta.abi.abi,
            signer
        );
        const tx = await signer.sendTransaction({
            to: creatorAccount.address,
            value: ethers.utils.parseEther(amount)
        });
        console.log(tx)
        console.log(creatorAccount.address, msg, user.sub, amount, tx.hash)
        try {
            const donTxn = await manager.makeDonation(creatorAccount.address, user.sub, msg, amount, tx.hash);
            setReload(true);
            console.log(donTxn)
        } catch (e) {
            console.log("Error While Donation")
            console.error(e)
        }
    }

    const donate = (amount) => {
        if (!user) {
            //Login First
            alert("Login First")
            return;
        }
        setDialogOpen(true);
        setAmount(amount);
    }



    return (
        <div>
            <ProfileAvatar address={creatorAccount.address}></ProfileAvatar>
            <div className="flex flex-col gap-y-2">
                <div>
                    <h2 className="text-2xl font-bold mt-4">{creatorAccount.name}</h2>
                    <p className="text-xl italic ">{creatorAccount.domain}</p>
                </div>
                <p className="bio" >I am web3 software developer and write a newsletter on it</p>
                <div className="flex flex-row gap-x-4 justify-start mt-2">
                    <Button variant='outlined' onClick={() => { donate("1") }}>1 MATIC</Button>
                    <Button variant='outlined' onClick={() => { donate("2") }}>2 MATIC</Button>
                    <Button variant='outlined' onClick={() => { donate("10") }}>10 MATIC</Button>
                </div>
            </div>
            {true && (
                <MessageDialog
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                  setConfirm={makeDonation}
                ></MessageDialog>
              )}
        </div>
    )


}