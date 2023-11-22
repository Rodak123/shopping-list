import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ItemPopup from './ItemPopup';
import { ModalDialog } from '@mui/joy';

function ItemAdd() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="solid" size="lg" onClick={() => setOpen(true)}>
        Nová položka
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          layout="center"
          size="lg"
          sx={{
            padding: 0,
          }}
        >
          <ItemPopup />
        </ModalDialog>
      </Modal>
    </Box>
  );
}

export default ItemAdd;
