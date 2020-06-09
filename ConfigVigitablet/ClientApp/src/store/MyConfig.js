export default {
    "key": {
        //'url': 'http://vigitablet.ddns.net:3001/'
        //'url': 'http://190.79.163.12:3001/'
        //url': 'http://192.168.250.2:80/vigitablet/'
        //'url': 'http://vigitablet.ddns.net:45455/'
        //'url': 'http://localhost:2530/',
        //'url': 'http://vigitablet.hopto.org:4001/',
        'user': 0,
        'url': 'http://api.seguricel.com/',
        //'url': 'http://132.148.128.20/plesk-site-preview/api.seguricel.com/132.148.128.20/',
        'CurrentPage': ''

        // 'url': 'http://192.168.250.4:3001/'
    }
};
/*export interface paramsCommand {
    url: string,
    action: string,
    method: string,
    access_token: string,
    searchParams: string,
}*/
export const GetCurretPage = () => 'configconttrolpoint';
export const SetCurrentPage = currentPage => {

};
export const exec = async (params) => {
    const separador = params.url.charAt(params.url.length - 1) === '/' ? '' : '/';
    return await fetch(params.url + separador + params.action, {
        method: params.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + params.access_token
        },
        body: params.searchParams
    });
};