function sum_to_n(n) {
    return (n * (n + 1)) / 2; // Using arithmetic series formula for efficiency
}

function calculateSum() {
    const inputElement = document.getElementById('numberInput');
    const resultElement = document.getElementById('result');
    const n = parseInt(inputElement.value, 10);

    if (isNaN(n) || n <= 0) {
        resultElement.innerHTML = '⚠️ Please enter a valid positive number!';
        resultElement.style.color = '#e74c3c';
        return;
    }

    const sum = sum_to_n(n);
    resultElement.innerHTML = `✅ The sum of numbers from 1 to ${n} is: <strong>${sum}</strong>`;
    resultElement.style.color = '#2c3e50';
}
