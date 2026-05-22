# Matrix Inversion

A pure JavaScript implementation of matrix inversion without external libraries. This project demonstrates how to compute matrix inverses from scratch using the cofactor method, supporting matrices of arbitrary size.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Overview

**Background**: This project started as a challenge to write a program to solve simultaneous equations with multiple variables. After solving the 2-variable case, the goal expanded to create a solution for systems of equations with any number of variables. While initially created using Python and NumPy, the final implementation was built from scratch in pure JavaScript to demonstrate the underlying mathematical principles without relying on external libraries.

**Purpose**: This project serves as both a practical tool for computing matrix inverses and an educational resource for understanding the mathematical algorithm behind matrix inversion.

## Features

- **Pure JavaScript**: No external dependencies or libraries required
- **Arbitrary Size Matrices**: Works with matrices of any size (n × n)
- **Step-by-Step Algorithm**: Implements the cofactor method, showing each computation step
- **Web-Based UI**: Interactive HTML interface for testing
- **Precision Control**: Configurable decimal point accuracy for results
- **Well-Documented**: Comprehensive documentation and code comments

## Quick Start

### Browser Usage

1. Open `index.html` in a web browser
2. Enter your matrix values as space-separated numbers
3. Specify the number of rows and columns
4. Click "create matrix" to compute the inverse
5. Check the browser console for results

Example: For a 2×2 matrix [1 2 3 4]:
- Rows: 2
- Columns: 2
- Matrix: `1 2 3 4`

### Node.js / JavaScript Usage

```javascript
// Include the script
<script src="matrix-inversion.js"></script>

// Create a 2x2 matrix
const matrixArray = [1, 2, 3, 4];
const matrixObj = create_matrix(2, 2, matrixArray);

// Calculate inverse
const minorsObj = return_minors(matrixObj);
const adjugateObj = return_adjugate(minorsObj);
const determinant = return_determinant(matrixObj);
const inverseObj = return_inverse(adjugateObj, determinant);

console.log(inverseObj);
```

## Installation

### As a Script

Simply include the JavaScript file in your HTML:

```html
<script src="matrix-inversion.js"></script>
```

### Direct File Usage

The project consists of three main files:
- `matrix-inversion.js` - Core matrix inversion logic
- `index.html` - Web interface
- `README.md` - This file

No build process or dependencies are required.

## Usage

### Setting Precision

At the top of `matrix-inversion.js`, you can configure the decimal precision:

```javascript
var accuracy = 3;    // Results will be rounded to 3 decimal places
```

### Matrix Format

Matrices are represented as JavaScript objects:

```javascript
const matrix = {
    rows: 2,
    cols: 2,
    data: [
        [1, 2],
        [3, 4]
    ]
};
```

### Function API

| Function | Description |
|----------|-------------|
| `create_matrix(rows, cols, array)` | Creates a matrix object from array values |
| `return_determinant(m)` | Calculates the determinant of a matrix |
| `return_minors(m)` | Computes the matrix of minors |
| `return_adjugate(m)` | Computes the adjugate matrix |
| `return_inverse(m, det)` | Calculates the final inverse matrix |

For detailed documentation, see [API.md](API.md).

## How It Works

The matrix inversion algorithm uses the **cofactor method**, which involves four main steps:

1. **Compute Minors**: For each element, calculate the determinant of the submatrix formed by removing that element's row and column
2. **Apply Cofactor Signs**: Apply alternating signs (+/-) to create the cofactor matrix
3. **Transpose (Adjugate)**: Transpose the cofactor matrix to get the adjugate matrix
4. **Divide by Determinant**: Divide each element of the adjugate by the matrix's determinant

### Mathematical Formula

For a matrix **A**, the inverse is: **A⁻¹ = adj(A) / det(A)**

Where:
- **adj(A)** is the adjugate matrix
- **det(A)** is the determinant

For detailed mathematical explanations, see [ALGORITHM.md](ALGORITHM.md).

## Project Structure

```
matrix-inversion/
├── README.md                    # This file
├── index.html                   # Web interface
├── matrix-inversion.js          # Core implementation
├── ALGORITHM.md                 # Detailed algorithm explanation
├── API.md                       # Complete API documentation
├── GETTING_STARTED.md           # Quick start guide
└── EXAMPLES.md                  # Usage examples and tutorials
```

## Documentation

This project includes comprehensive documentation:

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Quick setup and basic usage
- **[API.md](API.md)** - Complete function and parameter documentation
- **[ALGORITHM.md](ALGORITHM.md)** - Deep dive into the mathematical algorithm
- **[EXAMPLES.md](EXAMPLES.md)** - Practical examples and use cases

## Examples

### Example 1: 2×2 Matrix

```javascript
// Create a simple 2x2 matrix
const arr = [4, 7, 2, 6];
const m = create_matrix(2, 2, arr);
const det = return_determinant(m);
const minors = return_minors(m);
const adjugate = return_adjugate(minors);
const inverse = return_inverse(adjugate, det);

// Result will be displayed in console
```

### Example 2: 3×3 Matrix

For more examples, see [EXAMPLES.md](EXAMPLES.md).

## Contributing

Contributions are welcome! If you find bugs or have suggestions:

1. Feel free to open issues or pull requests
2. Test your changes thoroughly
3. Ensure code style is consistent with existing code
4. Update documentation as needed

## References

- [Matrix Inversion Using Cofactor Method](https://semath.info/src/inverse-cofactor-ex4.html)
- [Determinant Calculation](https://en.wikipedia.org/wiki/Determinant)
- [Adjugate Matrix](https://en.wikipedia.org/wiki/Adjugate_matrix)

## License

This project is open source and available for educational and practical use.
