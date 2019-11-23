// 抽取token
// 1.保存token
const KEY = 'token'
export function setToken(token){
    window.localStorage.setItem(KEY,token);
}
// 2.获取token
export function getToken(){
    return window.localStorage.getItem(KEY);
}


// 3.删除token
export function removeToken(){
    window.localStorage.removeItem(KEY);
}