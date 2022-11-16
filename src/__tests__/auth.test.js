import jwt_decode from 'jwt-decode'
import moment from 'moment'

const isTokenExpired = (token) => {
    const result = jwt_decode(token)
    const expDate = moment(new Date(result.exp * 1000)).utcOffset(8)
    const now = moment().utcOffset(8)
    const dateDiff = now.diff(expDate)
    return dateDiff >=0
}
describe('auth test', ()=>{
    it('should decipher jwt token',  () => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3YzdmOTI3LTk1YjktNDMxZC1iMjU4LTA1YjQzNjMwM2IzMCIsImV4cCI6MTY2ODYxNjQ5MywiaXNzIjoiR2F0ZXdlYiJ9.83TlpqO-NBxw3l460s5L41H_pWBPvUvbiZor_MQJBhk'
        const isExpired = isTokenExpired(token)
        expect(isExpired).toBe(false)

    });
})