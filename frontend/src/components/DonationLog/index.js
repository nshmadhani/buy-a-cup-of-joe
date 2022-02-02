import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getAvatar } from '../Avatar';



export default function DonationLog({ waver, timestamp, message, amount }) {

  const avatar = getAvatar(timestamp)
  return (
    <Card className="flex m-3">
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={avatar}
        alt="Live from space album cover"
      />
      <Box className='w-full'>
        <CardContent className='w-full flex flex-col grow'>
          <div className='w-full flex justify-between'>

            <Typography component="div" variant="h5">
              {waver}
            </Typography>

            <Typography component="div" variant="h6">
              {amount}
            </Typography>
          </div>

          <Typography variant="subtitle1" color="text.secondary" component="div">
            {message}
          </Typography>
          <Typography className='items-end' color="text.secondary" component="p">
            {timestamp.toLocaleString()}
          </Typography>
        </CardContent>
      </Box>

    </Card>
  );
}

