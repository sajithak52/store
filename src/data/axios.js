import axios from "axios";

const generateFormData = function (data) {
    const bodyFormData = new FormData();

    for (let [key, value] of Object.entries(data)) {

        if (Array.isArray(value)) {
            const length = value.length;
            let i;
            for (i = 0; i < length; i += 1) {
                bodyFormData.append(key, value[i]);
            }
        } else {
            bodyFormData.append(key, value);
        }
    }

    return bodyFormData;
};

const form = function (url, data, encrypted_fields = []) {
    const bodyFormData = generateFormData(data, encrypted_fields);

    return axios({
        method  : 'post',
        url     : url,
        data    : bodyFormData,
        headers : {'Content-Type' : 'multipart/form-data'}
    });
};

export default {
    form,

    axios : axios,

    interceptors : axios.interceptors,
    get          : axios.get,
    post         : axios.post
};
