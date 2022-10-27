import RaffleForm from './App';
import Drawing from './Drawing';
import Winners from './Winners';


export default function Router() {
    if (window.location.pathname.includes('winners'))
        return <Winners/>
    else if (window.location.pathname.includes('drawing'))
        return <Drawing/>
    else
        return <RaffleForm/>

}
