import { Typography, Box, Button } from '@mui/joy';

function Header() {
  return (
    <Box backgroundColor={'#424242'} height={52} display={'flex'} padding={'6px'}>
      <Button
        color={'primary'}
        sx={{
          minWidth: '200px',
        }}
      >
        <Box
          width={'100%'}
          height={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}
        >
          <Typography>Novy Kosik</Typography>
          <Typography>+</Typography>
        </Box>
      </Button>
    </Box>
  );
}

export default Header;
