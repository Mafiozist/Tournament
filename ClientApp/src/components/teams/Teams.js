import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import {  CardActionArea, Fade, Grow, List, Stack } from '@mui/material';
import { useGetTeamsQuery, useCreateTeamMutation } from '../../redux/component/api/teams.api';

function RenderCard(props) {

    return (

        <Grow in={props.showContent} timeout={props.timeout}>
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
    const [loading, setLoading] = React.useState(false);
    const timeout = 225;

    const {data, isLoading, isError, isSuccess} = useGetTeamsQuery();
    const [createTeam] = useCreateTeamMutation();

    console.log(data, isError);
    
    React.useEffect(() => {
        // Имитация задержки загрузки
        setTimeout(() => {
            
            setShowContent(true);
        }, 125);
    }, []);

    //Должна быть функция которая будет отображать новый компонент на экране и в это функции будет задаваться анимация, осталось узнать как показать ее в начале
    return (

        <Stack spacing={3} direction="row" useFlexGap flexWrap="wrap" >
            <LoadingButton loading={loading} variant='outlined'
                onClick={
                    ()=> {

                        setLoading(true); createTeam({name:'КомандаТест'}).then(res=>{
                            setLoading(false);
                        })
                    }
                }
            />
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