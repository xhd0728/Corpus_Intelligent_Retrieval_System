export const validatePass = (rule, value, callback) => {
    var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}');
    if (!regex.test(value)) {
        callback(new Error('密码不能少于6位，且包含大写字母、小写字母、数字、特殊符号'))
    } else {
        callback()
    }
};
