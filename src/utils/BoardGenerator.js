export default function BoardGenerator(rows, cols) {
    let matrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
    );
    let counter = rows * cols;
    const limit = Math.sqrt(counter);
    let index = 1;
    let res = {};
    while (counter > 0) {
        let row = null;
        let col = null;
        outer: for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (matrix[r][c] === 0) {
                    row = r;
                    col = c;
                    break outer;
                }
            }
        }

        let w = 1;
        while (col + w < cols && matrix[row][col + w] === 0 && Math.random() > 0.3) {
            w++;
        }
        let h = 1;
        if (w === 1 && row < rows - 1) {
            h++;
        }
        while (row + h < rows && Math.random() > 0.4 && w * h < limit) {
            h++;
        }
        let fill = w * h > 1 ? index : -1;
        for (let c = col; c < col + w; c++) {
            for (let r = row; r < row + h; r++) {
                matrix[r][c] = fill;
            }
        }

        if (fill !== -1) res[fill] = [row, col, w, h];

        counter -= w * h;

        index++;
    }

    let flag = null;
    for (let c = 0; c < cols; c++) {
        if (flag === null && matrix[rows - 1][c] < 0) {
            flag = c;
        } else if (flag !== null && matrix[rows - 1][c] > -1) {
            if (c - flag > 1) {
                index++;
                for (let cc = flag; cc < c; cc++) {
                    matrix[rows - 1][cc] = index;
                }
                res[index] = [rows - 1, flag, c - flag, 1];
            }
            flag = null;
        }
    }
    if (flag !== null && cols - flag > 1) {
        index++;
        for (let cc = flag; cc < cols; cc++) {
            matrix[rows - 1][cc] = index;
        }
        res[index] = [rows - 1, flag, cols - flag, 1];
    }

    for (let c = 0; c < cols; c++) {
        if (matrix[rows - 1][c] < 0) {
            if (
                matrix[rows - 1][c - 1] &&
                matrix[rows - 1][c - 1] === matrix[rows - 1][c - 2] &&
                matrix[rows - 1][c - 1] !== matrix[rows - 2][c - 1]
            ) {
                let fill = matrix[rows - 1][c - 1];
                matrix[rows - 1][c] = fill;
                res[fill][2] += 1;
            } else if (
                matrix[rows - 1][c + 1] &&
                matrix[rows - 1][c + 1] === matrix[rows - 1][c + 2] &&
                matrix[rows - 1][c + 1] !== matrix[rows - 2][c + 1]
            ) {
                let fill = matrix[rows - 1][c + 1];
                matrix[rows - 1][c] = fill;
                res[fill][2] += 1;
                res[fill][1] -= 1;
            } else {
                let fill = matrix[rows - 2][c];
                matrix[rows - 1][c] = fill;
                res[fill][3] += 1;
            }
        }
    }
    console.log(matrix);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            matrix[r][c] = null;
        }
    }
    Object.keys(res).forEach((key) => {
        const [r, c, w, h] = res[key];
        let randRow = r + Math.floor(Math.random() * h);
        let randCol = c + Math.floor(Math.random() * w);
        matrix[randRow][randCol] = w * h;
    });
    return matrix;
}
