import React, { useEffect, useState} from 'react';
import { SingleEliminationBracket, Match,SVGViewer  } from '@g-loot/react-tournament-brackets';
import EditMatch from'../tests/EditMatchComponent.js'
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import UnfoldLessDoubleSharpIcon from '@mui/icons-material/UnfoldLessDoubleSharp';
import UnfoldMoreDoubleSharpIcon from '@mui/icons-material/UnfoldMoreDoubleSharp';
var ReactDOM = require('react-dom');


var matches = [
  {
    id: 20464,
    name: 'Semi Final - Match 1',
    nextMatchId: 20463,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    //startTime: '2021-07-28T00:00:00.000+00:00',
    state: 'SCORE_DONE',
    participants: [
      {
        id: NaN,
        resultText: null,
        isWinner: false,
        status: 'TBD',
        name: 'TBD',
      },
      {
        id: NaN,
        resultText: null,
        isWinner: false,
        status: 'TBD',
        name: 'TBD',
      },
    ],
  },
  {
    id: 20465,
    name: 'Round 1 - Match 1',
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
    name: 'Round 1 - Match 2',
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
    name: 'Semi Final - Match 2',
    nextMatchId: 20463,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    //startTime: '2021-07-28T00:00:00.000+00:00',
    state: 'WALK_OVER',
    participants: [
      {
        id: NaN,
        resultText: null,
        isWinner: false,
        status: 'TBD',
        name: 'TBD',
      },
      {
        id: NaN,
        resultText: null,
        isWinner: false,
        status: 'TBD',
        name: 'TBD',
      },
    ],
  },
  {
    id: 20468,
    name: 'Round 1 - Match 3',
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
    name: 'Round 1 - Match 4',
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
    name: 'Final - Match',
    nextMatchId: null,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    //startTime: '2021-07-28T01:00:00.000+00:00',
    state: 'TBD',
    participants: [
      {
        id: NaN,
        resultText: null,
        isWinner: false,
        status: 'TBD',
        name: 'TBD',
      },
      { 
        id: NaN,
        resultText: null,
        isWinner: false,
        status: 'TBD',
        name: 'TBD',
      },
    ],
  },
];


const data = [
  {
    id: 87124,
    name: "Match 1",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 53928,
    name: "Match 2",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 21547,
    name: "Match 3",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 67492,
    name: "Match 4",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 38219,
    name: "Match 5",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 12984,
    name: "Match 6",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 76023,
    name: "Match 7",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 98136,
    name: "Match 8",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 56391,
    name: "Match 9",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 47915,
    name: "Match 10",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 30246,
    name: "Match 11",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 89471,
    name: "Match 12",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 62570,
    name: "Match 13",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 71638,
    name: "Match 14",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  },
  {
    id: 84012,
    name: "Match 15",
    nextMatchId: null,
    state: "TBD",
    participants: [],
    isTop: false
  }
];

function linkMatches(data){
  if(data.length === 1) return;
  //Кол-во матчей должно быть нечетное
  //Берем средний элемент и говорим, что он корневой
  let rootIndex = Math.floor(data.length / 2); 
  //data[rootIndex].isTop = true;
  
  //У нас есть корневой элемент, теперь нужно прбежаться по массиву и обозначить дочерние матчи
  let leftSub = data.slice(0, rootIndex);
  let rightSub = data.slice(rootIndex + 1, data.length);

  let childrenIndex = Math.floor(leftSub.length / 2);

  leftSub[childrenIndex].nextMatchId = data[rootIndex].id;
  rightSub[childrenIndex].nextMatchId = data[rootIndex].id;
  
  linkMatches(leftSub);
  linkMatches(rightSub);
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update windowSize state
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup by removing event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return windowSize;
}




export function SingleElimination () {
  
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverEl, setPopoverEL] = useState({top: 0, left: 0});
  const windowSize = useWindowSize();

  const handleMatchClick = (match) => {
    // Получаем название участников матча
    
    console.log('Выбранный матч:', match);
    const element = match.event.currentTarget;
    const elPos = element.getBoundingClientRect();

    setPopoverEL({top: elPos.top, left:elPos.left});

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

  useEffect(()=>{//Срабатывает при первой загрузке
    linkMatches(data);
    console.log(data);
  },[])

  return (

    <div>
      <SingleEliminationBracket
        matches={data}
        matchComponent={Match}
        onMatchClick={handleMatchClick}
        onPartyClick={handleMouseEnter}
        style={{width:'100%', height:'100%'}}
      //  svgWrapper={({ children, ...props }) => (
      //    <SVGViewer width={500} height={500} {...props}>
      //      {children}
      //    </SVGViewer>
      //  )}
      />

      <EditMatch match={selectedMatch?.match} visible={popoverOpen} popoverParent={popoverEl} close={()=> setPopoverOpen(false)} open={()=> setPopoverOpen(true)} />
      
    </div>

      

  )

}

