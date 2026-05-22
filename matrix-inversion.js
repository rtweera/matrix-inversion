/**
 * Matrix Inversion Library
 * 
 * A pure JavaScript implementation of matrix inversion using the cofactor method.
 * Supports matrices of arbitrary size without external dependencies.
 * 
 * Reference: https://semath.info/src/inverse-cofactor-ex4.html
 * 
 * Algorithm Steps:
 * 1. Compute determinant of the matrix
 * 2. Calculate matrix of minors
 * 3. Apply cofactor signs
 * 4. Transpose to get adjugate matrix
 * 5. Divide by determinant to get inverse
 */

/** Global variable controlling decimal precision of results */
var accuracy = 3;    // Number of decimal places to round to

/**
 * Global matrix object - stores the current working matrix
 * Structure: { rows, cols, data[][] }
 */
const matrix = {
    rows: 0,
    cols: 0,
    data: []
};

/**
 * Creates a matrix object from a flat array of values.
 * 
 * The flat array is interpreted row-by-row. For example,
 * create_matrix(2, 2, [1, 2, 3, 4]) creates:
 *   [[1, 2],
 *    [3, 4]]
 * 
 * @param {number} rows - Number of rows in the matrix
 * @param {number} cols - Number of columns in the matrix
 * @param {number[]} array - Flat array of values (size must be rows × cols)
 * @returns {object} Matrix object with properties: rows, cols, data
 */
function create_matrix(rows, cols, array) {
    // Initialize 2D array structure
    for (let i = 0; i < rows; i++) {
        matrix.data.push([]);
        // Fill each row with values from the flat array
        for (let j = 0; j < cols; j++) {
            matrix.data[i][j] = array[cols * i + j];
        }
    }
    matrix.rows = rows;
    matrix.cols = cols;
    return matrix;
}

/**
 * Calculates the determinant of a matrix using cofactor expansion.
 * 
 * The determinant is computed recursively:
 * - For 2×2 matrices: uses direct formula (ad - bc)
 * - For larger matrices: expands along the first row
 * 
 * A matrix must be square (rows = cols) to have a determinant.
 * A matrix is invertible if and only if its determinant is non-zero.
 * 
 * @param {object} m - Matrix object (default: global matrix variable)
 * @returns {number} The determinant value, or NaN if matrix is not square
 */
function return_determinant(m = matrix) {
    // Check if matrix is square
    if (m.rows < 2 || m.cols < 2 || m.cols != m.rows) {
        console.log("No determinant");
        return NaN;
    }
    
    // Base case: 2×2 matrix uses direct calculation
    // det([[a, b], [c, d]]) = ad - bc
    else if (m.rows == 2 && m.cols == 2) {
        return m.data[0][0] * m.data[1][1] - m.data[0][1] * m.data[1][0];
    }
    
    // Recursive case: cofactor expansion along the first row
    // det(A) = Σ(c=0 to n-1) (-1)^c × A[0][c] × det(Minor[0,c])
    else {
        let det = 0.0;
        // Iterate through each column
        for (let c = 0; c < m.cols; c++) {    // c for column number
            // Create minor matrix by removing row 0 and column c
            const tmp_matrix = {        // temp matrix object for recursive determinant call
                rows: m.rows - 1,
                cols: m.cols - 1,
                data: []
            };
            
            // Fill the minor matrix
            for (let i = 0; i < m.rows - 1; i++) {
                tmp_matrix.data.push([]);
                let skipped = false;
                for (let j = 0; j < m.cols; j++) {
                    // Skip the column we're expanding along
                    if (j == c) {
                        skipped = true;
                        continue;
                    }
                    else {
                        // Adjust column index after skipping
                        if (skipped) {
                            tmp_matrix.data[i][j - 1] = m.data[i + 1][j];   // first row is skipped
                        }                                                   // because we expand along it
                        else {
                            tmp_matrix.data[i][j] = m.data[i + 1][j];       // first row is skipped
                        }
                    }
                }
            }
            
            // Add cofactor term: (-1)^c × element × determinant of minor
            det += ((-1) ** c) * m.data[0][c] * return_determinant(tmp_matrix);
        }
        return det;
    }
}

/**
 * Computes the matrix of minors from a given matrix.
 * 
 * For each position (r, c), the minor is the determinant of the submatrix
 * obtained by removing row r and column c from the original matrix.
 * 
 * This is the first step in computing the inverse via the cofactor method.
 * 
 * @param {object} m - Matrix object (default: global matrix variable)
 * @returns {object} Matrix of minors with same dimensions as input
 */
