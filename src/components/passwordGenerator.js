export const passwordGenerator = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const getRandomChar = (chars) => {
        return chars[Math.floor(Math.random() * chars.length)];
    };

    const generatePassword = (length, options) => {
        // Do not generate a password if length is 0 or less. //solution for 0 length value
        if (length <= 0) {
            return "Cannot generate password with length 0";
        }

        // Build the character pool based on the selected options.
        
        let charPool = "";
        if (options.uppercase) {
            charPool += uppercaseChars;
        }
        if (options.lowercase) {
            charPool += lowercaseChars;
        }
        if (options.numbers) {
            charPool += numbers;
        }
        if (options.symbols) {
            charPool += symbols;
        }

        // If no option is selected, return an error message.
        if (charPool === "") {
            return "Select at least one option";
        }

        // Build the password directly, one random character at a time. with this we can also generate multiple random one at a time chracaters for multiple random option even if the length of slider is 1
        let password = "";
        for (let i = 0; i < length; i++) {
            password += getRandomChar(charPool);
        }
        return password;
    };

    return generatePassword;
};
