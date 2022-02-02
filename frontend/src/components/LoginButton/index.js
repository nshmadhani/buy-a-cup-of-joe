import React from "react";
import { Button } from "@mui/material";

import UNSLogo from '../../images/uns.svg'

import { styled } from '@mui/material/styles';


const CustomButton = styled(Button)({
    backgroundColor: '#4C47F7',
    '&:hover': {
      backgroundColor: '#0025BB'
    },
    
    '&:focus': {
        backgroundColor: '#4F62CE'
    }
  });

const UNDIcon = () => {
    return (
        <img style={{height: "30px"}} src={UNSLogo} alt="logo"/>
    )
}

export default ({ onClickHandler }) => {
    
    
    return (
        <div>
            <CustomButton variant="contained" startIcon={<UNDIcon />} onClick={onClickHandler} >
                Login with Unstoppable
            </CustomButton>
        </div>  
    );

}