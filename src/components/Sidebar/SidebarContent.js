import {
  Box,
  List,
  ListItemButton,
  Button,
  Typography,
  ModalClose,
  DialogTitle,
  Divider,
  DialogContent,
  Avatar,
  Stack,
} from '@mui/joy';

function SidebarContent() {
  const name = 'Petr';
  const surname = 'Novák';

  const dateJoined = '20. Lis 2023';

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
      <DialogTitle>Title</DialogTitle>
      <DialogContent>
        <Typography
          textAlign="center"
          fontWeight="lg"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'center' },
          }}
        >
          Nákupní košíky
        </Typography>
        <Divider />
        <List
          size="lg"
          component="nav"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'center' },
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
            <Typography level="body-sm">od {dateJoined}</Typography>
          </div>
          <Button variant="outlined">Odhlasit se </Button>
        </Stack>
      </Box>
    </>
  );
}

export default SidebarContent;
