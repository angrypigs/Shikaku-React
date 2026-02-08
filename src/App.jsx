import MainScreen from './screens/MainScreen';
import GameScreen from './screens/GameScreen';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/game/:mode/:width/:height" element={<GameScreen />} />
        </Routes>
    );
}

export default App;
