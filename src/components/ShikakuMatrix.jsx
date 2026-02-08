import { useState } from 'react';
import BoardGenerator from '../utils/BoardGenerator';
import './ShikakuMatrix.css';

export default function ShikakuMatrix({ rows, cols }) {
    const [matrix, setMatrix] = useState(BoardGenerator(rows, cols));
    console.log(matrix);
    return (
        <div className="matrixBg">
            {matrix.map((row, rowIdx) =>
                row.map((col, colIdx) => (
                    <div
                        key={`tile-${rowIdx}-${colIdx}`}
                        className="tile"
                        style={{
                            top: `${20 + 40 * rowIdx}px`,
                            left: `${20 + 40 * colIdx}px`,
                            backgroundColor: `hsl(${(col * 43) % 360}, ${col ? ((23 * col) % 50) + 50 : 0}%, ${col !== -1 ? 50 : 0}%`,
                        }}
                    >
                        {col + '   ' + rowIdx + 'x' + colIdx}
                    </div>
                ))
            )}
        </div>
    );
}
