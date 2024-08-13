import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('فیلد شماره تلفن نمی تواند خالی باشد.')
    .matches(/^09/, 'فرمت شماره تلفن صحیح نمی باشد.')
    .min(11, ({ min }) => `شماره تلفن حداقل باید ${min} رقم باشد.`)
    .max(15, ({ max }) => `شماره تلفن حداکثر باید ${max} رقم باشد.`),
  password: Yup.string()
    .required('فیلد رمز  خالی است.')
    .min(5, ({ min }) => `رمز حداقل ${min} کاراکتر می یاشد.`)
    .max(20, ({ max }) => `رمز نمی تواند بیشتر از ${max} کاراکتر باشد.`)
});

export default loginSchema;
