import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SingleElimination } from "./components/tests/SingleElimination";
import { Participants } from "./components/participants/Participants";

const AppRoutes = [
    {
        index: true,
        path:'/',
        element: <Home />
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
