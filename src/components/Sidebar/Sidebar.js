import * as React from 'react';
import { IconButton, Drawer } from '@mui/joy';
import { Menu } from '@mui/icons-material';
import SidebarContent from './SidebarContent';

function DrawerMobileNavigation() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <IconButton variant="plain" onClick={() => setOpen(true)}>
                <Menu />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <SidebarContent setOpen={setOpen} />
            </Drawer>
        </>
    );
}

export default DrawerMobileNavigation;
