import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

function CardDemo() {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-md">Plain card</Typography>
                <Typography>Description of the card.</Typography>
            </CardContent>
        </Card>
    );
}

export default CardDemo;
