import './GameScreen.css';
import ThemeButton from '../components/ThemeButton';
import { useNavigate, useParams } from 'react-router-dom';
import BoardGenerator from '../utils/BoardGenerator';
import { useState, useEffect } from 'react';
import { isRectValid, doRectsOverlap, rectSum } from '../utils/BoardUtils';
import Button from '../components/BaseButton';

export default function GameScreen() {
    const navigate = useNavigate();

    const { width: widthParam, height: heightParam } = useParams();

    const width = Number(widthParam) || 5;
    const height = Number(heightParam) || 5;
    const area = width * height;

    const [numberMatrix, setNumberMatrix] = useState(() => {
        return BoardGenerator(Number(height), Number(width));
    });

    const [hoveredRect, setHoveredRect] = useState(null);
    const [isHoveredValid, setIsHoveredValid] = useState(false);
    const [selectedRects, setSelectedRects] = useState([]);

    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setHoveredRect(null);
            setIsHoveredValid(false);
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const tileDown = (row, col) => {
        if (hoveredRect === null) {
            setHoveredRect({ startRow: row, startCol: col, endRow: row, endCol: col });
        }
    };

    const tileEnter = (row, col) => {
        if (hoveredRect !== null) {
            setHoveredRect({ ...hoveredRect, endRow: row, endCol: col });
            setIsHoveredValid(
                isRectValid(numberMatrix, { ...hoveredRect, endRow: row, endCol: col })
            );
        }
    };

    const tileUp = (row, col) => {
        if (hoveredRect !== null) {
            if (isHoveredValid) {
                const { startRow, startCol, endRow, endCol } = hoveredRect;

                const newRect = {
                    startRow: Math.min(startRow, endRow),
                    startCol: Math.min(startCol, endCol),
                    endRow: Math.max(startRow, endRow),
                    endCol: Math.max(startCol, endCol),
                };

                const newRects = [
                    ...selectedRects.filter((rect) => !doRectsOverlap(rect, newRect)),
                    newRect,
                ];

                setSelectedRects(newRects);

                setGameWon(rectSum(newRects) === area);
            }
        }
    };

    const tileClick = (row, col) => {
        const clickRect = { startRow: row, startCol: col, endRow: row, endCol: col };
        setSelectedRects((prev) => {
            const filtered = prev.filter((rect) => !doRectsOverlap(rect, clickRect));
            return [...filtered];
        });
    };

    const restartGame = () => {
        setGameWon(false);
        setNumberMatrix(BoardGenerator(Number(height), Number(width)));
        setSelectedRects([]);
        setHoveredRect(null);
        setIsHoveredValid(false);
    };

    return (
        <div className="container">
            <header>
                <p className="title">Shikaku</p>
            </header>
            <div style={{ '--rows': height, '--cols': width }} className="board">
                {numberMatrix.map((row, rowIdx) => {
                    return row.map((tile, colIdx) => (
                        <div
                            key={`tile-${rowIdx}-${colIdx}`}
                            className="tile"
                            onMouseDown={() => tileDown(rowIdx, colIdx)}
                            onMouseEnter={() => tileEnter(rowIdx, colIdx)}
                            onMouseUp={() => tileUp(rowIdx, colIdx)}
                            onClick={() => tileClick(rowIdx, colIdx)}
                        >
                            {tile || ''}
                        </div>
                    ));
                })}

                {hoveredRect !== null && (
                    <div
                        className="preview-rect"
                        style={{
                            gridColumn: `${Math.min(hoveredRect.startCol, hoveredRect.endCol) + 1} / ${Math.max(hoveredRect.startCol, hoveredRect.endCol) + 2}`,
                            gridRow: `${Math.min(hoveredRect.startRow, hoveredRect.endRow) + 1} / ${Math.max(hoveredRect.startRow, hoveredRect.endRow) + 2}`,
                            borderColor: isHoveredValid ? '#16af16' : '#a50808',
                        }}
                    ></div>
                )}

                {selectedRects.map((rect, idx) => (
                    <div
                        key={`selected-${idx}`}
                        className="stable-rect"
                        style={{
                            gridColumn: `${rect.startCol + 1} / ${rect.endCol + 2}`,
                            gridRow: `${rect.startRow + 1} / ${rect.endRow + 2}`,
                        }}
                    ></div>
                ))}
            </div>
            <div className={`vignette ${gameWon ? 'vignette-active' : ''}`}>
                <p className="title" style={{ fontSize: '72px' }}>
                    You won lol!
                </p>
                <Button onClick={restartGame}>Next game</Button>
                <Button onClick={() => navigate('/')}>Menu</Button>
            </div>
            <ThemeButton />
        </div>
    );
}
