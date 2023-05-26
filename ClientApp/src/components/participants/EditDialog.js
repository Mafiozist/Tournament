import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox } from 'antd';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { MenuItem, Select } from '@mui/material';
import { useParticipants } from '../../redux/hooks/useParticipants';
import { useActions } from '../../redux/hooks/useActions';
import cloneDeep from 'lodash/cloneDeep';
import { loadServerRows } from '@mui/x-data-grid-generator';

export default function EditDialog(props) {

    const {members} = useParticipants(props.id);
    const {updateParticipant} = useActions();

    let localMember = cloneDeep(members);
    const [member, setMember] = React.useState({...localMember});

    React.useEffect(()=>{
        setMember({...localMember});
    }, [members])

    const handleClose = () => {
        props.close({open: false});
    };

    const handleSave = () => {
        updateParticipant({...member});
        props.close({open: false});
    };

    let deleted = !members.is_deleted;

    return (
        <div>
            <Dialog open={props.visible} onClose={handleClose}>
                <DialogTitle>Редактирование пользователя </DialogTitle>
                <DialogContent style={{display:'grid', width: 'fit-content', margin:'auto'}}>
                    <DialogContentText hidden={deleted} style={{gridColumn: 1, gridRow: 1, textAlign:'center', backgroundColor:"#ffcccb"}}>
                        Пользователь удален
                    </DialogContentText>

                    <TextField
                        margin="dense"
                        id="second_name"
                        label="Фамилия"
                        type="text"
                        variant="outlined"
                        value={member.second_name}
                        onChange={e => {
                            setMember({...member, second_name: e.target.value});
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

                    {/* <Select id='gender'>
                        <MenuItem  value={'М'}>М</MenuItem>
                        <MenuItem  value={'Ж'}>Ж</MenuItem>
                    </Select> */}

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Дата рождения" />
                        </DemoContainer>
                    </LocalizationProvider> */}


                </DialogContent>
                <DialogActions>
                    <Button hidden={deleted} onClick={handleClose}  style={{justifyContent:'left'}}>Востановить</Button>
                    <Button onClick={handleSave}  style={{justifyContent:'right'}}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

