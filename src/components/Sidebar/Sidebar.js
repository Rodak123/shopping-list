import * as React from 'react';
import {
  Box,
  IconButton,
  Drawer,
  Input,
  List,
  ListItemButton,
  Typography,
  ModalClose,
} from '@mui/joy';
import { Menu, Search } from '@mui/icons-material';
import SidebarContent from './SidebarContent';

function DrawerMobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton variant="plain" onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <SidebarContent />
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerMobileNavigation;
