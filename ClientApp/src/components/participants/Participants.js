import React, { useEffect, useState } from "react";
import { Component } from "react";
import {IconButton, InputLabel, Popover, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import { SpeedDial, SpeedDialAction, Backdrop, SpeedDialIcon } from "@mui/material";
import {LoadingButton} from "@mui/lab"

//icons
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import Tooltip from '@mui/material/Tooltip';
import { Select,FormControl,MenuItem } from "@mui/base";
import { GridApi ,useGridApiContext,useGridApiRef } from '@mui/x-data-grid';
import EditDialog from "./EditDialog";
import { useParticipants } from "../../redux/hooks/useParticipants";
import { useActions } from "../../redux/hooks/useActions";
import { Button } from "reactstrap";
import { event } from "jquery";
import { green, red } from "@mui/material/colors";

//This component is worked for adding new users and represent them somehow

const actions = [
    {icon: <AddIcon/>, name: 'Добавить'},
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export function Participants() {
    const [loading, setLoading]= useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenAddDialog = () =>{
        setAddState(true);
        handleClose();
        setShowEditDialog({open: true, id: undefined});
    }
    const apiRef = useGridApiRef();
    const [addState, setAddState] = useState(false);

    //edit-form
    const [showEditDialog, setShowEditDialog] = useState({open: false, id: 0});

    const {members} = useParticipants();
    const { addToParticipants, setRemoveFromParticipants, setRowLoading} = useActions();

    //const [age, setAge] = React.useState(12);

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        "patronymic": false,
        second_name: false,
        first_name: false,
        id:false,
        is_deleted:false,
    }); 

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'second_name', headerName: 'Фамилия'},
        { field: 'first_name', headerName: 'Имя'},
        { field: 'patronymic', headerName: 'Отчество'},
        {
            field: 'full_name',
            headerName: 'ФИО',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            flex: 1,
            valueGetter: (params) =>
              `${params.row.second_name || ''} ${params.row.first_name || ''} ${params.row.patronymic || ''}` ,
        },
        { field: 'age', headerName: 'Возраст',flex: 1, },
        { field: 'gender', headerName: 'Пол'},
        { field: 'role', headerName: 'Роль',flex: 1,},
        { field: 'depart', headerName: 'Отдел/Цех',flex: 1,},
        {
          field: 'is_deleted',
          headerName: 'Удален',
          type: 'boolean',
          //renderCell: (str)=> str;
        },
        {
            field: 'action',
            headerName: '',
            width: 180,
            sortable: false,
            //disableClickEventBubbling: true,

            renderCell: (params) => {

                const remove = (e) => {
                  setRowLoading({row: params.row, loading: true});
                  const currentRow = params.row;
                  
                  setTimeout(() => {
                    setRemoveFromParticipants({row: currentRow, is_deleted: true});
                  }, 400);
                };
                
                const back = (e) => {
                    setRowLoading({row: params.row, loading: true});
                    const currentRow = params.row;
                    
                    setTimeout(() => {
                        setRemoveFromParticipants({row: currentRow, is_deleted: false});
                    }, 400);
                };

                return (
                    
                    params.row.is_deleted?

                            <Tooltip title="Вернуть" placement="right">
                                <LoadingButton loading={params.row.loading}  variant="text" loadingPosition="center" onClick={back}><UndoIcon/></LoadingButton>
                            </Tooltip>
                            :
                            <Tooltip title="Удалить" placement="right"> 
                                <LoadingButton loading={params.row.loading} variant="text" color="error" loadingPosition="center" onClick={remove}><DeleteIcon/></LoadingButton >
                            </Tooltip>
                    
                );
            },
        },
      ];
      
      const rows = [
        { id: 1, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович', age: 33, gender: 'М', role: 'участник',depart: 1, is_deleted: false, loading: false },
        { id: 2, first_name: 'SnowSnow', second_name: 'Jon', patronymic:'Олегович', age: 23, gender: 'М', role: 'участник',depart: 2, is_deleted: false, loading: false },
        { id: 3, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович', age: 41, gender: 'М', role: 'участник',depart: 3, is_deleted: false, loading: false },
        { id: 4, first_name: 'SnowSnow', second_name: 'Jon', patronymic:'Олегович', age: 12, gender: 'М', role: 'участник',depart: 4, is_deleted: false, loading: false },
        { id: 5, first_name: 'Snow', second_name: 'Json', patronymic:'Олегович', age: 32, gender: 'М', role: 'участник',depart: 5, is_deleted: true, loading: false },
        { id: 6, first_name: 'Snow', second_name: 'Json', patronymic:'Олегович', age: 33, gender: 'М', role: 'участник',depart: 6, is_deleted: false, loading: false },
        { id: 7, first_name: 'Sanow', second_name: 'Json', patronymic:'Олегович', age: 44, gender: 'М', role: 'участник',depart: 7, is_deleted: false, loading: false },
        { id: 8, first_name: 'Snow', second_name: 'Josn', patronymic:'Олегович', age: 55, gender: 'М', role: 'участник',depart: 8, is_deleted: true, loading: false },
        { id: 9, first_name: 'Snaow', second_name: 'Jon', patronymic:'Олегович', age: 12, gender: 'М', role: 'участник',depart: 9, is_deleted: false, loading: false },
        { id: 10, first_name: 'SnowSnow', second_name: 'Joxn', patronymic:'Олегович', age: 123, gender: 'М', role: 'участник',depart: 10, is_deleted: false, loading: false },
        { id: 11, first_name: 'Snasow', second_name: 's', patronymic:'Олегович', age: 332, gender: 'М', role: 'участник',depart: 11, is_deleted: false , loading: false},
        { id: 12, first_name: 'Snsdaow', second_name: 'Jon', patronymic:'Олегович',age: 22, gender: 'М', role: 'участник',depart: 12, is_deleted: false, loading: false },
        { id: 13, first_name: 'Snosw', second_name: 'Jsson', patronymic:'Олегович',age: 55, gender: 'М', role: 'участник',depart: 13, is_deleted: false, loading: false },
        { id: 14, first_name: 'Sansaow', second_name: 'Jon', patronymic:'Олегович',age: 77, gender: 'М', role: 'участник',depart: 14, is_deleted: false, loading: false },
        { id: 15, first_name: 'Snsaow', second_name: 'Josan', patronymic:'Олегович',age: 6, gender: 'М', role: 'участник',depart: 15, is_deleted: false, loading: false },
        { id: 16, first_name: 'S1anow', second_name: 'Jon', patronymic:'Олегович',age: 3566, gender: 'М', role: 'участник',depart: 16, is_deleted: false, loading: false },
        { id: 17, first_name: 'Sn2ow', second_name: 'Jon', patronymic:'Олегович',age: 35, gender: 'М', role: 'участник',depart: 17, is_deleted: false, loading: false },
        { id: 18, first_name: 'Sndaow', second_name: 'Jon', patronymic:'Олегович',age: 345, gender: 'М', role: 'участник',depart: 18, is_deleted: false, loading: false },
        { id: 19, first_name: 'Sndsaow', second_name: 'Jon', patronymic:'Олегович',age: 345, gender: 'М', role: 'участник',depart: 19, is_deleted: false, loading: false },
        { id: 20, first_name: 'Snasow', second_name: 'Jon', patronymic:'Олегович',age: 3565, gender: 'М', role: 'участник',depart: 20, is_deleted: false, loading: false },
        { id: 21, first_name: 'Ssnow', second_name: 'Jon', patronymic:'Олегович',age: 3545, gender: 'М', role: 'участник',depart: 21, is_deleted: false, loading: false },
        { id: 22, first_name: 'Ssnow', second_name: 'Jon', patronymic:'Олегович',age: 456, gender: 'М', role: 'участник',depart: 22, is_deleted: true, loading: false },
        { id: 23, first_name: 'Snoaw', second_name: 'Jon', patronymic:'Олегович',age: 3555, gender: 'М', role: 'участник',depart: 23, is_deleted: false, loading: false },
        { id: 24, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович',age: 3545, gender: 'М', role: 'участник',depart: 24, is_deleted: false, loading: false },
        { id: 25, first_name: 'Sanow', second_name: 'Jon', patronymic:'Олегович',age: 354645, gender: 'М', role: 'участник',depart: 22, is_deleted: false, loading: false },
        { id: 26, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович',age: 359, gender: 'М', role: 'участник',depart: 26, is_deleted: false, loading: false },
        { id: 27, first_name: 'Snsow', second_name: 'Jon', patronymic:'Олегович',age: 305, gender: 'М', role: 'участник',depart: 23, is_deleted: false, loading: false },
        { id: 28, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович',age: 315, gender: 'М', role: 'участник',depart: 12, is_deleted: false, loading: false },
        { id: 29, first_name: 'Snow', second_name: 'Jon',patronymic:'Олегович', age: 325, gender: 'М', role: 'участник',depart: 21, is_deleted: false, loading: false },
      ];
    

    return (

        <div>
            <EditDialog id={addState? '' : showEditDialog.id} visible={showEditDialog.open} close={setShowEditDialog} addState={addState}/> 
            <Button onClick={()=> {
                setLoading(true);
                setTimeout(() => {
                    rows.forEach(item => {
                        console.log('Готовлюсь грузить', {...item});
                        addToParticipants({...item})
                    })
                    setLoading(false);
                }, 1000);

            }}>Задать состояния</Button>
            <Button onClick={()=> {console.log(members)}}>Показать состояния</Button>
        
            <DataGrid 
                apiRef={apiRef}
                loading={loading}
                rows={members? members : ''}
                columns={columns}
                initialState={{
                    
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                //autoPageSize={true}
                autoHeight={true}
                onCellClick={(params, event)=> { 
                    if(params.field !== 'action') {
                        setAddState(false);
                        setShowEditDialog({open:true, id:params.row.id}); 
                    }
                 }}
            />

            <Backdrop open={open} />
            
            {/* <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'fixed', bottom: 0, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleOpenAddDialog}
                    />
                ))}
            </SpeedDial> */}
            
            <IconButton
            style={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: green[300], width: '60px', height: '60px' }}
            onClick={handleOpenAddDialog}>
                <AddIcon />
            </IconButton>
        </div>
    );
}