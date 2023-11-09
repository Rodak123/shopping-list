import { Button, Box, Typography } from '@mui/joy';

function Sidebar() {
  return (
    <Box padding={'6px'}>
      <Button
        color={'primary'}
        sx={{
          minWidth: '150px',
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

export default Sidebar;
