import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {
  Add,
  HdrPlusOutlined,
  PlusOneOutlined,
  ShoppingBagOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import Autocomplete from '@mui/joy/Autocomplete';
import ModalClose from '@mui/joy/ModalClose';

function ItemPopup() {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        margin: '0 !important',
        mx: 'auto',
        overflow: 'hidden',
      }}
    >
      <Typography level="title-lg">Přidat položku</Typography>
      <ModalClose variant="plain" sx={{ m: 0 }} />
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Název položky</FormLabel>
          <Autocomplete
            options={['Pivo', 'Víno', 'Vodka', 'Rum', 'Whisky', 'Tequila', 'Gin', 'Jiné']}
            placeholder="Název položky"
          />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Popis položky</FormLabel>
          <Input placeholder="Popis položky" />
        </FormControl>
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid" color="primary">
            Přidat
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default ItemPopup;
