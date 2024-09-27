import { useEffect, useState } from "react";

export default function Countdown({endDate }) {
const [days,setDays] = useState(0);
const [hours,setHours] = useState(0);
const [minutes,setMinutes] = useState(0);
const [seconds,setSeconds] = useState(0);
const [running,setRunning] = useState(true);


    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const end = new Date(endDate);
            const remainingTime = end - now;

            if (remainingTime <= 0) {
                setRunning(false);
                return;
            }

            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

        };

        // প্রতি সেকেন্ডে calculateTimeRemaining() ফাংশনটি চালাবে
        const intervalId = setInterval(calculateTimeRemaining, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [endDate]);

    return (running?<span className="flex gap-1 mt-1 mr-1">
        <span className="text-xs bg-green-50 text-green-700 font-bold p-1 rounded-full dark:bg-slate-700 dark:text-slate-200">{days<10?"0"+days:days}d </span>
         <span className="text-xs bg-green-50 text-green-700 font-bold p-1 rounded-full dark:bg-slate-700 dark:text-slate-200">{hours<10?"0"+hours:hours}h </span>
         <span className="text-xs bg-green-50 text-green-700 font-bold p-1 rounded-full dark:bg-slate-700 dark:text-slate-200">{minutes<10?"0"+minutes:minutes}m </span>
         <span className="text-xs bg-green-50 text-green-700 font-bold p-1 rounded-full dark:bg-slate-700 dark:text-slate-200">{seconds<10?"0"+seconds:seconds}s </span>
    </span>:<span className="text-xs bg-red-100 text-red-500  rounded-l-full p-1">Off</span>);
}
