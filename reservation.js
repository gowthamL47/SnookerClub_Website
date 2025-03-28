document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const form = e.target; // Reference to the form
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const date = document.querySelector('input[name="date"]').value;
        const time = document.querySelector('input[name="time"]').value;

        const response = await fetch("http://localhost:3000/reserve-table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, date, time })
        });

        const result = await response.json();
        alert(result.success || result.error);

        // Clear the form fields after successful submission
        if (response.ok) {
            form.reset();
        }
    });
});
