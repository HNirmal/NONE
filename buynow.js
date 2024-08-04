document.addEventListener('DOMContentLoaded', () => {
    // Function to retrieve order details from localStorage and display them
    function displayOrderDetails() {
        const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
        const orderTableBody = document.querySelector('#order-table tbody');
        const totalPriceElement = document.getElementById('total-price');
        let total = 0;

        // Clear the existing table rows
        orderTableBody.innerHTML = '';

        // Create rows for each item in the order
        orderItems.forEach(({ item, quantity, price }) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item}</td><td>${quantity}</td><td>Rs : ${price.toFixed(2)}</td>`;
            orderTableBody.appendChild(row);
            total += price;
        });

        // Update the total price
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Display the order details when the page loads
    displayOrderDetails();
});




