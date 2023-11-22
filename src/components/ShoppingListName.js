import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import { usePreferences } from '../contexts/PreferencesContext';
import { useEffect, useState } from 'react';

function CartName() {
    const { shoppingListsPrefs } = usePreferences();

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
            <Typography>
                {shoppingListsPrefs.selected === null
                    ? 'Není vybrán žádný list'
                    : shoppingListsPrefs.selected.name}
            </Typography>
        </Box>
    );
}
export default CartName;
