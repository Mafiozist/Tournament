import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { IconButton, Input, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import React, { Component, useState, useRef, useEffect } from 'react';
import { Label } from 'reactstrap';
import Button from '@mui/material/Button';
import { useActions } from '../../redux/hooks/useActions';
import { useGetTeamsQuery } from '../../redux/component/api/teams.api';
import { useUpdateMatchesMutation } from '../../redux/component/api/matches.api';

export function EditMatch(props) {
    const [winner, setWinner] = useState(false);
    const [winner2, setWinner2] = useState(false);
    const [res, setRes] = useState({
        res1:'',
        res2:'',
    });
    const [res2, setRes2] = useState('');
    const {updateMatch, moveWinnerForward} = useActions();
    const [ updateMatches, result] = useUpdateMatchesMutation();

    const disabled = props.match?.status === 1? true : false; 

    const limited_inputs_style = {
        float: 'right',
        width: '60px',
        maxHeight: '40px',
        marginLeft: '6px',
    }
    
    const label_style ={
        width: '70px',
        wordBreak: 'break-all'
    }

    useEffect(()=>{
        if(!props.match || props.match.participants.length < 1) return;
        console.log(props.match)

        if(props.match.participants[0].id === props.match.idWinner && props.match.participants[0].id !== -1){
            setWinner(true);
        }else if (props.match.participants[1].id === props.match.idWinner && props.match.participants[1].id !== -1){
            setWinner2(true);
        }else{
            setWinner(false);
            setWinner2(false);
        }
        
        if(props.match.result){
            setRes({res1: props.match.participants[0].resultText, res2: props.match.participants[1].resultText});
        }else setRes({res1: '', res2: ''});
    }, [props.match]);

    const handleSave = () => {

        updateMatches([{
            IdMatch:props.match.id,
            IdTour:props.match.idParent,
            IdNextMatch:props.match.nextMatchId,
            IdWinner: winner? props.match.participants[0].id : winner2? props.match.participants[1].id : -1,
            Result: `${res.res1}/${res.res2}`}
        ]);

        props.close();
    };

    return (
        
            <Popover

                open={props.visible}
                onClose={props.close}
                anchorReference='anchorPosition'
                anchorPosition={{top:props.popoverParent.top, left:props.popoverParent.left}}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >

                { (props.match && props.match.participants && props.match.participants.length > 1)?

                    <div style={{ padding: '10px' }}>

                        <Stack direction="row" className='mb-2' spacing={{ md: 1 }} >

                            <Label size='100' style={label_style}>
                                <Typography display="inline" style={{ paddingRight: '7px' }}>
                                    {props.match.participants[0].name}
                                </Typography>
                            </Label>

                            <Input  style={limited_inputs_style} variant="filled" hidden={disabled} disabled={disabled} placeholder='Исход' required={true} onChange={e=> setRes({...res, res1:e.target.value})}>{res?.res1}</Input>
                            <IconButton aria-label='check' style={limited_inputs_style} disabled={disabled} onClick={(e) => { setWinner(!winner); setWinner2(false); }}>
                                {
                                    winner ?
                                        <EmojiEventsIcon />
                                        :
                                        <EmojiEventsOutlinedIcon />
                                }
                            </IconButton>

                        </Stack>

                        <Stack direction="row" spacing={{ md: 1 }} style={{ maxWidth: '200px' }}>
                            <Label size='100' style={label_style}>
                                <Typography display="inline" style={{paddingRight: '7px' }}>
                                    {props.match.participants[1].name}
                                </Typography>
                            </Label>
                            <Input className='limited-inputs' style={limited_inputs_style} hidden={disabled} disabled={disabled} variant="filled" placeholder='Исход' required={true} onChange={e=> setRes({...res, res2: e.target.value})}>{res?.res2}</Input>
                            <IconButton aria-label='check' className='limited-inputs' disabled={disabled} style={limited_inputs_style} onClick={(e) => { setWinner2(!winner2); setWinner(false); }}>
                                {
                                    winner2 ?
                                        <EmojiEventsIcon />
                                        :
                                        <EmojiEventsOutlinedIcon />
                                }
                            </IconButton>
                        </Stack>

                        {
                            (props.match.status !== 1 || !props.match.status)?

                                <Button style={{ float: 'right', margin: '5px' }} variant="outlined" onClick={handleSave} > Save</Button> /*НУЖНА ЗАГРУЗКА*/
                                :
                                <></>
                        }

                    </div>

                    :

                    <Typography style={{margin: '10px'}}>
                        Матч еще не был сформирован
                    </Typography>
                }
            </Popover>
      

    )


}


export default EditMatch;
