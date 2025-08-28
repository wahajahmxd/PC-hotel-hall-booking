const sendToken = async (userPayload) => {
    // Hardcoding the COOKIE_EXPIRE value directly
    const COOKIE_EXPIRE = 24;  // Example: 24 hours expiration

    if (userPayload) {
        const token = await userPayload.getJWTToken();
        const options = {
            expires: new Date(
                Date.now() + COOKIE_EXPIRE * 60 * 60 * 1000  // Convert hours to milliseconds
            ),
            httpOnly: true
        };

        const token_options = [token, options];
        return token_options;
    }
};

export { sendToken as getToken };
