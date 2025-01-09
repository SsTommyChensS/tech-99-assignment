// Three ways to sum to n
// Option 1: Using a Loop
// Complexity: O(n)
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Option 2: Using Recursion
// Complexity: O(n)
function sum_to_n_b(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_b(n - 1);
}

// Option 3: Arithmetic Series Formula
// Complexity: O(1)
function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}
