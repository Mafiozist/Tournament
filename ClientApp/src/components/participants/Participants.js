import React, { useState } from "react";
import { Component } from "react";
import {InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { SpeedDial, SpeedDialAction, Backdrop, SpeedDialIcon } from "@mui/material";

//icons
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add'

import { Select,FormControl,MenuItem } from "@mui/base";
import { GridApi ,useGridApiContext,useGridApiRef } from '@mui/x-data-grid';
import EditDialog from "./EditDialog";
import { useParticipants } from "../../redux/hooks/useParticipants";
import { useActions } from "../../redux/hooks/useActions";
import { Button } from "reactstrap";

//This component is worked for adding new users and represent them somehow

const actions = [
    {icon: <AddIcon/>, name: 'Добавить'},
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export function Participants() {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const apiRef = useGridApiRef();

    //edit-form
    const [showEditDialog, setShowEditDialog] = useState({open: false, id: 0});

    const {members} = useParticipants();
    const { addToParticipants, removeFromParticipants} = useActions();

    //const [age, setAge] = React.useState(12);

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        "patronymic": false,
        second_name: false,
        first_name: false,
        id:false,
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
            valueGetter: (params) =>
              `${params.row.second_name || ''} ${params.row.first_name || ''} ${params.row.patronymic || ''}` ,
        },
        { field: 'age', headerName: 'Возраст' },
        { field: 'gender', headerName: 'Пол'},
        { field: 'role', headerName: 'Роль'},
        { field: 'depart', headerName: 'Отдел/Цех'},
        {
          field: 'is_deleted',
          headerName: 'Удален',
          type: 'boolean',
          //renderCell: (str)=> str;
        },
        
      ];
      
      const rows = [
        { id: 1, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович', age: 33, gender: 'М', role: 'участник',depart: 1, is_deleted: false },
        { id: 2, first_name: 'SnowSnow', second_name: 'Jon', patronymic:'Олегович', age: 23, gender: 'М', role: 'участник',depart: 2, is_deleted: false },
        { id: 3, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович', age: 41, gender: 'М', role: 'участник',depart: 3, is_deleted: false },
        { id: 4, first_name: 'SnowSnow', second_name: 'Jon', patronymic:'Олегович', age: 12, gender: 'М', role: 'участник',depart: 4, is_deleted: false },
        { id: 5, first_name: 'Snow', second_name: 'Json', patronymic:'Олегович', age: 32, gender: 'М', role: 'участник',depart: 5, is_deleted: true },
        { id: 6, first_name: 'Snow', second_name: 'Json', patronymic:'Олегович', age: 33, gender: 'М', role: 'участник',depart: 6, is_deleted: false },
        { id: 7, first_name: 'Sanow', second_name: 'Json', patronymic:'Олегович', age: 44, gender: 'М', role: 'участник',depart: 7, is_deleted: false },
        { id: 8, first_name: 'Snow', second_name: 'Josn', patronymic:'Олегович', age: 55, gender: 'М', role: 'участник',depart: 8, is_deleted: true },
        { id: 9, first_name: 'Snaow', second_name: 'Jon', patronymic:'Олегович', age: 12, gender: 'М', role: 'участник',depart: 9, is_deleted: false },
        { id: 10, first_name: 'SnowSnow', second_name: 'Joxn', patronymic:'Олегович', age: 123, gender: 'М', role: 'участник',depart: 10, is_deleted: false },
        { id: 11, first_name: 'Snasow', second_name: 's', patronymic:'Олегович', age: 332, gender: 'М', role: 'участник',depart: 11, is_deleted: false },
        { id: 12, first_name: 'Snsdaow', second_name: 'Jon', patronymic:'Олегович',age: 22, gender: 'М', role: 'участник',depart: 12, is_deleted: false },
        { id: 13, first_name: 'Snosw', second_name: 'Jsson', patronymic:'Олегович',age: 55, gender: 'М', role: 'участник',depart: 13, is_deleted: false },
        { id: 14, first_name: 'Sansaow', second_name: 'Jon', patronymic:'Олегович',age: 77, gender: 'М', role: 'участник',depart: 14, is_deleted: false },
        { id: 15, first_name: 'Snsaow', second_name: 'Josan', patronymic:'Олегович',age: 6, gender: 'М', role: 'участник',depart: 15, is_deleted: false },
        { id: 16, first_name: 'S1anow', second_name: 'Jon', patronymic:'Олегович',age: 3566, gender: 'М', role: 'участник',depart: 16, is_deleted: false },
        { id: 17, first_name: 'Sn2ow', second_name: 'Jon', patronymic:'Олегович',age: 35, gender: 'М', role: 'участник',depart: 17, is_deleted: false },
        { id: 18, first_name: 'Sndaow', second_name: 'Jon', patronymic:'Олегович',age: 345, gender: 'М', role: 'участник',depart: 18, is_deleted: false },
        { id: 19, first_name: 'Sndsaow', second_name: 'Jon', patronymic:'Олегович',age: 345, gender: 'М', role: 'участник',depart: 19, is_deleted: false },
        { id: 20, first_name: 'Snasow', second_name: 'Jon', patronymic:'Олегович',age: 3565, gender: 'М', role: 'участник',depart: 20, is_deleted: false },
        { id: 21, first_name: 'Ssnow', second_name: 'Jon', patronymic:'Олегович',age: 3545, gender: 'М', role: 'участник',depart: 21, is_deleted: false },
        { id: 22, first_name: 'Ssnow', second_name: 'Jon', patronymic:'Олегович',age: 456, gender: 'М', role: 'участник',depart: 22, is_deleted: true },
        { id: 23, first_name: 'Snoaw', second_name: 'Jon', patronymic:'Олегович',age: 3555, gender: 'М', role: 'участник',depart: 23, is_deleted: false },
        { id: 24, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович',age: 3545, gender: 'М', role: 'участник',depart: 24, is_deleted: false },
        { id: 25, first_name: 'Sanow', second_name: 'Jon', patronymic:'Олегович',age: 354645, gender: 'М', role: 'участник',depart: 22, is_deleted: false },
        { id: 26, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович',age: 359, gender: 'М', role: 'участник',depart: 26, is_deleted: false },
        { id: 27, first_name: 'Snsow', second_name: 'Jon', patronymic:'Олегович',age: 305, gender: 'М', role: 'участник',depart: 23, is_deleted: false },
        { id: 28, first_name: 'Snow', second_name: 'Jon', patronymic:'Олегович',age: 315, gender: 'М', role: 'участник',depart: 12, is_deleted: false },
        { id: 29, first_name: 'Snow', second_name: 'Jon',patronymic:'Олегович', age: 325, gender: 'М', role: 'участник',depart: 21, is_deleted: false },
      ];
      
      
    return (

        <div>
            <EditDialog id={showEditDialog.id} visible={showEditDialog.open} close={setShowEditDialog}/> 
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
            <TextField id="outlined-basic" label="Удалить" variant="outlined"  type='number' onInput={(event) => {removeFromParticipants({id: event.target.value});}}/>

            <DataGrid 
                apiRef={apiRef}
                //stickyHeader
                //slots={baseSelect}
                loading={loading}
                rows={members? members : ''}
                columns={columns}
                initialState={{
                    // pagination: {
                    //     paginationModel: { page: 0, pageSize: 5 },
                    // },
                    
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                //autoPageSize={true}
                autoHeight={true}
                onRowClick={(params)=> { setShowEditDialog({open:true, id:params.row.id});  }}
            />

            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>

        </div>
    );
}