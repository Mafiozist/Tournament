import React, { useEffect, useState } from 'react';
import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';
import EditMatch from './EditMatch.js'
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Input, Stack, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useMatches } from '../../redux/hooks/useMatches.js';
import { useActions } from '../../redux/hooks/useActions';
import cloneDeep from 'lodash/cloneDeep';
import { deepClone } from '@mui/x-data-grid/utils/utils.js';
import { CreateTournament } from './CreateTournament.js';

var ReactDOM = require('react-dom');


function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {

        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run the effect only once

    return windowSize;
}

function renderRow(props) {
    const { index, style } = props;
    return (
        <ListItem divider style={style} key={index} component="div" disablePadding>
            <ListItemButton >
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}


export function Tournaments() {

    const [selectedMatch, setSelectedMatch] = useState(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverEl, setPopoverEL] = useState({ top: 0, left: 0 });
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const {createMatches, updateMatch} = useActions();
    const {matches} = useMatches();
    const [currentMatches, setCurrentMatches]= useState([]);

    const windowSize = useWindowSize();

    const handleMatchClick = (match) => {
        // Получаем название участников матча

        console.log('Выбранный матч:', match);
        const element = match.event.currentTarget;
        const elPos = element.getBoundingClientRect();
        
        setPopoverEL({ top: elPos.top, left: elPos.left });

        // Обновляем состояние выбранного матча
        setSelectedMatch(match);
        setPopoverOpen(true);
    };

    const handleMouseEnter = (match) => {
        // Получаем название участников матча

        console.log('Entered:', match);
        // Обновляем состояние выбранного матча
        setSelectedMatch(match.match);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(()=>{
        setCurrentMatches(deepClone(matches));
    }, [matches])

    return (//Будет реализован master-detailed интерфейс при клике на турнир выскакивает информацию по нему

        <Stack direction="row">
            <Stack style={{ marginTop: '10px', minWidth: "200px" }}>
                <Button  variant='outlined' style={{marginBottom:'25px', marginTop:'15px'}} onClick={()=> {createMatches(initialData)}}>Создать турнир</Button>
                <FixedSizeList
                    itemSize={70}
                    //itemCount={99}
                    overscanCount={5}
                    height={windowSize.height - 300}

                >
                    {renderRow}

                </FixedSizeList>
            </Stack>

            <Stack direction="column">  

                <CreateTournament />

                {
                    currentMatches.length !==0?
                        <div>
                            <SingleEliminationBracket
                                matches={currentMatches}
                                matchComponent={Match}
                                onMatchClick={handleMatchClick}
                                onPartyClick={handleMouseEnter}
                                width={windowSize.width}
                                height={windowSize.height}

                            />

                                <EditMatch 
                                    match={selectedMatch?.match} 
                                    visible={popoverOpen} 
                                    popoverParent={popoverEl}
                                    close={() => setPopoverOpen(false)}
                                    open={() => setPopoverOpen(true)} />
                        </div>
                    :
                        <div></div>

                }

            </Stack>
        </Stack>

    )

}

const initialData = [
    {
        id: 20464,
        id_tourn: 1,
        //name: 'Semi Final - Match 1',
        nextMatchId: 20463,
        nextLooserMatchId: null,
        tournamentRoundText: '2',
        //startTime: '2021-07-28T00:00:00.000+00:00',
        state: 'TBD',
        participants: [
        ],
    },
    {
        id: 20465,
        //name: 'Round 1 - Match 1',
        id_tourn: 1,
        nextMatchId: 20464,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        //startTime: '2021-07-27T23:00:00.000+00:00',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1d11ce35-de11-49de-b48e-cec5427eb82c',
                resultText: null,
                isWinner: false,
                status: 'TBD',
                name: 'Alex',
            },
            {
                id: 'a504c49a-e9b2-4a2e-b4b8-a2c11651c356',
                resultText: '',
                isWinner: false,
                status: 'PLAYED',
                name: 'BTC',
            },
        ],
    },
    {
        id: 20466,
        id_tourn: 1,
        //name: 'Round 1 - Match 2',
        nextMatchId: 20464,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        //startTime: '2021-07-27T23:00:00.000+00:00',
        state: 'WALK_OVER',
        participants: [
            {
                id: '9fd1f0e6-eb92-4159-a96d-6657fbdd963e',
                resultText: null,
                isWinner: false,
                status: null,
                name: 'GlootOne',
            },
            {
                id: '9fd1f0e6-eb12-4159-a96d-6657fbdd963e',
                resultText: null,
                isWinner: false,
                status: null,
                name: 'Player34',
            },
        ],
    },
    {
        id: 20467,
        id_tourn: 1,
        //name: 'Semi Final - Match 2',
        nextMatchId: 20463,
        nextLooserMatchId: null,
        tournamentRoundText: '2',
        //startTime: '2021-07-28T00:00:00.000+00:00',
        state: 'TBD',
        participants: [

        ],
    },
    {
        id: 20468,
        id_tourn: 1,
        //name: 'Round 1 - Match 3',
        nextMatchId: 20467,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        //startTime: '2021-07-27T23:00:00.000+00:00',
        state: 'WALK_OVER',
        participants: [
            {
                id: 'b9a3cc7a-95d9-483a-b515-f24bd0531f45',
                resultText: null,
                isWinner: false,
                status: null,
                name: 'spacefudg3',
            },
            {
                id: 'b9a3cc7a-9569-483a-b515-f24bd0531f45',
                resultText: null,
                isWinner: false,
                status: null,
                name: 'Player69',
            },
        ],
    },
    {
        id: 20469,
        id_tourn: 1,
        //name: 'Round 1 - Match 4',
        nextMatchId: 20467,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        //startTime: '2021-07-27T23:00:00.000+00:00',
        state: 'TBD',
        participants: [
            {
                id: '7535778a-24db-423f-928b-ca237cff67fc',
                resultText: null,
                isWinner: false,
                status: 'TBD',
                name: 'SeatloN',
            },
            {
                id: '7535778s-24db-423f-928b-ca237cff67fc',
                resultText: null,
                isWinner: false,
                status: 'TBD',
                name: 'Shit',
            },
        ],
    },
    {
        id: 20463,
        id_tourn: 1,
        //name: 'Final - Match',
        nextMatchId: null,
        nextLooserMatchId: null,
        tournamentRoundText: '3',
        //startTime: '2021-07-28T01:00:00.000+00:00',
        state: 'TBD',
        participants: [
        ],
    },
];
