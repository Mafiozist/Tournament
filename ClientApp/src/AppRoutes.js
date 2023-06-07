import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SingleElimination } from "./components/tests/SingleElimination";
import { Participants } from "./components/participants/Participants";
import { Teams } from "./components/teams/Teams";
import { Tournaments } from "./components/tournaments/Tournaments.js";

const AppRoutes = [
    {
        index: true,
        path:'/',
        element: <Home />
    },
    {
        path: '/test',
        element: <SingleElimination />
    },
    {
        path: '/Participant',
        element: <Participants />
    },
    {
        path: '/Team',
        element: <Teams />
    },
    {
        path: '/Tournament',
        element: <Tournaments />
    }
];

export default AppRoutes;
