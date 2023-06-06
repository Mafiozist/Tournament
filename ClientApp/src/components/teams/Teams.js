import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Fade, Grow, List, Stack } from '@mui/material';

function RenderCard({showContent}, {timeout}) {

    return (

        <Grow in={showContent} timeout={timeout}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://img.freepik.com/premium-vector/angry-poo-emoji-grumpy-poop-pile-emoticon_53562-14549.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>



    )

}


export function Teams(props) {
    const [showContent, setShowContent] = React.useState(false);
    const timeout = 250;

    React.useEffect(() => {
        // Имитация задержки загрузки
        setTimeout(() => {
            setShowContent(true);
        }, 125);
    }, []);

    //Должна быть функция которая будет отображать новый компонент на экране и в это функции будет задаваться анимация, осталось узнать как показать ее в начале
    return (

        <Stack container spacing={3} direction="row" useFlexGap flexWrap="wrap" >
            {showContent && (
                <>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                    <RenderCard showContent={showContent} timeout={timeout}/>
                </>
            )}
        </Stack>
    )
}