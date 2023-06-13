import React, { useEffect, useRef, useState } from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import EditMatch from './EditMatch.js'
import { Stack, Typography } from '@mui/material';
import { useActions } from '../../redux/hooks/useActions';
import { deepClone } from '@mui/x-data-grid/utils/utils.js';
import { CreateTournament } from './CreateTournament.js';
import { useGetTournamentsQuery } from '../../redux/component/api/matches.api.js';
import TournamentsListDrawer from './TournamentsListDrawer.js';
import { useGetMatchesQuery } from '../../redux/component/api/matches.api.js';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './Tourn.css'
import cloneDeep from "lodash";

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
    }, []); 

    return windowSize;
}

export function Tournaments() {

    const [selectedMatch, setSelectedMatch] = useState(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverEl, setPopoverEL] = useState({ top: 0, left: 0 });
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const containerRef = useRef(null);

    const [currentMatches, setCurrentMatches]= useState([]);
    const {data, isLoading, isSuccess, isError} = useGetMatchesQuery(selectedIndex, {refetchOnMountOrArgChange: true});

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

    const handleListItemClick = (id, index) => {
        console.log('ClickedItem', {id, index});
        setSelectedIndex(id);
        
        console.log('recivedData',data); 
    };

    useEffect(()=>{
         setCurrentMatches(deepClone(data));
    }, [data])

    return (//Будет реализован master-detailed интерфейс при клике на турнир выскакивает информацию по нему

        <Stack direction="row" sx={{ width: '100%' }} ref={containerRef} >

            <CreateTournament />

            <TournamentsListDrawer handleListItemClick={handleListItemClick}/>

            <Stack direction="column">  

                {
                    currentMatches && currentMatches?.length !==0?
                        <div>
                            <SingleEliminationBracket
                                matches={currentMatches}
                                matchComponent={Match}
                                onMatchClick={handleMatchClick}
                                onPartyClick={handleMouseEnter}
                                svgWrapper={({ children, ...props }) => (
                                    <SVGViewer width={windowSize.width} height={windowSize.height - 150}  {...props}>
                                      {children}
                                    </SVGViewer>
                                )}
                            />

                                <EditMatch 
                                    match={selectedMatch?.match} 
                                    visible={popoverOpen} 
                                    popoverParent={popoverEl}
                                    close={() => setPopoverOpen(false)}
                                    open={() => setPopoverOpen(true)} />
                        </div>
                    :
                       <Typography style={{ position: 'fixed', top: 95, left: 65, }}>
                            <KeyboardBackspaceIcon className='pulse' /> Выберите турнир
                       </Typography>

                }

            </Stack>
        </Stack>

    )

}


