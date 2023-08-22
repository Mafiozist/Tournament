import React, { useEffect, useState, useRef } from "react";
import { IconButton, Tooltip, MenuItem} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridEditSingleSelectCell, GridRowModes } from '@mui/x-data-grid';
import './Participants.css';
//icons
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close'
import HistoryIcon from '@mui/icons-material/History'
import { useGridApiRef } from '@mui/x-data-grid';
import { useParticipants } from "../../redux/hooks/useParticipants";
import { useActions } from "../../redux/hooks/useActions";
import { green } from "@mui/material/colors";
import { useSnackbar } from 'notistack';
import { useEditOrCreateParticipantMutation, useGetParticipantsQuery,useGetRolesQuery } from "../../redux/component/api/participants.api";
var locale = require('../../common/locale.js');

//This component is worked for adding new users and represent them somehow
export function Participants(props) {
    const apiRef = useGridApiRef();
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        patronymic: false,
        last_name: false,
        first_name: false,
        id: false,
    });
    const [dataSource, setDataSource] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const { enqueueSnackbar } = useSnackbar(); //Сообщения
    const [pageModel, setPageModel] = useState({
        page:0,
        pageSize: 10
    });

    //redux toolkit
    //const { members } = useParticipants();
    //const { addToParticipants, setRemoveFromParticipants, setRowLoading } = useActions();

    //rtk query
    const  {data, isLoading, isSuccess, isError} = useGetParticipantsQuery();
    const [saveParticipant, result] =  useEditOrCreateParticipantMutation();
    //const {roles} = useGetRolesQuery();

    useEffect(()=>{
        setDataSource(data? data: []);
    }, [isSuccess]);

    const handleRowEditStop = (id, addMode = false) => {
        //console.log(id,addMode);
        if(addMode) handleRowDeleteClick(id);

        setColumnVisibilityModel({ ...columnVisibilityModel, patronymic: false, last_name: false, first_name: false, full_name: true })
        apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
        
        if(!addMode) setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } })
    }

    const handleRowDeleteClick = (id) =>{
        if (id <= 0){
            //apiRef.current.updateRows([{id: id, _action: 'delete'}]);
            setDataSource(dataSource.filter(i=> i.id!==id));
            return;
        }


    }

    const handleRowEditStart = (id, addMode=false) =>  {
        setColumnVisibilityModel({...columnVisibilityModel,patronymic:true, last_name: true, first_name: true, full_name: false });
        apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit, isNew: addMode} });
    }

    const handleSaveClick= (id) => {
        setColumnVisibilityModel({...columnVisibilityModel,patronymic:false, last_name: false, first_name: false, full_name: true })
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    }

    const processRowUpdate = (newRow, oldRow)=>{
        const updatedRow = {...newRow, isNew: false};

        //TODO:Добавить функцию загрузки строки
        saveParticipant(newRow).then(succ=>{
            enqueueSnackbar(succ.data.msg, {variant:succ.data.status===1? "success" : "error"});
        })
        .catch((failed)=>enqueueSnackbar(locale.defaultErrorMessage, {variant:'error'}));
        
        return updatedRow;
    }

    const addValueToDS = async (value)=>{
        apiRef.current.setPage(0);
        setDataSource((current)=> [value, ...current],);
    }

    return (

        <div style={{width:'100%', height:'100%'}}>
            <DataGrid
                density="comfortable"
                showCellVerticalBorder
                showColumnVerticalBorder
                initialState={{
                    pagination: {paginationModel: pageModel}
                }}
                paginationModel={pageModel}
                onPaginationModelChange={(model, details)=> setPageModel({page: model.page, pageSize: model.pageSize})}
                pageSizeOptions={[10,20,50]}
                editMode="row"
                //onCellDoubleClick={(params, event)=> event.stopPropagation()}
                onCellKeyDown={(params, event)=> event.stopPropagation()}
                apiRef={apiRef}
                onRowEditStop={(params, event) => handleRowEditStop(params.id)}
                onRowEditStart={(params, event) => handleRowEditStart(params.id)}
                //onCellEditStop={(params, event) => handleRowEditStop(params.id)}
                //onCellEditStart={(params, event) => handleRowEditStart(params.id)}
                processRowUpdate={processRowUpdate}
                loading={isLoading}
                rowModesModel={rowModesModel}
                onRowModesModelChange={(m) => {
                    setRowModesModel(m);
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                getRowClassName={(params)=> params.row.is_deleted? "row-deleted" : ""}
                autoHeight
                rowSelection={false}
                onProcessRowUpdateError={(error)=> enqueueSnackbar(error, {variant:'error'})}
                localeText={locale.muiDataGridLocale}
                rows={dataSource}
                columns={[
                    { field: 'id', headerName: 'ID', width: 70},
                    { field: 'last_name', headerName: locale.lastNameLocale, editable: true, width:120, },
                    { field: 'first_name', headerName: locale.firstNameLocale, editable: true, width:120, },
                    { field: 'patronymic', headerName: locale.patronymicLocale, editable: true, width:120, },
                    {
                        field: 'full_name', headerName: locale.fioLocale,  sortable: false, width:350,
                        //description: 'Тут может быть ваше описание',
                        sortable: true,
                        type: "string",
                        sortComparator: (a,b) => a.toString().toLowerCase().localeCompare(b.toString().toLowerCase()),
                        valueGetter: (params) =>
                            `${params.row.last_name || ''} ${params.row.first_name || ''} ${params.row.patronymic || ''}`,
                    },
                    { 
                        field: 'birth_date',  headerName: locale.yearsOldLocale, type:'date', width:120, editable: true,
                        valueFormatter: (params)=>{
                            if(!params.value) return "";

                            var birthDate = new Date(params.value);
                            var yearsOld = new Date().getFullYear() - birthDate?.getFullYear();

                            if(birthDate.getMonth() < new Date().getMonth()){
                                yearsOld -= 1;
                            }

                            return yearsOld;
                        },
                    },
                    { field: 'gender', headerName: locale.genderLocale, type: 'singleSelect', valueOptions: ["Ж", "М"], width:70, editable: true },
                    { field: 'id_role', headerName: 'Роль',  type:"singleSelect", editable: true, 
                        getOptionLabel: (val)=> val.name,
                        getOptionValue: (val)=> val.id_role,
                        valueOptions: [{id_role: 1, name:'участник'},{id_role: 2, name:'админ'},],//Пока не решил проблему загрузки ролей из базы, потому хардкод
                        
                    },
                    { field: 'id_depart', headerName: locale.departLocale, type:"singleSelect", editable: true,  valueOptions:[12, 44, 55, 66, 15]},
                    { field: 'is_deleted',  headerName: locale.deletedLocale, type: 'boolean', editable: true },
                    {
                        field: 'actions', type:'actions',  headerName: '', sortable: false,minWidth:100, flex: 1,
                        getActions: (params) => {
                            const editMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
                            const addMode = editMode && rowModesModel[params.id]?.isNew;

                            if(editMode || addMode){

                                return [
                                    <GridActionsCellItem
                                        icon={<SaveIcon />}
                                        label={locale.saveLocale}
                                        sx={{ color: 'green' }}
                                        onClick={()=> handleSaveClick(params.id)}
                                        size="large"
                                    />,
                                    <GridActionsCellItem
                                        icon={<CloseIcon />}
                                        label={locale.cancelLocale}
                                        sx={{ color: 'orange' }}
                                        onClick={()=> handleRowEditStop(params.id, addMode)}
                                        size="large"
                                    />,
                                ];

                            }

                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label={locale.changeLocale}
                                    sx={{ color: 'black' }}
                                    onClick={() => handleRowEditStart(params.id)}
                                    size="large"
                                />,
                                <GridActionsCellItem
                                    icon={<HistoryIcon />}
                                    label={locale.hasInTeamsLocale}
                                    sx={{ color: 'black' }}
                                    onClick={() => handleRowEditStop(params.id, addMode)}
                                    size="large"
                                />
                            ];
                        }
                    },
                ]}
            />

            <IconButton
                style={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: green[300], width: '60px', height: '60px' }}
                onClick={() => {
                    var a = dataSource.length;
                    var b= a? a * -1 : 0;
                    var newVal = { id: b, first_name: '', last_name: '', patronymic: '', age: '', gender: 'М', id_role: 1, id_depart: 12, is_deleted: false, loading: false, isNew: true };

                    addValueToDS(newVal);
                    handleRowEditStart(b, true);
                }}>
                <AddIcon />
            </IconButton>
        </div>
    );
}

