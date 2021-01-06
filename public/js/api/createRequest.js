/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let method = options.method;
    let headers = options.headers;
    let data = options.data;
    let responseType = options.responseType;
    let callback = options.callback;
    let response;
    xhr.withCredentials = true;
    xhr.open(method, url);
    xhr.addEventListener('readystatechange', () => {
        if (this.readyState == xhr.DONE) {
            response = JSON.parse(this.responseText);
            callback(null, response);
        }
    });
    if (method == "GET") {
        xhr.send();
    } else {
        let formData = new FormData();
        formData.append('mail', data.mail);
        formData.append('password', data.password);
        xhr.send(formData);
    }
};
