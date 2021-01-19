    /**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;
    let url = options.url;

    if (options.method == "GET") {
        url += '?';
        for (let key in options.data) {
            url += `${key}=${options.data[key]}&`;
        }
        url = url.substring(0, url.length - 1);
        try {
            xhr.open(options.method, url);
            xhr.send(); 
        } catch (e) {
            options.callback(e);
        }
    } else {
        const formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        try {
            xhr.open(options.method, url);
            xhr.send(formData);
        } catch (e) {
            options.callback(e); 
        }
    }
    
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == xhr.DONE && xhr.status == 200) {
            console.log(xhr.response);
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.status, xhr.response);
        }
    });
    
    return xhr;
};
