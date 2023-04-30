import React, { Component, useState} from 'react';
import {useWindowSize}  from '@react-hooks-library/core'
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer, MATCH_STATES } from '@g-loot/react-tournament-brackets';
var ReactDOM = require('react-dom');


function SingleEliminationFunc(){

    //const [width, height] = useWindowSize(100, 100);
    const matches = [
      {
        id: 260005,
        name: 'Final - Match',
        nextMatchId: null,
        nextLooserMatchId: null,
        tournamentRoundText: '4',
        startTime: '2021-05-30',
        state: 'SCHEDULED',
        participants: [
          {
            id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc',
            resultText: null,
            isWinner: false,
            status: null,
            name: 'giacomo123',
          },
          {
            id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
            resultText: null,
            isWinner: false,
            status: null,
            name: 'Ant',
          },
        ],
      },
      {
        id: 260006,
        name: 'Semi Final - Match 1',
        nextMatchId: 260005,
        nextLooserMatchId: null,
        tournamentRoundText: '3',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc',
            resultText: '1',
            isWinner: true,
            status: 'PLAYED',
            name: 'giacomo123',
          },
          {
            id: '008de019-4af6-4178-a042-936c33fea3e9',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'TowbyTest',
          },
        ],
      },
      {
        id: 260013,
        name: 'Semi Final - Match 2',
        nextMatchId: 260005,
        nextLooserMatchId: null,
        tournamentRoundText: '3',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '9c92feb3-4aa4-4475-a34e-f9a200e21aa9',
            resultText: null,
            isWinner: false,
            status: 'NO_SHOW',
            name: 'WubbaLubbaDubbish',
          },
          {
            id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
            resultText: null,
            isWinner: true,
            status: 'WALK_OVER',
          },
        ],
      },
      {
        id: 260007,
        name: 'Round 2 - Match 1',
        nextMatchId: 260006,
        nextLooserMatchId: null,
        tournamentRoundText: '2',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '1ec356ec-a7c4-4026-929b-3657286a92d8',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'TestSpectacles',
          },
          {
            id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc',
            resultText: '0',
            isWinner: true,
            status: 'PLAYED',
          },
        ],
      },
      {
        id: 260010,
        name: 'Round 2 - Match 2',
        nextMatchId: 260006,
        nextLooserMatchId: null,
        tournamentRoundText: '2',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'c2f551b4-2d5a-4c59-86a8-df575805256a',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'Ahshitherewegoagain',
          },
          {
            id: '008de019-4af6-4178-a042-936c33fea3e9',
            resultText: '1',
            isWinner: true,
            status: 'PLAYED',
          },
        ],
      },
      {
        id: 260014,
        name: 'Round 2 - Match 3',
        nextMatchId: 260013,
        nextLooserMatchId: null,
        tournamentRoundText: '2',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '9c92feb3-4aa4-4475-a34e-f9a200e21aa9',
            resultText: '1',
            isWinner: true,
            status: 'PLAYED',
          },
          {
            id: '4651dcd0-853e-4242-9924-602e8200dd17',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'FIFA_MASTER',
          },
        ],
      },
      {
        id: 260017,
        name: 'Round 2 - Match 4',
        nextMatchId: 260013,
        nextLooserMatchId: null,
        tournamentRoundText: '2',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
            resultText: '1',
            isWinner: true,
            status: 'PLAYED',
          },
          {
            id: '76ac9113-a541-4b6a-a189-7b5ad43729bd',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'رئيس',
          },
        ],
      },
      {
        id: 260011,
        name: 'Round 1 - Match 3',
        nextMatchId: 260010,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: 'c2f551b4-2d5a-4c59-86a8-df575805256a',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
      {
        id: 260009,
        name: 'Round 1 - Match 2',
        nextMatchId: 260007,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: '1ec356ec-a7c4-4026-929b-3657286a92d8',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
      {
        id: 260008,
        name: 'Round 1 - Match 1',
        nextMatchId: 260007,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc',
            resultText: '1',
            isWinner: true,
            status: 'PLAYED',
            name: 'giacomo123',
          },
          {
            id: '4831deb3-969b-49e1-944e-3ad886e6dd6c',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'ZoeZ',
          },
        ],
      },
      {
        id: 260015,
        name: 'Round 1 - Match 5',
        nextMatchId: 260014,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: '9c92feb3-4aa4-4475-a34e-f9a200e21aa9',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
      {
        id: 260012,
        name: 'Round 1 - Match 4',
        nextMatchId: 260010,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: '008de019-4af6-4178-a042-936c33fea3e9',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
      {
        id: 260019,
        name: 'Round 1 - Match 8',
        nextMatchId: 260017,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: '76ac9113-a541-4b6a-a189-7b5ad43729bd',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
      {
        id: 260018,
        name: 'Round 1 - Match 7',
        nextMatchId: 260017,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
      {
        id: 260016,
        name: 'Round 1 - Match 6',
        nextMatchId: 260014,
        nextLooserMatchId: null,
        tournamentRoundText: '1',
        startTime: null,
        state: 'WALK_OVER',
        participants: [
          {
            id: '4651dcd0-853e-4242-9924-602e8200dd17',
            resultText: null,
            isWinner: false,
            status: null,
          },
        ],
      },
    ];
    
    return (
        <SingleEliminationBracket
            matches={matches}
            matchComponent={Match}
            // svgWrapper={({ children, ...props }) => (
            //     <SVGViewer {...props}>
            //         {children}
            //     </SVGViewer>
            // )}
        />
    );

};

export class SingleElimination extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<SingleEliminationFunc />);
    }
}

export default SingleElimination;

