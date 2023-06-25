import Cookie from 'js-cookie';
const setCookie = (cookieName, usrin)=>{
    Cookie.set(cookieName, usrin, {
        expires: 2, // 2 days
        //secure: true,
        sameSite: 'strict',
        path: '/' // es valida para cualquier path en el servidor
    })
};
export default setCookie