import { useNavigate } from 'react-router-dom';
import Button from '../components/BaseButton';
import './MainScreen.css';
import ThemeButton from '../components/ThemeButton';

export default function MainScreen() {
    const navigate = useNavigate();
    const sizes = [5, 7, 10, 12];
    return (
        <>
            <header>
                <p className="title">Shikaku</p>
            </header>
            <Button
                onClick={() => {
                    let w = Math.floor(Math.random() * 10) + 10;
                    let h = Math.floor(Math.random() * 5) + w - 5;
                    navigate(`/game/${w}/${h}`);
                }}
            >
                Random board
            </Button>
            {sizes.map((s, i) => (
                <Button
                    key={'btn' + i}
                    onClick={() => {
                        navigate('/game/' + s + '/' + s);
                    }}
                >
                    {s + 'x' + s}
                </Button>
            ))}
            <ThemeButton />
        </>
    );
}
