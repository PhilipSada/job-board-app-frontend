export const loginCheck = async ()=>{
    let token= localStorage.getItem('token');
    if(token !== null){
        return true;
    }else{
        return false;
    }
}

export const getAuthUser = ()=>{
    let user = localStorage.getItem('user');
    if(user !== null){
        return JSON.parse(user);
    }else{
        return {};
    }
}