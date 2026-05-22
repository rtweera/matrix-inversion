# API Documentation

Complete documentation of all functions in the matrix-inversion library.

## Table of Contents

- [create_matrix](#create_matrix)
- [return_determinant](#return_determinant)
- [return_minors](#return_minors)
- [return_adjugate](#return_adjugate)
- [return_inverse](#return_inverse)
- [Global Variables](#global-variables)

---

## create_matrix

Creates a matrix object from a flat array of values.

### Syntax

```javascript
create_matrix(rows, cols, array)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rows` | Number | Number of rows in the matrix (must be > 0) |
| `cols` | Number | Number of columns in the matrix (must be > 0) |
| `array` | Array | Flat array of numbers containing `rows × cols` elements |

### Return Value

Returns a matrix object with the structure:
```javascript
{
    rows: Number,
    cols: Number,
    data: Array<Array<Number>>
}
```

### Description

This function converts a flat array into a 2D matrix structure. The array elements are read row-by-row, filling the matrix left-to-right, top-to-bottom.

### Example

```javascript
// Create a 2×2 matrix
const arr = [1, 2, 3, 4];
const m = create_matrix(2, 2, arr);

// Result:
// {
//     rows: 2,
//     cols: 2,
//     data: [[1, 2], [3, 4]]
// }
```

```javascript
// Create a 3×3 matrix
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const m = create_matrix(3, 3, arr);

// Result:
// {
//     rows: 3,
//     cols: 3,
//     data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// }
```

### Array Layout

For a 3×3 matrix with array [a, b, c, d, e, f, g, h, i]:
```
Matrix layout:
[a b c]
[d e f]
[g h i]
```

---

## return_determinant

Calculates the determinant of a square matrix using cofactor expansion.

### Syntax

```javascript
return_determinant(m = matrix)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `m` | Object | Matrix object (default: global `matrix` variable) |

### Return Value

Returns the determinant as a Number. Returns `NaN` if the matrix is not square.

### Description

The determinant is calculated recursively:
- For 2×2 matrices: Direct calculation using the formula `ad - bc`
- For larger matrices: Cofactor expansion along the first row

### Errors/Warnings

- If matrix is not square (rows ≠ cols), logs "No determinant" and returns `NaN`
- If matrix has fewer than 2 rows/columns, logs "No determinant" and returns `NaN`

### Example

```javascript
// 2×2 matrix
const m2 = create_matrix(2, 2, [1, 2, 3, 4]);
const det2 = return_determinant(m2);
console.log(det2);  // Output: -2

// 3×3 matrix
const m3 = create_matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 10]);
const det3 = return_determinant(m3);
console.log(det3);  // Output: -3

// Non-square matrix (will return NaN)
const m_bad = create_matrix(2, 3, [1, 2, 3, 4, 5, 6]);
const det_bad = return_determinant(m_bad);
console.log(det_bad);  // Output: NaN
```

### Mathematical Formula

For a square matrix A of size n×n:

**2×2 case:**
```
det([a b; c d]) = ad - bc
```

**n×n case (cofactor expansion along first row):**
```
det(A) = Σ(c=0 to n-1) (-1)^c × A[0][c] × det(Minor[0,c])
```

### Complexity

- **Time**: O(n!) for n×n matrix
- **Space**: O(n²) for temporary matrices

---

## return_minors

Computes the matrix of minors from a given matrix.

### Syntax

```javascript
return_minors(m = matrix)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `m` | Object | Matrix object (default: global `matrix` variable) |

### Return Value

Returns a matrix object with the same dimensions as the input, where each element is the minor (determinant of a submatrix) at that position.

### Description

For each position (r, c) in the matrix, the minor is calculated by:
1. Creating a submatrix that excludes row r and column c
2. Computing the determinant of this submatrix
3. Storing this determinant at position (r, c) in the result matrix

### Example

```javascript
// Simple 2×2 matrix
const m = create_matrix(2, 2, [1, 2, 3, 4]);
const minors = return_minors(m);

// Result:
// {
//     rows: 2,
//     cols: 2,
//     data: [[4, 3], [2, 1]]
// }
// Explanation:
// - Minor[0,0] = det of [4] = 4
// - Minor[0,1] = det of [3] = 3
// - Minor[1,0] = det of [2] = 2
// - Minor[1,1] = det of [1] = 1
```

```javascript
// 3×3 matrix
const m = create_matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
const minors = return_minors(m);
// Returns a 3×3 matrix where each element is a 2×2 determinant
```

### Dependencies

Uses `return_determinant()` internally.

### Complexity

- **Time**: O(n² × n!) where n is the matrix size
- **Space**: O(n²)

---

## return_adjugate

Computes the adjugate (adjoint) matrix from a minors matrix.

### Syntax

```javascript
return_adjugate(m = return_minors())
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `m` | Object | Matrix of minors (default: result of `return_minors()`) |

### Return Value

Returns a matrix object representing the adjugate matrix with the same dimensions as input.

### Description

The adjugate matrix is created by:
1. Applying cofactor signs: multiply each element at (r, c) by (-1)^(r+c)
2. Transposing the result: placing element (r, c) at position (c, r)

### Example

```javascript
// Create and process a 2×2 matrix
const m = create_matrix(2, 2, [1, 2, 3, 4]);
const minors = return_minors(m);
const adjugate = return_adjugate(minors);

// Result (with cofactor signs applied and transposed):
// {
//     rows: 2,
//     cols: 2,
//     data: [[4, -3], [-2, 1]]
// }
```

### Mathematical Formula

**Step 1: Apply Cofactor Signs**
```
Cofactor[r,c] = (-1)^(r+c) × Minor[r,c]
```

**Step 2: Transpose**
```
Adjugate[r,c] = Cofactor[c,r]
```

Or combined:
```
Adjugate[r,c] = (-1)^(c+r) × Minor[c,r]
```

### Complexity

- **Time**: O(n²)
- **Space**: O(n²)

---

## return_inverse

Computes the final inverse matrix from the adjugate matrix and determinant.

### Syntax

```javascript
return_inverse(m = return_adjugate(), det = return_determinant())
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `m` | Object | Adjugate matrix (default: result of `return_adjugate()`) |
| `det` | Number | Determinant of original matrix (default: result of `return_determinant()`) |

### Return Value

Returns a matrix object representing the inverse matrix with the same dimensions as input.

### Description

The inverse is calculated by dividing each element of the adjugate matrix by the determinant, with rounding applied based on the global `accuracy` variable.

### Example

```javascript
// Full workflow
const arr = [1, 2, 3, 4];
const m = create_matrix(2, 2, arr);
const minors = return_minors(m);
const adjugate = return_adjugate(minors);
const determinant = return_determinant(m);
const inverse = return_inverse(adjugate, determinant);

console.log(inverse);
// Result:
// {
//     rows: 2,
//     cols: 2,
//     data: [[-2, 1], [1.5, -0.5]]
// }
```

### Precision Control

The result is rounded to `accuracy` decimal places:

```javascript
// For accuracy = 3:
inverse_matrix.data[r][c] = 
    Math.round((10 ** 3) * m.data[r][c] * (1 / det)) / (10 ** 3)
```

### Mathematical Formula

```
Inverse[r,c] = Adjugate[r,c] / Determinant
```

### Errors/Warnings

- If `det` is 0 or very close to 0, the result will be infinite or NaN
- Always verify the determinant is non-zero before calling this function

### Complexity

- **Time**: O(n²)
- **Space**: O(n²)

---

## Global Variables

### accuracy

```javascript
var accuracy = 3;
```

**Type**: Number

**Description**: Sets the number of decimal places to which results are rounded. Default is 3.

**Example**:
```javascript
accuracy = 2;  // Round to 2 decimal places
accuracy = 5;  // Round to 5 decimal places
```

### matrix

```javascript
const matrix = {
    rows: 0,
    cols: 0,
    data: []
};
```

**Type**: Object

**Description**: Global matrix object used as the default parameter for functions. Contains the last created or processed matrix.

**Structure**:
- `rows`: Number of rows
- `cols`: Number of columns
- `data`: 2D array of matrix elements

---

## Complete Workflow Example

```javascript
// Step 1: Define your matrix as a flat array
const matrixArray = [4, 7, 2, 6];  // 2×2 matrix

// Step 2: Create matrix object
const m = create_matrix(2, 2, matrixArray);
console.log("Matrix:", m);

// Step 3: Calculate determinant
const det = return_determinant(m);
console.log("Determinant:", det);

// Step 4: Calculate minors
const minors = return_minors(m);
console.log("Minors:", minors);

// Step 5: Calculate adjugate
const adjugate = return_adjugate(minors);
console.log("Adjugate:", adjugate);

// Step 6: Calculate inverse
const inverse = return_inverse(adjugate, det);
console.log("Inverse:", inverse);

// Output will show the inverse matrix
```

## Error Handling

Current error handling in the library:

- **Non-square matrices**: `return_determinant()` returns `NaN`
- **Zero determinant**: `return_inverse()` will return `Infinity` or `NaN`
- **Division by zero**: May occur if determinant is exactly 0

Always check that:
1. Matrix is square
2. Determinant is non-zero
3. Input values are valid numbers

## Performance Tips

1. Set appropriate `accuracy` value for your use case
2. For matrices larger than 8×8, consider alternative algorithms
3. Test with small matrices first
4. Monitor browser console for warnings and errors
