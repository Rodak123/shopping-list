import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { ReactComponent as Plus } from '../assets/images/plus.svg';

function ItemAdd() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="solid" size="lg">
        Nová položka
        <Plus style={{ width: '12px', height: '12px', marginLeft: '5px' }} />
      </Button>
    </Box>
  );
}

export default ItemAdd;
