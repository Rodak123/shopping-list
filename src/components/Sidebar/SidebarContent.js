import { Box, List, ListItemButton, Typography, ModalClose } from '@mui/joy';
import AccountBox from '../AccountBox';

function SidebarContent() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          component="label"
          htmlFor="close-icon"
          fontSize="sm"
          fontWeight="lg"
          sx={{ cursor: 'pointer' }}
        >
          Close
        </Typography>
        <ModalClose id="close-icon" sx={{ position: 'initial' }} />
      </Box>

      <AccountBox style={{ marginTop: '10px' }} />

      <List
        size="lg"
        component="nav"
        sx={{
          flex: 'none',
          fontSize: 'xl',
          '& > div': { justifyContent: 'center' },
        }}
      >
        <ListItemButton sx={{ fontWeight: 'lg' }}>Home</ListItemButton>
        <ListItemButton>About</ListItemButton>
        <ListItemButton>Studio</ListItemButton>
        <ListItemButton>Contact</ListItemButton>
      </List>
    </>
  );
}

export default SidebarContent;
