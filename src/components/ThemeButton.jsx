import Button from './BaseButton';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            onClick={() => {
                toggleTheme();
                console.log('xdd');
            }}
            style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                position: 'absolute',
                right: '20px',
                top: '20px',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            🎨
        </Button>
    );
}
