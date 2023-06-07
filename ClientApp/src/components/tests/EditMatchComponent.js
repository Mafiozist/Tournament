import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { IconButton, Input, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import React, { Component, useState, useRef, useEffect } from 'react';
import { Label } from 'reactstrap';
import Button from '@mui/material/Button';

export function EditMatch(props) {
    const [winner, setWinner] = useState(false);
    const [winner2, setWinner2] = useState(false);
   

    const limited_inputs_style = {
        float: 'right',
        width: '60px',
        maxHeight: '40px',
        margin: 'auto',
    }
    
    useEffect(()=>{
        if(!props.match || props.match.participants.length < 1) return;

        if(props.match.participants[0].isWinner){
            setWinner(true);
        }else if (props.match.participants[1].isWinner){
            setWinner2(true);
        }else{
            setWinner(false);
            setWinner2(false);
        }

    }, [props.match]);

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
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'left',
                //   }}
            >

                { (props.match && props.match.participants && props.match.participants.length > 1)?

                    <div style={{ padding: '10px' }}>

                        <Stack direction="row" className='mb-2' spacing={{ md: 1 }} >

                            <Label size='100' style={{ width: '70px' }}>
                                <Typography display="inline" style={{ wordBreak: "break-all", paddingRight: '7px' }}>
                                    {props.match.participants[0].name}
                                </Typography>
                            </Label>

                            <Input className='ml-5 mr-5' style={limited_inputs_style} variant="filled" placeholder='Исход' required={true}></Input>
                            <IconButton aria-label='check' style={limited_inputs_style} onClick={(e) => { setWinner(!winner); setWinner2(false); }}>
                                {
                                    winner ?
                                        <EmojiEventsIcon />
                                        :
                                        <EmojiEventsOutlinedIcon />
                                }
                            </IconButton>

                        </Stack>

                        <Stack direction="row" spacing={{ md: 1 }} style={{ maxWidth: '200px' }}>
                            <Label size='100' style={{ width: '70px' }}>
                                <Typography display="inline" style={{ wordBreak: "break-all", paddingRight: '7px' }}>
                                    {props.match.participants[1].name}
                                </Typography>
                            </Label>
                            <Input className='ml-5 mr-5 limited-inputs' style={limited_inputs_style} variant="filled" placeholder='Исход' required={true}></Input>
                            <IconButton aria-label='check' className='limited-inputs' style={limited_inputs_style} onClick={(e) => { setWinner2(!winner2); setWinner(false); }}>
                                {
                                    winner2 ?
                                        <EmojiEventsIcon />
                                        :
                                        <EmojiEventsOutlinedIcon />
                                }
                            </IconButton>
                        </Stack>

                        {
                            props.match.participants[0].id && props.match.participants[1].id ?

                                <Button style={{ float: 'right', margin: '5px' }} variant="outlined" onClick={props.close} > Save</Button> /*НУЖНА ЗАГРУЗКА*/
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
