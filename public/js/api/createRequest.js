/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    if (options.method == "GET") {
        let url = options.url;
        url += '?';
        for (let key in options.data) {
            url += `${key}=${options.data[key]}$`;
        }
        url = url.substring(0, url.length - 1);
        try {
            xhr.open(options.method, url);
            xhr.send(); 
        } catch (e) {
            console.log(e);
        }
    } else {
        const formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);
        } catch (e) {
            console.log(e);; 
        }
    }
    
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == xhr.DONE && xhr.status == 200) {
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.status, xhr.response);
        }
    });
    return xhr;
};
