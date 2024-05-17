function Vaalidation(values) {
    let error = {};

    // Define the regex pattern for password validation
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // Email validation
    if (values.email === "") {
        error.email = "Email should not be empty";
    } else {
        error.email = "";
    }

    // Password validation
    if (values.password === "") {
        error.password = "Password should not be empty";
    } else {
        error.password = "";

        // Validate password using regex pattern
        if (!password_pattern.test(values.password)) {
            if (!/\d/.test(values.password)) {
                error.password += "Password must contain at least one digit. ";
            }

            if (!/[a-z]/.test(values.password)) {
                error.password += "Password must contain at least one lowercase letter. ";
            }

            if (!/[A-Z]/.test(values.password)) {
                error.password += "Password must contain at least one uppercase letter. ";
            }

            if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
                error.password += "Password can only contain alphanumeric characters. ";
            }

            if (values.password.length < 8) {
                error.password += "Password must be at least 8 characters long. ";
            }
        }
    }

    // Trim the password error message
    if (error.password) {
        error.password = error.password.trim();
    }

    return error;
}

export default Vaalidation;

