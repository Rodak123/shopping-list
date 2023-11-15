import { Box, Button, Typography } from '@mui/joy';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function AccountBox() {
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: '100%',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AccountCircleOutlinedIcon />
        <Typography
          sx={{
            marginLeft: '15px',
          }}
        >
          Jmeno Prijmeni
        </Typography>
      </Box>
      <Button variant="outlined">Odhlasit se </Button>
    </Box>
  );
}

export default AccountBox;
