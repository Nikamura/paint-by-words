import React, { useState } from "react";

import GameBoard from "./game-board";


const Register: React.FC = () => {
    const [name, setName] = useState("");
    return <div>
        <div><input placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} /></div>
        <div><button>Play!</button></div>
    </div>;
};

export default Register;
