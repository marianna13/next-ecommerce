import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

export const Budget = (props) => {
  const [edit, setEdit] = useState(false);
  const [budget, setBudget] = useState(24);
  const lastMonth = 8;
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
            БЮДЖЕТ
          </Typography>
          {edit ?
          <Typography
            color="textPrimary"
            variant="h4"
          >
            <input
          value={budget} onChange={(e) => {setBudget(e.target.value)}}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          />
          </Typography> 
          
          :<Typography
            color="textPrimary"
            variant="h4"
          >
           ${budget}k
          </Typography>}
        </Grid>
        <Grid item>
          {/* <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <button style={{color:'white'}}><MoneyIcon /></button>
          </Avatar> */}
          <Avatar
          sx={{
              backgroundColor: edit ?'black':'error.main',
              height: 56,
              width: 56,
              marginTop:1
            }}
            >
            <button 
            style={{color:'white'}}
            onClick={()=> {
              if (edit) {
                // saveBudget(budget)
              }
              setEdit(!edit)
            }}
            >
            {edit? <SaveIcon /> :<EditIcon />}
            </button>
          </Avatar>
           
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          {(budget/lastMonth).toFixed(2)*100}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          По сравнению с прошлым месяцем
        </Typography>
      </Box>
    </CardContent>
  </Card>
  );
}