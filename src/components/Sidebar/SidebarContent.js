import {
  Box,
  List,
  ListItemButton,
  Button,
  Typography,
  ModalClose,
  DialogTitle,
  DialogContent,
  Avatar,
  Stack,
} from '@mui/joy';
import { useApi } from '../../contexts/ApiContext';
import DateFormatter from '../DateFormatter';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SidebarContent() {
  const { api } = useApi();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (api !== null) {
      axios.get(api.url + '/user/' + api.id).then(function (res) {
        if (res.data) {
          setUser(res.data);
        }
      });
    }
  }, [api]);

  const name = user?.user_name ?? 'Name';
  const surname = '';

  const dateJoined = user?.createdAt; //'20. Lis 2023';

  const selectedList = 1;
  const shoppingListNamess = [];
  for (let i = 0; i < 50; i++) {
    shoppingListNamess.push(`Nákup ${i}`);
  }

  const shoppingLists = shoppingListNamess.map((shoppingListName, index) => (
    <ListItemButton sx={{ fontWeight: index == selectedList ? 'bold' : 'normal' }}>
      {shoppingListName}
    </ListItemButton>
  ));

  return (
    <>
      <ModalClose size="lg" />
      <DialogTitle>Nákupní košíky</DialogTitle>
      <DialogContent>
        <List
          size="lg"
          component="nav"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'left' },
          }}
        >
          {shoppingLists}
        </List>
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 1.5,
          pb: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar size="lg" />
        <Stack flexGrow="1" direction="row" justifyContent="space-between" useFlexGap spacing={1}>
          <div>
            <Typography level="title-md">
              {name} {surname}
            </Typography>
            <Typography level="body-sm">
              od <DateFormatter date={dateJoined} />
            </Typography>
          </div>
          <Button variant="outlined">Odhlasit se </Button>
        </Stack>
      </Box>
    </>
  );
}

export default SidebarContent;
