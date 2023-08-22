import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react'
import { Button, CardActionArea, Fade, FormControlLabel, FormGroup, Skeleton, Stack, Switch, TextField } from '@mui/material';
import { useGetTeamsQuery, useEditOrCreateTeamMutation, useSetDeleteTeamMutation } from '../../redux/component/api/teams.api';
import { green } from "@mui/material/colors";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { CardFooter } from 'reactstrap';
import { useGetParticipantsQuery } from '../../redux/component/api/participants.api';
import { LoadingButton } from '@mui/lab';
import './teams.css';
import { enqueueSnackbar } from 'notistack';
import { TeamMembers } from './TeamMembers';
import { TeamMembersHist } from './TeamMembersHist';
var locale = require('../../common/locale.js');

//Default sort by кто включен в команду
const cards = {
    width: 280,
    height: 230,
    position: 'relative'
}

const cardMedia = {
    height: 140,
}

const rowStyles = {
    cursor: 'pointer'
}

function RenderCard(props) {
    //Получаем данные чз api на rtk-query
    const { data, isLoading } = useGetParticipantsQuery();
    const [filterData, setFilterData] = useState("");
    const [teamInfo, setTeamInfo] = useState({ ...props.data });
    const [editOrCreateTeam, result] = useEditOrCreateTeamMutation();
    const [deleteTeam] = useSetDeleteTeamMutation();

    //Режим редактирования
    const [fliped, setFliped] = useState(false);

    //Выбор членов команды
    const [selected, setSelected] = useState([]);

    const [saveLoading, setSaveLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);

    const handleSaveTeam = async () => {

        setSaveLoading(true);
        editOrCreateTeam({ ...teamInfo, users: selected })
            .then(succ => {
                var status = succ.data.status === 1;
                enqueueSnackbar(succ.data.msg, { variant: status ? "success" : "error" });
                if (succ.data.status >= 1) setFliped(!fliped);
            })
            .catch((failed) => {
                enqueueSnackbar(locale.teamSaveErrorMessage, { variant: 'error' });
                console.warn(failed);
            })
            .finally(fin => setSaveLoading(false))
    }

    const handleTeamDelete = async (e) => {
        
        if(props.data.id <=0){
            props?.deleteEmpty(props.data.id)
            enqueueSnackbar(locale.defaultSuccessDeleteLocale, { variant: 'success' });
            return;
        }

        setDelLoading(true);
        deleteTeam(props.data).then(succ => {
            //console.log(succ);
            enqueueSnackbar(succ.data.msg, { variant: succ.data.status >= 1 ? "success" : "error" });
            console.log('Сообщение: ', succ.data.msg);

            if (succ.data.status >= 1) setFliped(!fliped);
        })
            .catch(err => enqueueSnackbar(locale.defaultErrorMessage, { variant: 'error' }))
            .finally(fin => {
                setDelLoading(false);
            });
    }

    const handleMembersChange = async (e) => {
        setFilterData(e.target.value);
        console.log(e);
    }

    React.useEffect(() => {
        setTeamInfo({ ...props.data })
        //console.log(props.data.name)
    }, [props.data])


    return (
        <ReactCardFlip isFlipped={fliped} direction="horizontal" >
            <Fade in={props.showContent} timeout={props.timeout}>
                {/*Передняя сторона карточки*/}
                <CardActionArea>
                    <Card sx={{ ...cards }} onClick={() => setFliped(!fliped)}>

                        {
                            teamInfo.is_deleted ?
                                <span style={{ width: 0, height: 0, borderRight: '40px solid transparent', borderBottom: '40px solid transparent', borderLeft: '40px solid red', position: 'absolute', zIndex: '1' }} />
                                : null
                        }

                        <CardMedia
                            component="img"
                            height="140"
                            image={require("./team.jpg")}
                            alt="team image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" alignItems="center">
                                {props.data.name}
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                                В будущем тут будет лозунг команды
                            </Typography> */}
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Fade>

            {/*Задняя сторона карточки*/}
            <Card sx={{ ...cards }}>

                <LoadingButton title={teamInfo?.is_deleted? locale.returnDataLocale : locale.deleteLocale} loading={delLoading} children={teamInfo?.is_deleted? <RefreshIcon /> : <CloseIcon color="error"/>} size="small" sx={{ position: 'absolute', marginRight: 'auto', width: '25px', height: '25px', left: 235 }} onClick={handleTeamDelete} />

                <CardContent sx={{ display: 'block' }}>

                    <TextField label={locale.teamLabelLocale} sx={{ width: '100%', padding: '5px' }} value={teamInfo.name} focused={teamInfo.name ? true : false} onChange={(e) => setTeamInfo({ ...teamInfo, name: e.target.value })}></TextField>
                    
                    <TeamMembers selected={selected} setSelected={(val)=> setSelected(val)} data={data} team={props.data}/>
                    <TeamMembersHist data={props.data}/>
                    

                </CardContent>
                <CardFooter>
                    <Stack direction="row" className='d-flex justify-content-around '>

                        <LoadingButton loading={saveLoading} onClick={handleSaveTeam}>{locale.saveLocale}</LoadingButton>

                        <Button onClick={() => {
                            setFliped(!fliped);
                            setTeamInfo({ ...props.data });
                        }}>{locale.cancelLocale}</Button>

                    </Stack>
                </CardFooter>
            </Card>

        </ReactCardFlip>


    )

}

