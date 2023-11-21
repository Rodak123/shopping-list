import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';

function CartName() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        borderRadius: '6px',
        backgroundColor: 'lightgrey',
        padding: '10.5px',
      }}
    >
      <Typography>Název Nákupního Košíku</Typography>
    </Box>
  );
}
export default CartName;
