import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import GroupsIcon from '@mui/icons-material/Group';
import { useState, useRef } from 'react'
import { Popover } from '@mui/material';
import { useLazyGetTeamsMembersQuery } from '../../redux/component/api/teams.api';
import { IconButton } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter, useGridApiRef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import './teams.css';
import { enqueueSnackbar } from 'notistack';
import { Group } from 'antd/es/avatar';
var locale = require('../../common/locale.js');

export function TeamMembers(props) {
    //data grid api
    const apiRef = useGridApiRef();
    const [selectOpen, setSelectOpen] = useState(false);
    const [teamMembersLoading, setTeamMembersLoading] = useState(false);

    const [trigger] = useLazyGetTeamsMembersQuery();//возвращает триггер от которого нужно зависеть

    const refBtn = useRef(null);//Отвечает за позиционирование таблицы выбора

    const handleOpenSelectParticipants = (e) => {
        setTeamMembersLoading(true);
        trigger(props.team.id).unwrap().then(succ => {
            if (succ.status === 1) {
                props.setSelected(succ.data);
            }
            enqueueSnackbar(succ.msg, { variant: succ.status === 1 ? "success" : 'error' });
        })
         .catch(failed => enqueueSnackbar(locale.teamsMembersGetErrorMessage, { variant: 'error' }))
         .finally(end => {
            //Для небольшого показа загрузки
            setTimeout(() => {
                setTeamMembersLoading(false);
                setSelectOpen(true);
            }, 250);
         });
    }

    return (
        <span>
            <LoadingButton title={locale.addMemToTeamLocale} loading={teamMembersLoading} children={<GroupsIcon />} ref={refBtn} onClick={handleOpenSelectParticipants} />
            <Popover anchorEl={refBtn.current} open={selectOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={()=>setSelectOpen(false)}>
                <DataGrid
                    //style={{minHeight:'120'}}
                    apiRef={apiRef}
                    disableColumnMenu
                    rowSelection={true}
                    rows={props.data}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },

                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    checkboxSelection
                    columnVisibilityModel={{ patronymic: false, last_name: false, first_name: false, id: false }}
                    rowSelectionModel={props.selected}
                    onRowSelectionModelChange={(selected, details) => {
                        props.setSelected(selected);
                        //console.log(selected, details);
                    }}
                    onRowClick={(params, event, details) => {
                        if (props?.selected.find(i => i === params.id)) {
                            props.setSelected(props.selected.filter(i => i !== params.id));
                        }
                        else props.setSelected([...props.selected, params.id]);
                        //console.log(selected, details);
                    }}
                    getRowClassName={() => "row-cursor"}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70, },
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
                                        setSelectOpen(false);
                                    }} />
                                </Group>
                            }
                        },
                    ]}
                    localeText={locale.muiDataGridLocale}
                />
            </Popover>
        </span>
    );
}