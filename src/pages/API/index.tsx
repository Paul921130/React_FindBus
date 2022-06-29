import API_Path from './path';
interface I_parameter {
    grant_type: string;
    client_id: string;
    client_secret: string;
}
export const get_token = () => {
    const parameter: any = {
        grant_type: 'client_credentials',
        client_id: 'paul86677889-d4a6fc93-0f49-44b9',
        client_secret: '55e1f726-b2ea-4de4-9a38-6548c39cdd6f',
    };
    let formBody = [];
    for (let property in parameter) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(parameter[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    let newformBody = formBody.join('&');
    try {
        return fetch(
            'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
            {
                method: 'POST', // or 'PUT'
                mode: 'cors',
                // body: JSON.stringify(parameter), // data can be `string` or {object}!
                body: newformBody,
                headers: {
                    Accept: 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log('token', data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};

export const get_findBus = (token: any) => {
    console.log(token);
    try {
        return fetch(API_Path.findBus, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token.access_token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};

export const get_NearByStop = (token: any, locat: any) => {
    console.log('get_NearByStop', locat);
    const Url =
        'https://tdx.transportdata.tw/api/advanced/v2/Bus/Stop/NearBy?%24top=30&%24spatialFilter=nearby%28' +
        locat.lat +
        '%2C%20' +
        locat.lon +
        '%2C%201000%29&%24format=JSON';
    try {
        return fetch(Url, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token.access_token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};
