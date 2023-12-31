export default function removeToken () {
    const date = new Date();
    const nowMonth = date.getMonth();
    const nowDay = date.getDate();

    const limitSaveTokenMonth = Number(process.env.VUE_APP_LIMIT_TOKEN_MONTH);
    const limitSaveTokenDay = Number(process.env.VUE_APP_LIMIT_TOKEN_DAY);
    
    const saveMonth = Number(localStorage.getItem('month'));
    const saveDay = Number(localStorage.getItem('day'));

    const betweenMonth = Math.abs(nowMonth - saveMonth);
    const betweenDay = Math.abs(nowDay - saveDay);

    if (betweenDay > limitSaveTokenDay ||
        ((betweenMonth > limitSaveTokenMonth) &&
            (betweenDay > limitSaveTokenDay))) {
        localStorage.removeItem('token');
    }
}