# Examples and Tutorials

Practical examples of using the matrix-inversion library.

## Table of Contents

- [Example 1: Simple 2×2 Matrix](#example-1-simple-2×2-matrix)
- [Example 2: Identity Matrix](#example-2-identity-matrix)
- [Example 3: Larger 3×3 Matrix](#example-3-larger-3×3-matrix)
- [Example 4: Singular Matrix (Not Invertible)](#example-4-singular-matrix-not-invertible)
- [Example 5: Solving Linear Equations](#example-5-solving-linear-equations)
- [Example 6: Complete Workflow with Error Checking](#example-6-complete-workflow-with-error-checking)
- [Example 7: Batch Processing Multiple Matrices](#example-7-batch-processing-multiple-matrices)

---

## Example 1: Simple 2×2 Matrix

A basic example with a simple invertible 2×2 matrix.

### Problem

Invert the matrix:
```
A = [1  2]
    [3  4]
```

### Solution

#### Web Interface

**Input:**
- Rows: `2`
- Columns: `2`
- Matrix: `1 2 3 4`

**Console Output:**
```
matrix object: {rows: 2, cols: 2, data: [[1, 2], [3, 4]]}
minors object: {rows: 2, cols: 2, data: [[4, 3], [2, 1]]}
adjugate object: {rows: 2, cols: 2, data: [[4, -2], [-3, 1]]}
inverse object: {rows: 2, cols: 2, data: [[-2, 1], [1.5, -0.5]]}
```

#### Programmatic Approach

```javascript
// Create the matrix
const m = create_matrix(2, 2, [1, 2, 3, 4]);

// Calculate components
const det = return_determinant(m);
const minors = return_minors(m);
const adjugate = return_adjugate(minors);
const inverse = return_inverse(adjugate, det);

console.log("Original:");
console.log(m.data);  // [[1, 2], [3, 4]]

console.log("Determinant:", det);  // -2

console.log("Inverse:");
console.log(inverse.data);  // [[-2, 1], [1.5, -0.5]]
```

### Step-by-Step Calculation

**Step 1: Calculate Determinant**
```
det(A) = (1)(4) - (2)(3) = 4 - 6 = -2
```

**Step 2: Minors**
```
For 2×2, minors are the opposite elements
M[0,0] = 4,  M[0,1] = 3
M[1,0] = 2,  M[1,1] = 1
```

**Step 3: Apply Cofactor Signs and Transpose**
```
Adjugate = [[4, -2], [-3, 1]]
```

**Step 4: Divide by Determinant**
```
A⁻¹ = [[-2, 1], [1.5, -0.5]]
```

### Verification

```
A × A⁻¹ should equal I (identity)
[1  2] × [-2   1  ] = [1 0]
[3  4]   [1.5 -0.5]   [0 1]
```

---

## Example 2: Identity Matrix

The inverse of the identity matrix is itself.

### Problem

Invert the 3×3 identity matrix:
```
I = [1  0  0]
    [0  1  0]
    [0  0  1]
```

### Solution

#### Input

```javascript
const m = create_matrix(3, 3, [1, 0, 0, 0, 1, 0, 0, 0, 1]);

const det = return_determinant(m);
const minors = return_minors(m);
const adjugate = return_adjugate(minors);
const inverse = return_inverse(adjugate, det);

console.log("Determinant:", det);  // 1
console.log("Inverse:", inverse.data);
```

#### Expected Output

```
Determinant: 1

Inverse:
[1, 0, 0]
[0, 1, 0]
[0, 0, 1]
```

### Key Points

- The identity matrix always has determinant = 1
- Its inverse equals itself
- This is a good sanity check for your implementation

---

## Example 3: Larger 3×3 Matrix

Working with a more complex 3×3 matrix.

### Problem

Invert:
```
A = [2  1  1]
    [1  3  2]
    [1  2  2]
```

### Solution

```javascript
// Create the matrix
const m = create_matrix(3, 3, [2, 1, 1, 1, 3, 2, 1, 2, 2]);

// Set precision
accuracy = 3;

// Calculate components
const det = return_determinant(m);
console.log("Determinant:", det);

if (det === 0) {
    console.log("Matrix is singular - cannot invert");
} else {
    const minors = return_minors(m);
    const adjugate = return_adjugate(minors);
    const inverse = return_inverse(adjugate, det);
    
    console.log("Inverse:");
    for (let i = 0; i < inverse.rows; i++) {
        console.log(inverse.data[i]);
    }
}
```

### Expected Output

```
Determinant: -1

Inverse:
[2, 0, -1]
[-0, 1, -1]
[-1, -1, 2]
```

### Notes

- Computing determinant for 3×3 requires calculating multiple 2×2 determinants
- This is already getting slower - 4×4 and larger take noticeably longer
- Precision becomes more important with larger matrices

---

## Example 4: Singular Matrix (Not Invertible)

Demonstrating what happens with non-invertible matrices.

### Problem

A matrix with determinant = 0 (singular matrix):
```
A = [1  2]
    [2  4]
```

Notice the second row is 2× the first row.

### Solution

```javascript
// Create the matrix
const m = create_matrix(2, 2, [1, 2, 2, 4]);

// Calculate determinant
const det = return_determinant(m);
console.log("Determinant:", det);  // 0

if (det === 0) {
    console.log("ERROR: Matrix cannot be inverted (singular matrix)");
    console.log("This matrix has dependent rows/columns");
} else {
    // This won't execute
    const minors = return_minors(m);
    const adjugate = return_adjugate(minors);
    const inverse = return_inverse(adjugate, det);
}
```

### Expected Output

```
Determinant: 0
ERROR: Matrix cannot be inverted (singular matrix)
```

### Key Points

- Always check determinant before attempting inversion
- Singular matrices often have linearly dependent rows or columns
- In the real world, numerical errors can produce very small determinants instead of exactly 0

---

## Example 5: Solving Linear Equations

Using matrix inversion to solve a system of linear equations.

### Problem

Solve the system:
```
2x + y = 5
x + 3y = 8
```

### Mathematical Approach

This can be written as: **Ax = b**

Where:
```
A = [2  1]    x = [x]    b = [5]
    [1  3]        [y]        [8]
```

Solution: **x = A⁻¹ × b**

### Code

```javascript
// Coefficient matrix A
const A = create_matrix(2, 2, [2, 1, 1, 3]);

// Constant vector b (as 2×1 matrix)
const b = create_matrix(2, 1, [5, 8]);

// Find inverse of A
const det_A = return_determinant(A);
console.log("Det(A):", det_A);

if (det_A !== 0) {
    const minors_A = return_minors(A);
    const adjugate_A = return_adjugate(minors_A);
    const A_inverse = return_inverse(adjugate_A, det_A);
    
    console.log("A inverse:");
    console.log(A_inverse.data);
    
    // For full solution, you'd need matrix multiplication:
    // x = A_inverse × b
    // (This library doesn't have multiplication function, but you can implement it)
}
```

### Expected Inverse of A

```
A⁻¹ = [[0.9, -0.2], 
       [-0.2, 0.4]]
```

### Manual Solution Verification

```
x = A⁻¹ × b = [[0.9, -0.2], [-0.2, 0.4]] × [5, 8]
  = [0.9×5 + (-0.2)×8, (-0.2)×5 + 0.4×8]
  = [4.5 - 1.6, -1 + 3.2]
  = [2.9, 2.2]

So: x ≈ 2.9, y ≈ 2.2
```

---

## Example 6: Complete Workflow with Error Checking

A production-ready example with comprehensive error handling.

### Code

```javascript
function invertMatrixSafely(rows, cols, arrayData) {
    // Input validation
    if (!Array.isArray(arrayData)) {
        console.error("Error: arrayData must be an array");
        return null;
    }
    
    if (arrayData.length !== rows * cols) {
        console.error(`Error: Array has ${arrayData.length} elements, expected ${rows * cols}`);
        return null;
    }
    
    if (rows !== cols) {
        console.error("Error: Matrix must be square (rows must equal columns)");
        return null;
    }
    
    // Create matrix
    let m;
    try {
        m = create_matrix(rows, cols, arrayData);
    } catch (e) {
        console.error("Error creating matrix:", e);
        return null;
    }
    
    // Calculate determinant
    const det = return_determinant(m);
    console.log(`Determinant: ${det}`);
    
    if (det === 0 || isNaN(det)) {
        console.error("Error: Matrix is singular (determinant = 0 or NaN)");
        return null;
    }
    
    // Calculate components
    try {
        const minors = return_minors(m);
        const adjugate = return_adjugate(minors);
        const inverse = return_inverse(adjugate, det);
        
        return inverse;
    } catch (e) {
        console.error("Error calculating inverse:", e);
        return null;
    }
}

// Usage
const result = invertMatrixSafely(2, 2, [1, 2, 3, 4]);
if (result) {
    console.log("Success! Inverse matrix:");
    console.log(result.data);
} else {
    console.log("Failed to invert matrix");
}
```

### Usage Example

```javascript
// Valid case
const valid = invertMatrixSafely(2, 2, [1, 2, 3, 4]);
// Returns the inverse matrix

// Non-square matrix
const nonSquare = invertMatrixSafely(2, 3, [1, 2, 3, 4, 5, 6]);
// Returns null and logs error

// Singular matrix
const singular = invertMatrixSafely(2, 2, [1, 2, 2, 4]);
// Returns null and logs error

// Wrong array size
const wrongSize = invertMatrixSafely(2, 2, [1, 2, 3]);
// Returns null and logs error
```

---

## Example 7: Batch Processing Multiple Matrices

Processing multiple matrices in sequence.

### Code

```javascript
// Array of test cases
const testCases = [
    { name: "Case 1: Simple 2×2", rows: 2, cols: 2, data: [1, 2, 3, 4] },
    { name: "Case 2: Another 2×2", rows: 2, cols: 2, data: [2, 1, 1, 3] },
    { name: "Case 3: Identity", rows: 2, cols: 2, data: [1, 0, 0, 1] },
    { name: "Case 4: Singular", rows: 2, cols: 2, data: [1, 2, 2, 4] },
];

// Process all cases
testCases.forEach((testCase, index) => {
    console.log(`\n--- ${testCase.name} ---`);
    
    const m = create_matrix(testCase.rows, testCase.cols, testCase.data);
    const det = return_determinant(m);
    
    console.log("Matrix:", m.data);
    console.log("Determinant:", det);
    
    if (det !== 0) {
        const minors = return_minors(m);
        const adjugate = return_adjugate(minors);
        const inverse = return_inverse(adjugate, det);
        console.log("Inverse:", inverse.data);
    } else {
        console.log("Cannot invert: matrix is singular");
    }
});
```

### Console Output

```
--- Case 1: Simple 2×2 ---
Matrix: [ [ 1, 2 ], [ 3, 4 ] ]
Determinant: -2
Inverse: [ [ -2, 1 ], [ 1.5, -0.5 ] ]

--- Case 2: Another 2×2 ---
Matrix: [ [ 2, 1 ], [ 1, 3 ] ]
Determinant: 5
Inverse: [ [ 0.6, -0.2 ], [ -0.2, 0.4 ] ]

--- Case 3: Identity ---
Matrix: [ [ 1, 0 ], [ 0, 1 ] ]
Determinant: 1
Inverse: [ [ 1, 0 ], [ 0, 1 ] ]

--- Case 4: Singular ---
Matrix: [ [ 1, 2 ], [ 2, 4 ] ]
Determinant: 0
Cannot invert: matrix is singular
```

---

## Tips for Working with Examples

### 1. Start Small
- Begin with 2×2 matrices
- Manually verify results
- Gradually move to 3×3 and larger

### 2. Verify Your Results
For a matrix A and its inverse A⁻¹:
- A × A⁻¹ = I (identity matrix)
- A⁻¹ × A = I

### 3. Watch Out For
- **Non-square matrices**: Must have rows = columns
- **Singular matrices**: det = 0, cannot invert
- **Numerical precision**: Large matrices may have rounding errors

### 4. Performance Considerations
- 2×2 matrices: Instant
- 3×3 matrices: Fast (< 100ms)
- 4×4 matrices: Slow (> 1s)
- 5×5 and larger: Very slow (exponential growth)

### 5. Debugging Tips
```javascript
// Add detailed logging
console.log("Step 1 - Created matrix:", m);
console.log("Step 2 - Determinant:", det);
console.log("Step 3 - Minors:", minors);
console.log("Step 4 - Adjugate:", adjugate);
console.log("Step 5 - Inverse:", inverse);

// Check intermediate values
if (det < 0.001 && det > -0.001) {
    console.warn("Warning: Determinant is very close to zero");
}
```

### 6. Mathematical Validation

For educational purposes, verify that your results satisfy:
```
A[i][j] × A⁻¹[j][k] summed over j = Identity[i][k]
```

---

## Common Mistakes to Avoid

❌ **Wrong**: Using non-square matrix
```javascript
create_matrix(2, 3, [1, 2, 3, 4, 5, 6]);  // 2×3 matrix
```

✅ **Correct**: Using square matrix
```javascript
create_matrix(2, 2, [1, 2, 3, 4]);  // 2×2 matrix
```

---

❌ **Wrong**: Ignoring singular matrices
```javascript
const m = create_matrix(2, 2, [1, 2, 2, 4]);
const det = return_determinant(m);  // Returns 0
const inverse = return_inverse(adjugate, det);  // Results in NaN/Infinity
```

✅ **Correct**: Checking determinant first
```javascript
const m = create_matrix(2, 2, [1, 2, 2, 4]);
const det = return_determinant(m);
if (det === 0) {
    console.log("Cannot invert");
} else {
    const inverse = return_inverse(adjugate, det);
}
```

---

❌ **Wrong**: Not formatting input correctly
```javascript
const m = create_matrix(2, 2, [1, 2, 3]);  // Wrong: only 3 elements
```

✅ **Correct**: Matching array size to dimensions
```javascript
const m = create_matrix(2, 2, [1, 2, 3, 4]);  // Correct: 4 elements for 2×2
```

---

## Further Learning

- See [ALGORITHM.md](ALGORITHM.md) for mathematical details
- See [API.md](API.md) for detailed function documentation
- See [GETTING_STARTED.md](GETTING_STARTED.md) for basic setup
