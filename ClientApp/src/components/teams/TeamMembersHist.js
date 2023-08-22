import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import { useState, useRef } from 'react'
import { Popover } from '@mui/material';
import { IconButton } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter, useGridApiRef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import './teams.css';
import { enqueueSnackbar } from 'notistack';
import { Group } from 'antd/es/avatar';
import { useLazyGetTeamsMembersHistoryQuery } from '../../redux/component/api/history.api';

var locale = require('../../common/locale.js');

export function TeamMembersHist(props){
    const [historyLoading, setHistoryLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [getTeamsMembers] = useLazyGetTeamsMembersHistoryQuery()

    const refBtn = useRef(null);//Отвечает за позиционирование таблицы выбора
    const apiRef = useGridApiRef();

    const handleHistoryShow = async ()=>{
        setHistoryLoading(true);
        
        getTeamsMembers(props.data.id)
        .then(succ=>{
            
            enqueueSnackbar(succ.data.msg, { variant: succ.data.status === 1 ? "success" : 'error' })

            if(succ.data.status === 1 && succ.data.data?.length>0){
                setDataSource(succ.data.data);
                setOpen(true);
            }
        })
        .catch(failed => {
            console.log(locale.teamsMembersHistoryGetErrorMessage, failed);
            enqueueSnackbar(locale.teamsMembersHistoryGetErrorMessage, { variant: 'error' })
        })
        .finally(end => {
            setHistoryLoading(false);
        });
    }

    return(
        <span>
            <LoadingButton ref={refBtn} title={locale.showTeamMembersHistoryLocale} loading={historyLoading} children={<HistoryIcon />} onClick={handleHistoryShow} />

            <Popover anchorEl={refBtn.current} open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={()=>setOpen(false)}>
                <DataGrid
                    apiRef={apiRef}
                    disableColumnMenu
                    rowSelection={false}
                    rows={dataSource}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    autoHeight
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    getRowClassName={(params)=> params.row.type === 'del' ? "row-deleted" : "row-added"}
                    columnVisibilityModel={{ patronymic: false, last_name: false, first_name: false, id: false }}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70,editable: false, },
                        { field: 'last_name', headerName: locale.lastNameLocale, type: "string", editable: false, flex: 1 },
                        { field: 'first_name', headerName: locale.firstNameLocale, type: "string", editable: false, flex: 1, },
                        { field: 'patronymic', headerName: locale.patronymicLocale, type: "string", editable: false, flex: 1, },
                        {
                            field: 'full_name', headerName: locale.fioLocale, sortable: false, width: 270,
                            //description: 'ФИО',
                            sortable: true,
                            type: "string",
                            sortComparator: (a, b) => a.toString().toLowerCase().localeCompare(b.toString().toLowerCase()),
                            valueGetter: (params) =>
                                `${params.row.last_name || ''} ${params.row.first_name || ''} ${params.row.patronymic || ''}`,

                            renderHeader: () => {
                                return <Group>
                                    <GridToolbarQuickFilter onClick={e => e.stopPropagation()} placeholder={`${locale.startToInputLocale} ${locale.fioLocale}`} />
                                    <IconButton children={<CheckIcon />} title={locale.applyChoiceLocale} onClick={(e) => {
                                        e.stopPropagation();
                                        setOpen(false);
                                    }} />
                                </Group>
                            }
                        },
                        { 
                            field: 'dt', headerName: locale.dateTimeLabelLocale, type: "date", editable: false, flex: 1, minWidth: 160, 
                            sortComparator: (a,b,p1,p2) => new Date(a) - new Date(b),
                            valueFormatter: (v)=> new Date(v.value).toLocaleString()
                        },
                    ]}
                    localeText={locale.muiDataGridLocale}
                />
            </Popover>

        </span>
    );
}