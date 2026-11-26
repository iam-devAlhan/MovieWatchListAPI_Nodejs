import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const hash_password = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(password, salt)
    return hashed_password
}

const verify_password = async (password: string, hashed_password: string): Promise<boolean> => {
    const compared = await bcrypt.compare(password, hashed_password)
    return compared
}

const get_access_token = function () {
    // access token auth logic
}

const get_refresh_token = function () {
    // refresh token logic
}