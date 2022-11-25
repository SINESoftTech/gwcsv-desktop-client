import {userLogin, refreshToken} from "../usecases/userLogin";
import {getServerHistoryAssignLog, getServerHistoryAssignLogVersion} from "../usecases/getHistoryAssignLog";

describe('test gwAction user actions',  ()=>{
  it('should loginSuccess', async () => {
    const loginResult = await userLogin({taxId: '24549210', username: 'string123', password: 'string123'})
    console.log(loginResult)
  });
  it('should refresh token', async () => {
    const result = await refreshToken('eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3YzdmOTI3LTk1YjktNDMxZC1iMjU4LTA1YjQzNjMwM2IzMCIsImV4cCI6MTY2ODczNjQ1OCwiaXNzIjoiR2F0ZXdlYiJ9.D6XRZem5KqIdgf1v1-S1gCjzZOU3KLzSgcWVrn_PzJ8');
    console.log('result', result)
  });

  it('should return history assign log version', async () => {
    const result = await getServerHistoryAssignLogVersion();
    console.log('result', result)
  });
  it('should return history assign log', async () => {
    const result = await getServerHistoryAssignLog('69e8722ec44419e26998c3cbd37d85258f44078225baede2198b790cef645ba0');
    console.log('result', result)
  });
})