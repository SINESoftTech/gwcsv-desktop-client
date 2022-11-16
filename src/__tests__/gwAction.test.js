import {userLogin} from "../usecases/userLogin";
import {getHistoryAssignLogVersion, getHistoryAssignLog} from "../usecases/getHistoryAssignLog";

describe('test gwAction user actions',  ()=>{
  it('should loginSuccess', async () => {
    const loginResult = await userLogin({taxId: '24549210', username: 'string123', password: 'string123'})
    console.log(loginResult)
  });

  it('should return history assign log version', async () => {
    const result = await getHistoryAssignLogVersion();
    console.log('result', result)
  });
  it('should return history assign log', async () => {
    const result = await getHistoryAssignLog('69e8722ec44419e26998c3cbd37d85258f44078225baede2198b790cef645ba0');
    console.log('result', result)
  });
})