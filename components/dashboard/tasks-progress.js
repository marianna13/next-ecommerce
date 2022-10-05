import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import Link from 'next/link';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState, useEffect } from 'react';

export const TasksProgress = (props) => {

const[numOfVendors, setNum] = useState(0);
useEffect(() => {
    fetch('http://localhost:3000/api/vendors')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNum(data['numOfVendors']);
      })
  }, [])

  
  console.log(numOfVendors)
  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            ПОСТАВЩИКИ
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {numOfVendors}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <button>
              <Link href="/vendors" >
                <LocalShippingIcon style={{color:"white"}}/>
                </Link>
            </button>
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);}