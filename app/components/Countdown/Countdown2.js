import { useState, useEffect } from 'react';

const Countdown = () => {
    // Set initial time values (you can calculate them dynamically)
    const [days, setDays] = useState(15);
    const [hours, setHours] = useState(10);
    const [minutes, setMinutes] = useState(24);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev > 0) return prev - 1;
                setMinutes((prev) => {
                    if (prev > 0) return prev - 1;
                    setHours((prev) => {
                        if (prev > 0) return prev - 1;
                        setDays((prev) => (prev > 0 ? prev - 1 : 0));
                        return 23;
                    });
                    return 59;
                });
                return 59;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": days }}></span>
        </span>
                days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": hours }}></span>
        </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": minutes }}></span>
        </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": seconds }}></span>
        </span>
                sec
            </div>
        </div>
    );
};

export default Countdown;
