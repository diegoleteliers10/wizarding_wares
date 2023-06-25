import Cookie from 'js-cookie';
const removeCookie = (cookieName)=>{
    Cookie.remove(cookieName);
};
export default removeCookie;