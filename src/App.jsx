import { useState } from 'react';
import ShikakuMatrix from './components/ShikakuMatrix';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <ShikakuMatrix rows={20} cols={30}></ShikakuMatrix>
            </div>
        </>
    );
}

export default App;
