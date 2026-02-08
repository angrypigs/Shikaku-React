import { useNavigate } from 'react-router-dom';
import Button from '../components/BaseButton';
import './MainScreen.css';
import ThemeButton from '../components/ThemeButton';

export default function MainScreen() {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <p className="title">Shikaku</p>
            </header>
            <Button
                onClick={() => {
                    let w = Math.floor(Math.random() * 21) + 5;
                    let h = Math.floor(Math.random() * 21) + 5;
                    navigate(`/game/new/${w}/${h}`);
                }}
            >
                Random board
            </Button>
            <Button
                onClick={() => {
                    navigate('/game/new/7/7');
                }}
            >
                7x7
            </Button>
            <Button
                onClick={() => {
                    navigate('/game/new/10/10');
                }}
            >
                10x10
            </Button>
            <ThemeButton />
        </>
    );
}
