document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const subscribeBtn = document.getElementById("subscribeBtn");
    const messageDiv = document.getElementById("message");

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    subscribeBtn.addEventListener("click", async function () {
        const email = emailInput.value.trim();

        if (!email) {
            messageDiv.textContent = "Please enter a valid email address.";
            messageDiv.classList.add("text-danger");
            return;
        }

        if (!isValidEmail(email)) {
            messageDiv.textContent = "Please enter a valid email address.";
            messageDiv.classList.add("text-danger");
            return;
        }

        // Show loading state
        subscribeBtn.textContent = "Subscribing...";
        subscribeBtn.disabled = true;
        messageDiv.textContent = "";

        try {
            const response = await fetch("https://smart-rent.vercel.app/post/newsletter/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                messageDiv.textContent = "Subscription successful! 🎉";
                messageDiv.classList.remove("text-danger");
                messageDiv.classList.add("text-success");
                emailInput.value = "";
            } else {
                messageDiv.textContent = "Something went wrong. Please try again.";
                messageDiv.classList.add("text-danger");
            }
        } catch (error) {
            messageDiv.textContent = "Something went wrong. Please try again.";
            messageDiv.classList.add("text-danger");
        } finally {
            subscribeBtn.textContent = "Subscribe";
            subscribeBtn.disabled = false;
        }
    });
});
