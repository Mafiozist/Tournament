import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Tooltip,IconButton, Typography  } from "@mui/material";
import { Modal } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import TransferTableList from "./TransferTableList";
import AddIcon from '@mui/icons-material/Add'
import { green, red } from "@mui/material/colors";
import { useCreateTeamMutation } from "../../redux/component/api/teams.api";
import { useCreateTournamentMutation } from "../../redux/component/api/tournaments.api";
import { useSnackbar } from 'notistack';

export function CreateTournament(props) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [tournament, setTournament] = useState({
        name: '',
        place: '',
        teams: []
    });
    const { enqueueSnackbar } = useSnackbar();

    const [createTournament, result] = useCreateTournamentMutation();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        var result = await createTournament(tournament).unwrap();

        enqueueSnackbar(result.msg, {variant: result.status === 1? 'success' : 'error'});
        setOpen(false);
        setConfirmLoading(false);
        
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSelectedTeams = (teams)=>{
        console.log('teams', teams);
        setTournament({...tournament, teams: teams});
    }

    const handleClearTeams = (teamsToDel)=>{
        if(!tournament.teams) return;

        let data = tournament.teams.filter( item => !teamsToDel.includes(item));
        setTournament( {...tournament, teams: data? data : []});
    }

    return (
        <>
            <IconButton children={<AddIcon />} style={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: green[300], width: '60px', height: '60px' }} onClick={showModal}/>

            <Modal
                title={<Typography fontSize={25} sx={{display:'flex'}}>Создание турнира</Typography>}
                open={open}
                onOk={handleOk}
                okText="Создать и сохранить"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="Отмена"
                width={'50%'}
                style={{ position:'relative', minWidth:'500px', marginLeft:'auto'}}
            >

                <Stack direction="column" spacing={1}>

                    <Stack direction="row" spacing={1} justifyContent="center">
                        <TextField variant="outlined" multiline label='Название турнира' value={tournament.name} onChange={(e)=> {setTournament({...tournament, name: e.target.value})}}/>
                        <TextField variant="outlined" label='Место проведения' value={tournament.place} onChange={(e)=> {setTournament({...tournament, place: e.target.value})}}/>

                    </Stack>

                    <FormGroup hidden={true} sx={{width:'fit-content', height:'fit-content'}}>
                            <Tooltip placement="left" title="Отметьте, если необходимы групповые матчи" arrow >
                                <FormControlLabel control={<Checkbox />} label="Групповые матчи?" />
                            </Tooltip>
                    </FormGroup>

                    <TransferTableList handleSelectedTeams={handleSelectedTeams} clearSelectedTeams={handleClearTeams}/>

                </Stack>

            </Modal>
        </>
    );
}