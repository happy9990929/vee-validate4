import { object, string, ref, array } from 'yup';
const required = '必填';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordRegExp = /[a-zA-Z0-9]/;

export const schema = object().shape({
  email: string().required(required).email('E-mail輸入錯誤'),
  password: string()
    .required(required)
    .min(8, '密碼最少8位')
    .max(20, '密碼最多20位')
    .matches(passwordRegExp, '請輸入不含符號的半形英文、數字'),
  confirmPassword: string()
    .oneOf([ref('password')], '輸入密碼不相同')
    .required(required),
  phone: string().matches(phoneRegExp, '手機輸入錯誤'),
  userName: string().nullable().required(required),

  link: array().of(string().required('請輸入標題')),
});
