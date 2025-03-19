export const uiController = (passwordGenerator, strengthChecker) => {
    const passwordInput = document.getElementById("password");
    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const generateButton = document.getElementById("generate");
    const copyButton = document.getElementById("copy");
    const refreshButton = document.getElementById("refresh");
    const strengthElement = document.getElementById("strength");

    const handleGeneratePassword = () => {
        const length = Number.parseInt(lengthSlider.value);
        const options = {
            uppercase: uppercaseCheckbox.checked,
            lowercase: lowercaseCheckbox.checked,
            numbers: numbersCheckbox.checked,
            symbols: symbolsCheckbox.checked,
        };

        const password = passwordGenerator(length, options);
        passwordInput.value = password;

        strengthChecker.updateUI(password, strengthElement);
        addPasswordAnimation();
    };

    const copyToClipboard = async () => {
        if (!passwordInput.value) return;
    
        try {
            await navigator.clipboard.writeText(passwordInput.value);
    
            const originalText = copyButton.textContent;
            copyButton.textContent = "Copied!";
    
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const updateSlider = () => {
        const value = lengthSlider.value;
        const min = Number.parseInt(lengthSlider.min) || 0;
        const max = Number.parseInt(lengthSlider.max) || 64;

        const percentage = ((value - min) / (max - min)) * 100;

        lengthSlider.style.background = `linear-gradient(to right,
            var(--primary, #6366f1) 0%, 
            var(--primary, #6366f1) ${percentage}%, 
            var(--gray-light, #e5e7eb) ${percentage}%, 
            var(--gray-light, #e5e7eb) 100%)`;
    };

    const addPasswordAnimation = () => {
        passwordInput.style.transform = "scale(1.02)";
        passwordInput.style.borderColor = "#6366f1";

        setTimeout(() => {
            passwordInput.style.transform = "scale(1)";
            passwordInput.style.borderColor = "#e5e7eb";
        }, 400);
    };

    const initializeUI = () => {
        lengthSlider.addEventListener("input", () => {
            lengthValue.textContent = lengthSlider.value;
            updateSlider();
        });

        generateButton.addEventListener("click", () => {
            handleGeneratePassword();
        });

        copyButton.addEventListener("click", () => {
            copyToClipboard();
        });

        refreshButton.addEventListener("click", () => {
            handleGeneratePassword();
        });

        updateSlider();
    };

    return {
        initializeUI,
        handleGeneratePassword,
        copyToClipboard,
        updateSlider,
    };
};
