import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  Slide, Zoom } from '@mui/material';
import { useParticipants } from '../../redux/hooks/useParticipants';
import { useActions } from '../../redux/hooks/useActions';
import cloneDeep from 'lodash/cloneDeep';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function EditDialog(props) {

    const {members} = useParticipants(props.id);
    const {updateParticipant, addToParticipants} = useActions();

    let localMember = cloneDeep(members);
    const [member, setMember] = React.useState({...localMember});

    React.useEffect(()=>{
        setMember({...localMember});
    }, [members])

    const handleClose = () => {
        props.close({open: false});
    };

    const handleReopen = () => {
        
        addToParticipants({...member, id: localMember.sort( (a,b) => a.id - b.id).at(localMember.length - 1).id += 1});      
        props.close({open: false});
        setTimeout(() => {
            props.close({open: true});
        }, 350);
    }

    const handleSave = () => {
        updateParticipant({...member});
        props.close({open: false});
    };

    let deleted = !members.is_deleted;

    return (
        <div>
            
                <Dialog TransitionComponent={ props.addState? Slide : Zoom } TransitionProps={props.visible? {direction:'right'} : {direction:'left'}} open={props.visible} onClose={handleClose}>
                    <DialogTitle>
                            {   
                                props.addState?
                                    'Добавление пользователя'
                                :
                                    'Редактирование пользователя'
                            }
                    </DialogTitle>
                    <DialogContent style={{display:'grid', width: 'fit-content', margin:'auto'}}>
                        <DialogContentText hidden={deleted} style={{gridColumn: 1, gridRow: 1, textAlign:'center', backgroundColor:"#ffcccb"}}>
                            Пользователь удален
                        </DialogContentText>

                        <TextField
                            margin="dense"
                            id="last_name"
                            label="Фамилия"
                            type="text"
                            variant="outlined"
                            value={member.last_name}
                            onChange={e => {
                                setMember({...member, last_name: e.target.value});
                            }}
                            style={{gridColumn: 1, gridRow: 2}}
                        />

                        <TextField

                            margin="dense"
                            id="first_name"
                            label="Имя"
                            type="text"
                            variant="outlined"
                            value={member.first_name}
                            onChange={e => {
                                setMember({...member, first_name: e.target.value});
                            }}
                            style={{gridColumn: 1, gridRow: 3}}
                        />

                        <TextField
        
                            margin="dense"
                            id="patronymic"
                            label="Отчество"
                            type="text"
                            variant="outlined"
                            value={member.patronymic}
                            onChange={e => {
                                setMember({...member, patronymic: e.target.value})
                            }}
                            style={{gridColumn: 1, gridRow: 4}}
                        />

                        <TextField
                    
                            margin="dense"
                            id="depart"
                            label="Отдел(цех)"
                            type="text"
                            variant="outlined"
                            value={member.depart}
                            onChange={e =>{ 
                                setMember({...member, depart: e.target.value})
                            }}
                            style={{gridColumn: 1, gridRow: 5}}
                        />

                    </DialogContent>
                    <DialogActions>
                        {props.addState?
                                <>
                                    <Button onClick={handleClose}>Сохранить и выйти</Button>
                                    <Button onClick={handleReopen}>Еще <ArrowForwardIosIcon/></Button>
                                </>
                            :
                                <>
                                    <Button hidden={deleted} onClick={handleClose}  style={{justifyContent:'left'}}>Востановить</Button>
                                    <Button onClick={handleSave}  style={{justifyContent:'right'}}>Сохранить</Button>
                                </>
                        }
                    </DialogActions>
                </Dialog>

        </div>
    );
}

