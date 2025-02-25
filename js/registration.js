// registration.js

// On page load, check if we're in edit mode and populate the form accordingly.
document.addEventListener("DOMContentLoaded", function () {
    // Handle remaining fees field toggling
    const remainingFeesSelect = document.getElementById("remaining-fees");
    const feesGroup = document.getElementById("fees-group");
    remainingFeesSelect.addEventListener("change", function() {
        if (this.value === "yes") {
            feesGroup.style.display = "block";
        } else {
            feesGroup.style.display = "none";
        }
    });

    // If in edit mode, populate fields
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        const student = students.find(s => s.id == editId);
        if (student) {
            document.getElementById('name').value = student.name;
            document.getElementById('surname').value = student.surname;
            document.getElementById('email').value = student.email;
            document.getElementById('phone').value = student.phone;
            document.getElementById('hall').value = student.hall;
            document.getElementById('seat').value = student.seat_number;
            document.getElementById('seat-type').value = student.seat_type;
            document.getElementById('payment-method').value = student.payment_method;
            document.getElementById('remaining-fees').value = student.remaining_fees;
            if (student.remaining_fees === 'yes') {
                feesGroup.style.display = 'block';
                document.getElementById('fees').value = student.fees_amount;
            }
            document.getElementById('registration-date').value = student.registration_date;
            document.title = "Edit Student - Name Study-Room";
            const headerH2 = document.querySelector('h2');
            if (headerH2) headerH2.textContent = "Edit Student Registration";
        }
    }
});

// Handle registration form submission.
document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const student = {
        id: Date.now(), // Generate a unique ID for new registrations.
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        hall: document.getElementById('hall').value,
        seat_number: parseInt(document.getElementById('seat').value),
        seat_type: document.getElementById('seat-type').value,
        payment_method: document.getElementById('payment-method').value,
        remaining_fees: document.getElementById('remaining-fees').value,
        fees_amount: document.getElementById('remaining-fees').value === 'yes' ? parseInt(document.getElementById('fees').value) : 0,
        registration_date: document.getElementById('registration-date').value
    };

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (editId) {
        // Update existing student
        students = students.map(s => s.id == editId ? { ...student, id: Number(editId) } : s);
    } else {
        students.push(student);
    }
    localStorage.setItem("students", JSON.stringify(students));
    alert("Student registration saved successfully.");
    window.location.href = "students.html";
});
