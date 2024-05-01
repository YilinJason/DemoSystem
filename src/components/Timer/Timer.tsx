import { useEffect, useState } from "react";
import moment from "moment"; // Import the moment library
const Timer = () => {
    const [timer, setTimer] = useState('');
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setRefresh((r) => r + 1);
            setTimer(moment(new Date().getTime()).format('YYYY年MM月DD日 HH时mm分ss秒'));
        }, 1000);
        
        return () => clearTimeout(timeoutId);
    }, [refresh]);

    return (
        <>
            {timer}
        </>
    );
}
export default Timer;