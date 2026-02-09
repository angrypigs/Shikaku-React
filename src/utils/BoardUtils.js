export function isRectValid(matrix, bounds) {
    let minRow = Math.min(bounds.startRow, bounds.endRow);
    let maxRow = Math.max(bounds.startRow, bounds.endRow) + 1;
    let minCol = Math.min(bounds.startCol, bounds.endCol);
    let maxCol = Math.max(bounds.startCol, bounds.endCol) + 1;
    let flag = null;
    let area = (maxCol - minCol) * (maxRow - minRow);
    for (let row = minRow; row < maxRow; row++) {
        for (let col = minCol; col < maxCol; col++) {
            if (matrix[row][col] !== null) {
                if (flag !== null) return false;
                flag = matrix[row][col];
            }
        }
    }
    return flag === area;
}

export function doRectsOverlap(rect1, rect2) {
    const r1 = {
        minR: Math.min(rect1.startRow, rect1.endRow),
        maxR: Math.max(rect1.startRow, rect1.endRow),
        minC: Math.min(rect1.startCol, rect1.endCol),
        maxC: Math.max(rect1.startCol, rect1.endCol),
    };

    const r2 = {
        minR: Math.min(rect2.startRow, rect2.endRow),
        maxR: Math.max(rect2.startRow, rect2.endRow),
        minC: Math.min(rect2.startCol, rect2.endCol),
        maxC: Math.max(rect2.startCol, rect2.endCol),
    };

    const rowOverlap = r1.minR <= r2.maxR && r1.maxR >= r2.minR;
    const colOverlap = r1.minC <= r2.maxC && r1.maxC >= r2.minC;

    return rowOverlap && colOverlap;
}

export function rectSum(rects) {
    return rects.reduce((res, rect) => {
        const height = Math.abs(rect.endRow - rect.startRow) + 1;
        const width = Math.abs(rect.endCol - rect.startCol) + 1;
        return res + height * width;
    }, 0);
}
