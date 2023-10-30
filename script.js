document.getElementById("calcfrm").addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var numa = parseFloat(document.getElementById("a").value) || 0;
    var numb = parseFloat(document.getElementById("b").value) || 0;
    var numc = parseFloat(document.getElementById("c").value) || 0;

    // Check if input is a valid number
    if (isNaN(numa) || isNaN(numb) || isNaN(numc)) {
        // Handle invalid input, e.g., display an error message
        document.getElementById('result').textContent = 'Please enter valid numbers.';
    } else if (numa === 0) {
        document.getElementById('result').textContent = '"a" can never be zero, since it is in the denominator of the formula';
    }    else {
        // Perform calculation (for example, addition)
        var d = (Math.pow(numb, 2)) - (4*numa*numc) // d for discriminant. The value under the sqrt.
        if (d < 0) {
            document.getElementById("result").textContent = "No real roots.";
        } else if (d === 0) {
            var result1 = -numb / (2 * numa);
            result1 = result1.toFixed(4);
            document.getElementById('result').textContent = 'One real root: ' + result1;
        } else {
            var result1 = (-numb + Math.sqrt(d)) / (2 * numa);
            var result2 = (-numb - Math.sqrt(d)) / (2 * numa);
            result1 = result1.toFixed(4);
            result2 = result2.toFixed(4);
            document.getElementById('result').textContent = 'Two real roots: ' + result1 + ' and ' + result2;
        }
    }
});
