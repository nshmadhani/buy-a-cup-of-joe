import React, { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";

import "./index.css";

import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Description from "./Description";
import LogPane from "./LogPane";
import UserContext from "./UserContext";
import ContractMeta from "../../util/CreatorManager"


export default function Home({ creatorAccount }) {

  const [user, setUser] = useState('');
  const [provider, setProvider] = useState('');

  const [reload, setReload] = useState(true)

  const contextValue = { user, setUser, provider, setProvider, reload, setReload }



  return (

    <UserContext.Provider value={contextValue}>
      <Box sx={{ flexGrow: 1, margin: "15vh auto", width: "75vw" }} >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Description creatorAccount={creatorAccount}></Description>
          </Grid>
          <Grid item xs={8}>
            {/*  Add to top login button and username with logout on top right here*/}
            <LogPane creatorAccount={creatorAccount}></LogPane>
          </Grid>
        </Grid>
        
      </Box>



    </UserContext.Provider>
  );
}

