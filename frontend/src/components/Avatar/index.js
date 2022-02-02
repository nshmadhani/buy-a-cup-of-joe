import React from "react";
import { Avatar } from "@mui/material";
const backgroundColors = ['#93A7FF', '#A9E775', '#FF7A9A', '#B379F7','#FF6674','#D3EBED', '#FFFFFF'];


export const getAvatar = (timestamp) => {
        var backgroundColor = backgroundColors[timestamp % backgroundColors.length];
        const avatar = `https://avatars.dicebear.com/api/personas/${timestamp}.svg?backgroundColor=${encodeURIComponent(backgroundColor)}`;
        console.log(avatar);
        return avatar;    
}


export const ProfileAvatar = ({ address }) => {
    const avatar = getAvatar(address);
    return <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{ width: "8em" , height: "8em" }}
    />
}