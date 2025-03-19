export const strengthChecker = () => {
    const strengthLabels = {
        0: { text: "Not Acceptable", class: "too-weak" },
        1: { text: "Weak", class: "weak" },
        2: { text: "Medium", class: "medium" },
        3: { text: "Strong", class: "strong" },
        4: { text: "Very Strong", class: "very-strong" }
    };

    const checkStrength = (password) => {
        const validPasswordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/;
        if (!password || !validPasswordRegex.test(password)) {
            return { score: 0, ...strengthLabels[0] };
        }
        let score = 0;
        if (password.length >= 6) score += 1;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        score = Math.min(4, Math.floor(score / 1.5));
        return {
            score,
            ...strengthLabels[score]
        };
    };

    const updateUI = (password, strengthElement) => {
        if (!strengthElement) return;
        const { text, class: className } = checkStrength(password);
        strengthElement.textContent = text;
        strengthElement.classList.remove("weak", "medium", "strong", "very-strong");
        if (className) strengthElement.classList.add(className);
    };

    return {
        checkStrength,
        updateUI
    };
};
