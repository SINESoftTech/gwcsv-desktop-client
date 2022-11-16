import {gwAxios} from "../react/Actions/axios";

/**
 *
 * @param loginPayload {taxId: string, username: string, password: string}
 * @returns {Promise<{data: {}, success: boolean, error: {code: string, message: string}}>}
 */
const userLogin = async (loginPayload) => {
    let loginResult = {
        success: false,
        data: {},
        error: {
            code: '',
            message: ''
        }
    }
    try {

        const response = await gwAxios.post('/login', JSON.stringify(loginPayload)); // await fetch(`${ROOT_URL}/auth/login`, requestOptions);
        if (response.status !== 200) {
            loginResult.success = false
            loginResult.error.code = response.status
            loginResult.error.message = response.data
        } else {
            loginResult.success = true;
            loginResult.data = {
                taxId: loginPayload.taxId,
                username: loginPayload.username,
                token: response.data.token
            };
        }
    } catch (error) {
        loginResult.success = false
        loginResult.error.code = 'SYSTEM_ERROR'
        loginResult.error.message = error.message
        console.log(error);
    }
    return loginResult;
}

export { userLogin }