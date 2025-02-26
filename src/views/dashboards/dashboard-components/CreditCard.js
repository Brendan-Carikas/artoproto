import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const CreditCard = ({ sx }) => {
  const totalCredits = 500;
  const usedCredits = 120;
  const remainingCredits = totalCredits - usedCredits;
  const progress = (usedCredits / totalCredits) * 100;

  return (
    <Card sx={sx}>
      <CardContent sx={{ height: '100%', pb: '32px !important', position: 'relative' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <CreditScoreIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h5">Credits</Typography>
        </Box>
        <Typography variant="h3" color="primary" gutterBottom>
          {remainingCredits}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {usedCredits} credits used out of {totalCredits}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ mb: 2, borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Credit usage information
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreditCard;