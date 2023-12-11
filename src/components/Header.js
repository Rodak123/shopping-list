import { Box } from '@mui/joy';
import Sidebar from './Sidebar/Sidebar';

function Header() {
    return (
        <Box borderBottom={'1px solid'} display={'flex'} padding={'6px'}>
            <Sidebar />
        </Box>
    );
}

export default Header;