function return_minors(m = matrix) {
    const minor_matrix = {
        rows: m.rows,
        cols: m.cols,
        data: []
    };
    
    // For each element in the matrix
    for (let r = 0; r < m.rows; r++) {              // r for row
        minor_matrix.data.push([]);
        for (let c = 0; c < m.cols; c++) {          // c for col
            // Create submatrix by removing row r and column c
            const tmp_matrix = {                    // temp matrix for determinant calculation
                rows: m.rows - 1,
                cols: m.cols - 1,
                data: []
            };
            
            let row_skipped = false;
            // Build the minor matrix
            for (let i = 0; i < m.rows; i++) {      // i-th row
                // Skip the current row
                if (i == r) {
                    row_skipped = true;
                    continue;
                }
                else {
                    tmp_matrix.data.push([]);
                    let col_skipped = false;
                    for (let j = 0; j < m.cols; j++) {  // j-th col
                        // Skip the current column
                        if (j == c) {
                            col_skipped = true;
                            continue;
                        }
                        else {
                            // Calculate adjusted indices in the minor matrix
                            // using ternary operator for conditional index adjustment
                            let i_ = row_skipped ? i - 1 : i;
                            let j_ = col_skipped ? j - 1 : j;   // subtract 1 to account for skipped row/col
                            tmp_matrix.data[i_][j_] = m.data[i][j];
                        }
                    }
                }
            }
            
            // The minor at (r,c) is the determinant of the submatrix
            minor_matrix.data[r][c] = return_determinant(tmp_matrix);
        }
    }
    return minor_matrix;
}

/**
 * Computes the adjugate (adjoint) matrix from the matrix of minors.
 * 
 * The adjugate matrix is created by:
 * 1. Applying cofactor signs: multiply each element at (r, c) by (-1)^(r+c)
 * 2. Transposing the result: place element at (r, c) to position (c, r)
 * 
 * This is the second step in computing the matrix inverse.
 * 
 * @param {object} m - Matrix of minors (default: result of return_minors())
 * @returns {object} Adjugate matrix with same dimensions as input
 */
function return_adjugate(m = return_minors()) {
    const adjugate_matrix = {
        rows: m.rows,
        cols: m.cols,
        data: []
    };
    
    // Deep copy the minor matrix data to work with
    adjugate_matrix.data = JSON.parse(JSON.stringify(m.data));

    // Apply cofactor signs and transpose simultaneously
    for (let r = 0; r < m.rows; r++) {
        for (let c = 0; c < m.cols; c++) {
            // Apply sign pattern (-1)^(r+c) and transpose by swapping indices
            // Adjugate[c][r] = (-1)^(r+c) × Minor[r][c]
            adjugate_matrix.data[c][r] = ((-1) ** (r + c)) * m.data[r][c];
        }
    }
    return adjugate_matrix;
}

/**
 * Computes the final inverse matrix from the adjugate matrix and determinant.
 * 
 * The inverse is calculated by dividing each element of the adjugate matrix
 * by the determinant of the original matrix:
 * 
 * A^(-1)[i,j] = Adjugate[i,j] / det(A)
 * 
 * Results are rounded to the precision specified by the global 'accuracy' variable.
 * 
 * NOTE: det must be non-zero; otherwise, the result will be Infinity or NaN.
 * 
 * @param {object} m - Adjugate matrix (default: result of return_adjugate())
 * @param {number} det - Determinant of the original matrix (default: result of return_determinant())
 * @returns {object} Inverse matrix with same dimensions as input
 */
function return_inverse(m = return_adjugate(), det = return_determinant()) {
    const inverse_matrix = {
        rows: m.rows,
        cols: m.cols,
        data: []
    };

    // Divide each element of the adjugate by the determinant
    // and round to the specified accuracy
    for (let r = 0; r < m.rows; r++) {
        inverse_matrix.data.push([]);
        for (let c = 0; c < m.cols; c++) {
            // Calculate: adjugate_element / determinant
            // Then round to 'accuracy' decimal places
            // Example: if accuracy=3, round to 3 decimal places
            const scaled = (10 ** accuracy) * m.data[r][c] * (1 / det);
            inverse_matrix.data[r][c] = Math.round(scaled) / (10 ** accuracy);
        }
    }
    return inverse_matrix;
}