function RenderSkeletons(props) {
    return (
        <Fade in timeout={props?.timeout}>
            <Card sx={{ ...cards }}>
                <CardMedia>
                    <Skeleton animation="wave" variant="rounded" sx={{ ...cardMedia }}></Skeleton>
                </CardMedia>
                <CardContent>
                    <Stack direction="column">
                        <Skeleton animation="wave" variant="text" ></Skeleton>
                        <Skeleton animation="wave" variant="text" ></Skeleton>
                    </Stack>
                </CardContent>
            </Card>
        </Fade>
    )
}

function RenderItemsNotFound() {//Пока так, потом тут будет гифка с анимацией возле кнопки добавить
    return <Card sx={{ margin: 'auto', verticalAlign: 'center', backgroundColor: 'transparent' }}>

        <CardMedia
            sx={{ backgroundColor: 'transparent' }}
            component="img"
            height="440"
            image={require("./not_found.gif")}
            alt="data not found gif"
        />
        {/* <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{justifySelf:'center'}}>
                {locale.dataNotFoundLocale}
            </Typography>
        </CardContent> */}
    </Card>
}



export function Teams(props) {
    const [showContent, setShowContent] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const timeout = 250;

    const { data, isLoading, isError, isSuccess } = useGetTeamsQuery();
    const [dataSource, setDataSource] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const [filterDeleted, setFilterDeleted] = useState(false);

    React.useEffect(() => {
        setDataSource(data ? data : []);
        //console.log(data);
    }, [data])

    const handleSearch = async (e) => {
        setFilterValue(e.target.value);
    }

    const handleDeletedChange = async (e)=>{
        setFilterDeleted(e.target.checked);
    }

    const handleDeleteEmpty = async (id)=>{
        setDataSource(dataSource.filter(i=> i.id !== id));
    }

    //Должна быть функция которая будет отображать новый компонент на экране и в это функции будет задаваться анимация, осталось узнать как показать ее в начале
    return (
        <Stack direction="column" spacing={2}>

            <Stack direction="row" spacing={2} style={{ min: '140px', maxWidth: '500px', alignSelf: 'center' }}>
                <TextField id={"deletedSwitch"} hidden={!data?.length} autoFocus allowClear={true} type="text" placeholder={locale.defaultSearchLocale} onChange={handleSearch}></TextField>
                <FormGroup>
                    <FormControlLabel control={<Switch value={filterDeleted} onChange={handleDeletedChange} title={locale.showDeletedLocale} disableRipple />} size="small" label={locale.showDeletedLocale} />
                </FormGroup>
            </Stack>
            
            {
                isLoading ?
                    <Stack spacing={3} direction="row" useFlexGap flexWrap="wrap" >
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => <RenderSkeletons key={i} timeout={timeout} />)
                        }
                    </Stack>
                    :
                    <Stack direction="column" spacing={2}>

                        <Stack spacing={3} direction="row" useFlexGap flexWrap="wrap">
                            {showContent && (
                                <>
                                    {
                                        data?.length > 0 ?
                                            dataSource
                                                ?.filter(i=> i.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
                                                .filter(i=> filterDeleted? true : !i.is_deleted)
                                                .map(i => <RenderCard showContent={showContent} data={i} timeout={timeout} key={i.id} deleteEmpty={handleDeleteEmpty}/>)
                                            : <RenderItemsNotFound />
                                    }
                                </>
                            )}

                            <IconButton style={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: green[300], width: '60px', height: '60px' }} onClick={() => setDataSource([...dataSource, { id: (dataSource.length + 1) * -1, name: '', members: [], add: true }])}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
            }
        </Stack>
    )
}

export default Teams;