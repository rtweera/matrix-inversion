# Getting Started

A quick guide to get you started with matrix-inversion.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Your First Matrix](#your-first-matrix)
- [Web Interface](#web-interface)
- [Browser Console](#browser-console)
- [Node.js / Vanilla JavaScript](#nodejs--vanilla-javascript)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of matrices (2×2, 3×3, etc.)
- Familiarity with JavaScript (for programmatic use)

No other dependencies are required!

## Installation

### Option 1: Clone the Repository

```bash
git clone https://github.com/rtweera/matrix-inversion.git
cd matrix-inversion
```

### Option 2: Download Files

Download these files:
- `matrix-inversion.js`
- `index.html`

### Option 3: Reference Online

Include in your HTML:
```html
<script src="path/to/matrix-inversion.js"></script>
```

## Your First Matrix

### Using the Web Interface

1. **Open the application**:
   - Open `index.html` in your web browser

2. **Enter matrix data**:
   - Matrix: Space-separated numbers
   - Rows: Number of rows
   - Columns: Number of columns

3. **Example - 2×2 Matrix**:
   - Rows: `2`
   - Columns: `2`
   - Matrix: `1 2 3 4`

4. **Click "create matrix"**

5. **Check results**:
   - Open browser Developer Tools (F12 or Cmd+Option+I)
   - Go to Console tab
   - Look for output logs

### Example: Inverting [1 2; 3 4]

**Input:**
- Rows: 2
- Columns: 2
- Matrix: 1 2 3 4

**Expected Output in Console:**
```
matrix object: {rows: 2, cols: 2, data: [[1, 2], [3, 4]]}
minors object: {rows: 2, cols: 2, data: [[4, 3], [2, 1]]}
adjugate object: {rows: 2, cols: 2, data: [[4, -2], [-3, 1]]}
inverse object: {rows: 2, cols: 2, data: [[-2, 1], [1.5, -0.5]]}
```

## Web Interface

The included `index.html` provides a simple web interface:

### Layout

```
┌─────────────────────────────────┐
│ Matrix:      [input field]      │
│ Rows:        [input field]      │
│ Columns:     [input field]      │
│                                 │
│ [Create Matrix] button          │
└─────────────────────────────────┘
```

### How to Use

1. **Matrix Input**: Enter numbers separated by spaces
   - Example for 2×2: `1 2 3 4`
   - Example for 3×3: `1 2 3 4 5 6 7 8 9`

2. **Specify Dimensions**:
   - Rows: Must match the number of rows in your matrix
   - Columns: Must match the number of columns in your matrix

3. **Validate Input**:
   - Array size must equal: rows × columns
   - All values must be numbers

4. **View Results**:
   - Open browser console (F12)
   - Results are logged as objects

## Browser Console

### Opening the Console

**Chrome/Edge:**
- Press `F12` or `Ctrl+Shift+I` (Windows)
- Press `Cmd+Option+I` (Mac)

**Firefox:**
- Press `F12` or `Ctrl+Shift+K` (Windows)
- Press `Cmd+Option+K` (Mac)

**Safari:**
- Enable Developer Menu first (Preferences → Advanced)
- Press `Cmd+Option+I`

### Reading the Output

The console displays four objects:

1. **matrix object**: Your original matrix
   ```javascript
   {rows: 2, cols: 2, data: [[1, 2], [3, 4]]}
   ```

2. **minors object**: Matrix of minors
   ```javascript
   {rows: 2, cols: 2, data: [[4, 3], [2, 1]]}
   ```

3. **adjugate object**: Adjugate (transposed cofactor) matrix
   ```javascript
   {rows: 2, cols: 2, data: [[4, -2], [-3, 1]]}
   ```

4. **inverse object**: Final inverse matrix
   ```javascript
   {rows: 2, cols: 2, data: [[-2, 1], [1.5, -0.5]]}
   ```

Each object has:
- `rows`: Number of rows
- `cols`: Number of columns
- `data`: 2D array of values

## Node.js / Vanilla JavaScript

### Direct Script Usage

```html
<!DOCTYPE html>
<html>
<head>
    <script src="matrix-inversion.js"></script>
</head>
<body>
    <script>
        // Set precision
        accuracy = 3;
        
        // Create a 2x2 matrix
        const m = create_matrix(2, 2, [1, 2, 3, 4]);
        
        // Calculate all components
        const det = return_determinant(m);
        const minors = return_minors(m);
        const adjugate = return_adjugate(minors);
        const inverse = return_inverse(adjugate, det);
        
        // Display results
        console.log("Original Matrix:", m);
        console.log("Determinant:", det);
        console.log("Inverse Matrix:", inverse);
    </script>
</body>
</html>
```

### Step-by-Step Breakdown

```javascript
// 1. Create a matrix from an array
const m = create_matrix(2, 2, [1, 2, 3, 4]);
// Now: m = {rows: 2, cols: 2, data: [[1, 2], [3, 4]]}

// 2. Calculate determinant
const det = return_determinant(m);
// Now: det = -2

// 3. Calculate minors matrix
const minors = return_minors(m);
// Now: minors = {rows: 2, cols: 2, data: [[4, 3], [2, 1]]}

// 4. Calculate adjugate matrix
const adjugate = return_adjugate(minors);
// Now: adjugate = {rows: 2, cols: 2, data: [[4, -2], [-3, 1]]}

// 5. Calculate inverse
const inverse = return_inverse(adjugate, det);
// Now: inverse = {rows: 2, cols: 2, data: [[-2, 1], [1.5, -0.5]]}
```

## Common Tasks

### Task 1: Change Decimal Precision

By default, results are rounded to 3 decimal places.

**To change precision**:
```javascript
// Set to 2 decimal places
accuracy = 2;

// Or 5 decimal places
accuracy = 5;

// Now run your matrix inversion
const inverse = return_inverse(adjugate, det);
```

### Task 2: Verify Matrix Inverse

To verify your result, multiply the original matrix by its inverse. The result should be the identity matrix.

```javascript
// For a 2×2 matrix:
// A × A⁻¹ = I (identity matrix)

// Original matrix
const original = create_matrix(2, 2, [1, 2, 3, 4]);

// Calculate inverse
// ... (inverse calculation code) ...

// Verify by manual multiplication (conceptually):
// Check that original[0][0] * inverse[0][0] + original[0][1] * inverse[1][0] ≈ 1
// And so on for other elements
```

### Task 3: Invert a 3×3 Matrix

```javascript
// Define a 3×3 matrix
const arr = [1, 2, 3, 0, 4, 5, 1, 0, 6];

// Create matrix
const m = create_matrix(3, 3, arr);

// Calculate each component
const det = return_determinant(m);
if (det === 0) {
    console.log("Matrix is singular and cannot be inverted!");
} else {
    const minors = return_minors(m);
    const adjugate = return_adjugate(minors);
    const inverse = return_inverse(adjugate, det);
    console.log("3×3 Inverse:", inverse);
}
```

### Task 4: Handle Singular Matrices

A singular matrix has a determinant of 0 and cannot be inverted.

```javascript
// Create a singular matrix (two identical rows)
const m = create_matrix(2, 2, [1, 2, 1, 2]);

// Check determinant
const det = return_determinant(m);
console.log("Determinant:", det);  // Output: 0

if (det === 0) {
    console.log("Cannot invert: matrix is singular");
} else {
    const minors = return_minors(m);
    const adjugate = return_adjugate(minors);
    const inverse = return_inverse(adjugate, det);
    console.log("Inverse:", inverse);
}
```

## Troubleshooting

### Problem: "No determinant" message in console

**Cause**: Matrix is not square (rows ≠ columns)

**Solution**:
```javascript
// ❌ Wrong: 2×3 matrix
create_matrix(2, 3, [1, 2, 3, 4, 5, 6]);

// ✅ Correct: 2×2 matrix
create_matrix(2, 2, [1, 2, 3, 4]);
```

### Problem: Inverse results are NaN or Infinity

**Cause**: Determinant is 0 (singular matrix)

**Solution**:
```javascript
const det = return_determinant(m);
if (det === 0 || isNaN(det)) {
    console.log("Matrix cannot be inverted (singular matrix)");
} else {
    const inverse = return_inverse(adjugate, det);
    console.log("Inverse:", inverse);
}
```

### Problem: Results have too many or too few decimal places

**Cause**: `accuracy` variable needs adjustment

**Solution**:
```javascript
// For more precision
accuracy = 5;

// For fewer decimal places
accuracy = 2;

// Re-run your calculation
const inverse = return_inverse(adjugate, det);
```

### Problem: Web interface doesn't respond after clicking button

**Cause**: Invalid input values

**Solution**:
```
✓ Enter space-separated numbers
✓ Ensure number of values = rows × columns
✓ Ensure all values are valid numbers
✓ Matrix must be square (rows = columns)
```

### Problem: Can't see the results

**Cause**: Not looking in the right place

**Solution**:
1. Open browser console (F12)
2. Click "create matrix" button
3. Look for console logs
4. Expand objects to see their contents

---

## Next Steps

- **Learn the Algorithm**: Read [ALGORITHM.md](ALGORITHM.md)
- **Explore the API**: Read [API.md](API.md)
- **See Examples**: Check [EXAMPLES.md](EXAMPLES.md)
- **Understand the Code**: Review [matrix-inversion.js](matrix-inversion.js)

## Tips

1. **Start Small**: Begin with 2×2 matrices
2. **Verify Results**: Check if the inverse is correct mathematically
3. **Monitor Performance**: Larger matrices (> 8×8) will be slow
4. **Understand Limits**: This is an educational implementation, not optimized for production

Happy matrix inverting! 🎉
