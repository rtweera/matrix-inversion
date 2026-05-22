# Matrix Inversion Algorithm

## Table of Contents

- [Overview](#overview)
- [Mathematical Background](#mathematical-background)
- [The Cofactor Method](#the-cofactor-method)
- [Step-by-Step Algorithm](#step-by-step-algorithm)
- [Implementation Details](#implementation-details)
- [Complexity Analysis](#complexity-analysis)
- [Limitations](#limitations)
- [References](#references)

## Overview

This document provides a comprehensive explanation of the matrix inversion algorithm implemented in this project. The algorithm uses the **cofactor method** (also known as the adjugate method) to compute the inverse of a square matrix.

### Why This Method?

The cofactor method is chosen for this project because:
1. It's mathematically elegant and demonstrates core linear algebra principles
2. It works for any size square matrix
3. It doesn't require external libraries
4. It clearly shows each computational step

## Mathematical Background

### Determinant

The **determinant** is a scalar value that can be computed from a square matrix. It has several important properties:

- For a 2×2 matrix:
  ```
  det([a b; c d]) = ad - bc
  ```

- For larger matrices, it's computed recursively using cofactor expansion:
  ```
  det(A) = Σ(j=0 to n-1) (-1)^j * a[0][j] * det(M[0,j])
  ```
  Where M[0,j] is the minor matrix obtained by removing row 0 and column j.

**Property**: A matrix is invertible if and only if its determinant is non-zero.

### Minor and Cofactor

**Minor (M[i,j])**: The determinant of the (n-1)×(n-1) submatrix obtained by deleting row i and column j from the matrix.

**Cofactor (C[i,j])**: The signed minor:
```
C[i,j] = (-1)^(i+j) * M[i,j]
```

### Adjugate Matrix

The **adjugate** (or adjoint) matrix is obtained by:
1. Computing the cofactor for each element
2. Transposing the result

Mathematically: **adj(A) = C^T** where C is the cofactor matrix and T denotes transpose.

### Matrix Inverse Formula

For a square matrix **A** with non-zero determinant:
```
A^(-1) = adj(A) / det(A)
```

Or element-wise:
```
(A^(-1))[i,j] = adj(A)[i,j] / det(A)
```

## The Cofactor Method

### Step 1: Compute the Determinant

Calculate `det(A)` using cofactor expansion along the first row:

```
det(A) = Σ(c=0 to n-1) (-1)^c * A[0][c] * det(Minor[0,c])
```

**Implementation Note**: This is done recursively, with base case for 2×2 matrices.

### Step 2: Compute the Matrix of Minors

For each position (r, c) in the result matrix:
1. Create a (n-1)×(n-1) submatrix by removing row r and column c
2. Calculate the determinant of this submatrix
3. This determinant is the minor M[r,c]

Result: Matrix of minors has the same dimensions as the original matrix.

### Step 3: Apply Cofactor Signs

For each element at position (r, c), apply the sign factor:
```
C[r,c] = (-1)^(r+c) * M[r,c]
```

This creates the cofactor matrix.

### Step 4: Transpose (Create Adjugate)

Transpose the cofactor matrix:
```
adj(A)[r,c] = C[c,r]
```

### Step 5: Divide by Determinant

Divide each element of the adjugate by the determinant:
```
A^(-1)[r,c] = adj(A)[r,c] / det(A)
```

## Step-by-Step Algorithm

### Example: 2×2 Matrix Inversion

Given matrix A:
```
A = [1  2]
    [3  4]
```

**Step 1: Calculate Determinant**
```
det(A) = (1)(4) - (2)(3) = 4 - 6 = -2
```

**Step 2: Calculate Matrix of Minors**
For 2×2, minors are simply the diagonal elements:
```
Minors = [4  3]
         [2  1]
```

**Step 3: Apply Cofactor Signs**
```
Cofactor = [4   -3]
           [-2   1]
```

**Step 4: Transpose (Adjugate)**
```
adj(A) = [4   -2]
         [-3   1]
```

**Step 5: Divide by Determinant**
```
A^(-1) = [4/-2   -2/-2] = [-2    1]
         [-3/-2  1/-2]    [1.5  -0.5]
```

### Example: 3×3 Matrix Inversion

For a 3×3 matrix, the process is similar but more involved:

```
A = [2  1  1]
    [1  3  2]
    [1  2  2]
```

The algorithm would:
1. Calculate det(A) using recursive 2×2 determinant calculations
2. For each element, create 2×2 minors and calculate their determinants
3. Apply sign pattern and transpose
4. Divide by determinant

## Implementation Details

### Determinant Calculation

The implementation uses recursive cofactor expansion:

```javascript
function return_determinant(m = matrix) {
    // Base case: 2×2 matrix
    if (m.rows == 2 && m.cols == 2) {
        return m.data[0][0] * m.data[1][1] - m.data[0][1] * m.data[1][0];
    }
    
    // Recursive case: expand along first row
    let det = 0.0;
    for (let c = 0; c < m.cols; c++) {
        // Create minor matrix and recurse
        det += ((-1) ** c) * m.data[0][c] * return_determinant(tmp_matrix);
    }
    return det;
}
```

### Minor Calculation

For each position (r,c), a submatrix is created by skipping that row and column:

```javascript
function return_minors(m = matrix) {
    for (let r = 0; r < m.rows; r++) {
        for (let c = 0; c < m.cols; c++) {
            // Create submatrix by removing row r and column c
            // Calculate determinant of submatrix
            // Store as minor
        }
    }
    return minor_matrix;
}
```

### Cofactor and Adjugate

The cofactor matrix is created by applying signs, then transposed for the adjugate:

```javascript
function return_adjugate(m = return_minors()) {
    // m is the minor matrix
    for (let r = 0; r < m.rows; r++) {
        for (let c = 0; c < m.cols; c++) {
            // Apply sign: (-1)^(r+c)
            // Transpose: place at [c][r]
            adjugate_matrix.data[c][r] = ((-1) ** (r + c)) * m.data[r][c];
        }
    }
    return adjugate_matrix;
}
```

### Final Inverse

```javascript
function return_inverse(m = return_adjugate(), det = return_determinant()) {
    for (let r = 0; r < m.rows; r++) {
        for (let c = 0; c < m.cols; c++) {
            inverse_matrix.data[r][c] = m.data[r][c] * (1 / det);
        }
    }
    return inverse_matrix;
}
```

## Complexity Analysis

### Time Complexity

- **2×2 matrices**: O(1) - constant time
- **3×3 matrices**: O(1) - constant time
- **n×n matrices**: O(n!) - factorial time due to recursive determinant calculations

The factorial complexity comes from:
- Computing determinant: O(n!) via cofactor expansion
- Computing minors: O(n²) minors, each requiring O(n!) determinant calculation
- Total: O(n² × n!) = O(n²·n!)

This method becomes impractical for large matrices (n > 10).

### Space Complexity

- O(n²) for storing matrices
- O(n²) for temporary submatrices during recursion
- O(n) call stack depth during recursive determinant calculation

## Limitations

1. **Performance**: The factorial time complexity makes this algorithm slow for matrices larger than approximately 8×8

2. **Numerical Stability**: For ill-conditioned matrices, floating-point errors can accumulate and produce inaccurate results

3. **Singular Matrices**: Cannot invert singular matrices (det = 0)

4. **Precision**: Floating-point arithmetic limits precision; configure the `accuracy` variable as needed

5. **Memory**: Large matrices require significant memory for temporary submatrices

## Practical Alternatives

For production use with large matrices, consider:
- **Gaussian Elimination with LU decomposition**: O(n³) time
- **Cholesky Decomposition**: For symmetric positive-definite matrices, O(n³) time
- **QR Decomposition**: More numerically stable, O(n³) time
- **Libraries**: BLAS, LAPACK, NumPy, etc. for optimized implementations

## References

- [Determinant by Cofactor Expansion](https://en.wikipedia.org/wiki/Determinant#Cofactor_expansion)
- [Adjugate Matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)
- [Matrix Inversion](https://en.wikipedia.org/wiki/Invertible_matrix)
- [Matrix Inversion by Cofactor Method - SeeMath](https://semath.info/src/inverse-cofactor-ex4.html)
- [Numerical Stability in Linear Algebra](https://en.wikipedia.org/wiki/Numerical_stability)
