import Cookie from 'js-cookie';
const getCookie = (cookieName)=>{
   return Cookie.get(cookieName)
};
export default getCookie;