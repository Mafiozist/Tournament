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
        path: '/test',
        element: <SingleElimination />
    }
    ,
    {
        path: '/participants',
        element: <Participants />
    }
];

export default AppRoutes;
