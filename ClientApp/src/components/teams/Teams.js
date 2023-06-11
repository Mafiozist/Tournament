import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ReactCardFlip from 'react-card-flip';
import {useState, useRef} from 'react'
import {  CardActionArea, Fade, Grow, List, Stack } from '@mui/material';
import { useGetTeamsQuery, useCreateTeamMutation } from '../../redux/component/api/teams.api';

function RenderCard(props) {
    const frontCard = useRef(null)

    return (
        <ReactCardFlip isFlipped={props.flipped} direction="horizontal">
            <Grow in={props.showContent} timeout={props.timeout}>
                <Card sx={{ maxWidth: 345 }} onClick={props.clicked} ref={frontCard}>
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

            <CardActionArea >
                <Card sx={{ maxWidth: 345}} onClick={props.clicked} style={{ height: frontCard?.current? frontCard.current.offsetWidth  : 'unset' }}>
                  
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                </Card>
            </CardActionArea>
        </ReactCardFlip>


    )

}


export function Teams(props) {
    const [showContent, setShowContent] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const timeout = 225;

    const {data, isLoading, isError, isSuccess} = useGetTeamsQuery();
    const [createTeam, result] = useCreateTeamMutation();
    const [flipped, setFlipped] = useState(false);

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
                        
                        let obj = {teamName:"КомандаТест"};
                        setLoading(true); 
                        createTeam(obj).then(res=>{
                            setLoading(false);
                            //alert(result);
                        }, (err)=>{
                            setLoading(false);
                            alert(err);
                        })
                    }
                }
            />
            {showContent && (
                <>
                    <RenderCard showContent={showContent} timeout={timeout} flipped={flipped} clicked={()=> setFlipped(!flipped)}/>
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