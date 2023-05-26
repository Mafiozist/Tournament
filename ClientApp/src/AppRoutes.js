import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SingleElimination } from "./components/SingleElimination";
import { Participants } from "./components/participants/Participants";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/Test',
        element: <SingleElimination />
    }
    ,
    {
        path: '/Participants',
        element: <Participants />
    }
];

export default AppRoutes;
