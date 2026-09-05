// ==========================================
// MULTI-STEP FORM WIZARD
// ==========================================


// Current step
let currentStep = 0;


// Get all form steps
const formSteps = document.querySelectorAll(".form-step");


// Get progress steps
const progressSteps = document.querySelectorAll(".step-item");


// Buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");


// Progress bar
const progressBar = document.getElementById("progressBar");


// Form
const form = document.getElementById("registrationForm");


// ==========================================
// FORM DATA STATE OBJECT
// ==========================================

const formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    username: "",
    password: "",
    confirmPassword: "",
    course: "",

    address: "",
    city: "",
    state: "",
    pincode: ""
};


// ==========================================
// SHOW CURRENT STEP
// ==========================================

function showStep(step) {

    formSteps.forEach((formStep, index) => {

        formStep.classList.toggle(
            "active",
            index === step
        );

    });


    progressSteps.forEach((stepItem, index) => {

        stepItem.classList.remove("active");

        stepItem.classList.remove("completed");


        if (index < step) {
            stepItem.classList.add("completed");
        }


        if (index === step) {
            stepItem.classList.add("active");
        }

    });


    // Update progress bar

    const progressPercentage =
        (step / (formSteps.length - 1)) * 100;


    progressBar.style.width =
        progressPercentage + "%";


    // Previous button

    if (step === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
    }


    // Next / Submit buttons

    if (step === formSteps.length - 1) {

        nextBtn.style.display = "none";

        submitBtn.style.display = "block";

        updateReview();

    } else {

        nextBtn.style.display = "block";

        submitBtn.style.display = "none";
    }

}


// ==========================================
// GET INPUT VALUE
// ==========================================

function getValue(id) {

    return document
        .getElementById(id)
        .value
        .trim();

}


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    const errors =
        document.querySelectorAll(".error");

    errors.forEach(error => {

        error.textContent = "";

    });


    const inputs =
        document.querySelectorAll(
            "input, select, textarea"
        );

    inputs.forEach(input => {

        input.classList.remove("invalid");

    });

}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(inputId, errorId, message) {

    document
        .getElementById(inputId)
        .classList.add("invalid");


    document
        .getElementById(errorId)
        .textContent = message;

}


// ==========================================
// VALIDATE STEP 1
// ==========================================

function validateStep1() {

    clearErrors();

    let valid = true;


    const firstName = getValue("firstName");

    const lastName = getValue("lastName");

    const email = getValue("email");

    const phone = getValue("phone");


    if (firstName === "") {

        showError(
            "firstName",
            "firstNameError",
            "First name is required."
        );

        valid = false;

    } else if (firstName.length < 2) {

        showError(
            "firstName",
            "firstNameError",
            "Enter at least 2 characters."
        );

        valid = false;
    }


    if (lastName === "") {

        showError(
            "lastName",
            "lastNameError",
            "Last name is required."
        );

        valid = false;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        showError(
            "email",
            "emailError",
            "Email is required."
        );

        valid = false;

    } else if (!emailPattern.test(email)) {

        showError(
            "email",
            "emailError",
            "Enter a valid email address."
        );

        valid = false;
    }


    const phonePattern =
        /^[0-9]{10}$/;


    if (phone === "") {

        showError(
            "phone",
            "phoneError",
            "Phone number is required."
        );

        valid = false;

    } else if (!phonePattern.test(phone)) {

        showError(
            "phone",
            "phoneError",
            "Enter a valid 10-digit phone number."
        );

        valid = false;
    }


    if (valid) {

        formData.firstName = firstName;

        formData.lastName = lastName;

        formData.email = email;

        formData.phone = phone;
    }


    return valid;
}


// ==========================================
// VALIDATE STEP 2
// ==========================================

