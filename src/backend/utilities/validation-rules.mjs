import { body } from "express-validator";
const registerValidationRules = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("phone")
        .isNumeric()
        .withMessage("Invalid phone number")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 digits"),
];

const loginValidationRules = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
];

export { registerValidationRules, loginValidationRules };
