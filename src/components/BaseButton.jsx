import './BaseButton.css';

export default function Button({ children, onClick, style = {} }) {
    return (
        <div onClick={onClick} style={style} className="base-button">
            {children}
        </div>
    );
}