function validateStep2() {

    clearErrors();

    let valid = true;


    const username =
        getValue("username");


    const password =
        getValue("password");


    const confirmPassword =
        getValue("confirmPassword");


    const course =
        getValue("course");


    if (username === "") {

        showError(
            "username",
            "usernameError",
            "Username is required."
        );

        valid = false;

    } else if (username.length < 4) {

        showError(
            "username",
            "usernameError",
            "Username must be at least 4 characters."
        );

        valid = false;
    }


    if (password === "") {

        showError(
            "password",
            "passwordError",
            "Password is required."
        );

        valid = false;

    } else if (password.length < 6) {

        showError(
            "password",
            "passwordError",
            "Password must contain at least 6 characters."
        );

        valid = false;
    }


    if (confirmPassword === "") {

        showError(
            "confirmPassword",
            "confirmPasswordError",
            "Please confirm your password."
        );

        valid = false;

    } else if (password !== confirmPassword) {

        showError(
            "confirmPassword",
            "confirmPasswordError",
            "Passwords do not match."
        );

        valid = false;
    }


    if (course === "") {

        showError(
            "course",
            "courseError",
            "Please select a course."
        );

        valid = false;
    }


    if (valid) {

        formData.username = username;

        formData.password = password;

        formData.confirmPassword =
            confirmPassword;

        formData.course = course;
    }


    return valid;
}


// ==========================================
// VALIDATE STEP 3
// ==========================================

function validateStep3() {

    clearErrors();

    let valid = true;


    const address =
        getValue("address");


    const city =
        getValue("city");


    const state =
        getValue("state");


    const pincode =
        getValue("pincode");


    if (address === "") {

        showError(
            "address",
            "addressError",
            "Address is required."
        );

        valid = false;

    } else if (address.length < 10) {

        showError(
            "address",
            "addressError",
            "Please enter a complete address."
        );

        valid = false;
    }


    if (city === "") {

        showError(
            "city",
            "cityError",
            "City is required."
        );

        valid = false;
    }


    if (state === "") {

        showError(
            "state",
            "stateError",
            "State is required."
        );

        valid = false;
    }


    const pinPattern =
        /^[0-9]{6}$/;


    if (pincode === "") {

        showError(
            "pincode",
            "pincodeError",
            "PIN code is required."
        );

        valid = false;

    } else if (!pinPattern.test(pincode)) {

        showError(
            "pincode",
            "pincodeError",
            "Enter a valid 6-digit PIN code."
        );

        valid = false;
    }


    if (valid) {

        formData.address = address;

        formData.city = city;

        formData.state = state;

        formData.pincode = pincode;
    }


    return valid;
}


// ==========================================
// VALIDATE CURRENT STEP
// ==========================================

function validateCurrentStep() {

    if (currentStep === 0) {

        return validateStep1();

    }


    if (currentStep === 1) {

        return validateStep2();

    }


    if (currentStep === 2) {

        return validateStep3();

    }


    return true;
}


// ==========================================
// UPDATE REVIEW
// ==========================================

function updateReview() {

    document.getElementById("reviewName")
        .textContent =
        formData.firstName +
        " " +
        formData.lastName;


    document.getElementById("reviewEmail")
        .textContent =
        formData.email;


    document.getElementById("reviewPhone")
        .textContent =
        formData.phone;


    document.getElementById("reviewUsername")
        .textContent =
        formData.username;


    document.getElementById("reviewCourse")
        .textContent =
        formData.course;


    document.getElementById("reviewAddress")
        .textContent =
        formData.address;


    document.getElementById("reviewCity")
        .textContent =
        formData.city;


    document.getElementById("reviewState")
        .textContent =
        formData.state;


    document.getElementById("reviewPincode")
        .textContent =
        formData.pincode;

}


// ==========================================
// NEXT BUTTON
// ==========================================

nextBtn.addEventListener("click", function () {

    if (!validateCurrentStep()) {

        return;
    }


    if (currentStep < formSteps.length - 1) {

        currentStep++;

        showStep(currentStep);

    }

});


// ==========================================
// PREVIOUS BUTTON
// ==========================================

prevBtn.addEventListener("click", function () {

    if (currentStep > 0) {

        currentStep--;

        showStep(currentStep);

        clearErrors();

    }

});


// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const successMessage =
        document.getElementById("successMessage");


    successMessage.style.display = "block";


    submitBtn.disabled = true;

    submitBtn.textContent =
        "Submitted ✓";


    console.log(
        "Submitted Form Data:",
        formData
    );

});



showStep(currentStep);