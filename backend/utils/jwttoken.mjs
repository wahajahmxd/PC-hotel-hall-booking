const sendToken = async (userPayload) => {
    const COOKIE_EXPIRE = 24;  

    if (userPayload) {
        const token = await userPayload.getJWTToken();
        const options = {
            expires: new Date(
                Date.now() + COOKIE_EXPIRE * 60 * 60 * 1000  
            ),
            httpOnly: true
        };

        const token_options = [token, options];
        return token_options;
    }
};

export { sendToken as getToken };
