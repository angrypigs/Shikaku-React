import './GameScreen.css';
import ThemeButton from '../components/ThemeButton';
import { useParams } from 'react-router-dom';
import BoardGenerator from '../utils/BoardGenerator';
import { useState, useEffect } from 'react';

export default function GameScreen() {
    const { mode, width, height } = useParams();

    const [numberMatrix, setNumberMatrix] = useState(() => {
        if (mode === 'new') return BoardGenerator(Number(height), Number(width));
        return [];
    });
    const [hoveredRect, setHoveredRect] = useState(null);

    useEffect(() => {
        console.log(hoveredRect);
    }, [hoveredRect]);

    const tileDown = (row, col) => {
        if (hoveredRect === null) {
            setHoveredRect({ startRow: row, startCol: col, endRow: row, endCol: col });
        }
    };

    const tileEnter = (row, col) => {
        if (hoveredRect !== null) {
            setHoveredRect({ ...hoveredRect, endRow: row, endCol: col });
        }
    };

    const tileUp = (row, col) => {
        if (
            hoveredRect !== null &&
            (hoveredRect.startRow !== hoveredRect.endRow ||
                hoveredRect.startCol !== hoveredRect.endCol)
        ) {
            setHoveredRect(null);
        }
    };

    return (
        <>
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
                        }}
                    ></div>
                )}
            </div>
            <ThemeButton />
        </>
    );
}
