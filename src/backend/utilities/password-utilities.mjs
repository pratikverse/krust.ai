import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10; // Store salt rounds as a constant

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Hashing error:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Comparison error:", error);
        return false; // Or throw the error if you prefer
    }
};
