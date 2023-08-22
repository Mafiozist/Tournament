import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { Card, Grid, IconButton, Input, TextField, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import React, { Component, useState, useRef, useEffect } from 'react';
import { CardFooter, Label } from 'reactstrap';
import Button from '@mui/material/Button';
import { useActions } from '../../redux/hooks/useActions';
import { useGetTeamsQuery } from '../../redux/component/api/teams.api';
import { useUpdateMatchesMutation } from '../../redux/component/api/matches.api';
import { DataGrid } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';

var locale = require('../../common/locale.js');


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
       // float: 'right',
        width: '80px',
        //marginLeft: '6px',
    }
    
    const limited_btns_style = {
        // float: 'right',
         width: '40px',
         height: '40px',
         //marginLeft: '6px',
     }

    const label_style ={
        maxWidth: '130px',
        //wordBreak: 'break-all'
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
            id:props.match.id,
            id_parent:props.match.idParent,
            IdNextMatch:props.match.nextMatchId,
            IdWinner: winner? props.match.participants[0].id : winner2? props.match.participants[1].id : -1,
            Result: `${res.res1}/${res.res2}`}
        ]);

        props.close();
    };

    return (
        
            <Popover
                style={{position:'fixed'}}
                open={props.visible}
                onClose={props.close}
                anchorReference='anchorPosition'
                anchorPosition={{top:props.popoverParent.top, left:props.popoverParent.left}}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >

            { (props.match && props.match.participants && props.match.participants.some(i=> i.id >= 1)) ?

                <Card>
                    <Stack spacing={4} direction="row" sx={{ padding: '10px' }}>
                        <Stack className="d-flex justify-content-evenly text-truncate">
                            <Label style={label_style}>{props.match?.participants[0].name}</Label>
                            <Label style={label_style}>{props.match?.participants[1].name}</Label>
                        </Stack>

                        <Stack>
                            <TextField variant="standard" style={limited_inputs_style} type="number" />
                            <TextField variant="standard" style={limited_inputs_style} type="number" />
                        </Stack>

                        <Stack className='limited-inputs d-flex justify-content-evenly'>

                            <IconButton aria-label='check' disabled={disabled} style={limited_btns_style} onClick={(e) => { setWinner(!winner); setWinner2(false); }}>
                                {
                                    winner ?
                                        <EmojiEventsIcon />
                                        :
                                        <EmojiEventsOutlinedIcon />
                                }
                            </IconButton>

                            <IconButton aria-label='check' disabled={disabled} style={limited_btns_style} onClick={(e) => { setWinner2(!winner2); setWinner(false); }}>
                                {
                                    winner2 ?
                                        <EmojiEventsIcon />
                                        :
                                        <EmojiEventsOutlinedIcon />
                                }
                            </IconButton>
                        </Stack>

                    </Stack>

                    <CardFooter className="d-flex justify-content-around mx-1 mb-1">
                        <LoadingButton >
                                {locale.saveLocale}
                        </LoadingButton>

                        <Button>
                                {locale.cancelLocale}
                        </Button>
                    </CardFooter>
                </Card>

                :

                <Typography style={{ margin: '10px' }}>
                    Матч еще не был сформирован
                    </Typography>
            }
        </Popover>


    )


}


export default EditMatch;
