import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Tooltip } from "@mui/material";
import { Modal } from "antd";
import React, { useState } from 'react';
import TransferTableList from "./TransferTableList";

export function CreateTournament(props) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (//Добавить форму и валидацию
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>

            <Modal
                title="Создание турнира"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={'50%'}
                style={{ minWidth: '600px' }}
            >

                <Stack direction="column" spacing={1}>

                    <Stack direction="row" spacing={1} justifyContent="center">
                        <TextField variant="outlined" label='Название турнира'>

                        </TextField>
                        <TextField variant="outlined" label='Место проведения' >

                        </TextField>


                        <FormGroup>
                            <Tooltip placement="top" title="Отметьте, если необходимы групповые матчи" arrow>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Группа?" />
                            </Tooltip>
                            {/* <FormControlLabel required control={<Checkbox />} label="Required" />
                            <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                        </FormGroup>

                    </Stack>

                    <TransferTableList />

                </Stack>





            </Modal>
        </>
    );
}