import { Typography, Box, Button } from '@mui/joy';
import SidebarSlide from '../components/SidebarSlide';

function Header() {
  return (
    <Box borderBottom={'1px solid'} height={52} display={'flex'} padding={'6px'}>
      <SidebarSlide />
    </Box>
  );
}

export default Header;
