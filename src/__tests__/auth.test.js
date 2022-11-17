import moment from 'moment'
import {isTokenExpired, getTokenExpDate, getTokenInfo} from "../react/Util/authUtils";

describe('auth test', ()=>{
    it('should decipher jwt token',  () => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3YzdmOTI3LTk1YjktNDMxZC1iMjU4LTA1YjQzNjMwM2IzMCIsImV4cCI6MTY2ODYxNjQ5MywiaXNzIjoiR2F0ZXdlYiJ9.83TlpqO-NBxw3l460s5L41H_pWBPvUvbiZor_MQJBhk'
        const token2 = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3YzdmOTI3LTk1YjktNDMxZC1iMjU4LTA1YjQzNjMwM2IzMCIsImV4cCI6MTY2ODY1MDY4MCwiaXNzIjoiR2F0ZXdlYiJ9.jtmBCwSlQALT_mO78HwyrmyMEKoT6kptR1LP4re911I'
        const parsedToken = getTokenInfo(token2)
        console.log('parsedToken', parsedToken)
    });
})