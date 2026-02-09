import MainScreen from './screens/MainScreen';
import GameScreen from './screens/GameScreen';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/game/:width/:height" element={<GameScreen />} />
        </Routes>
    );
}

export default App;
