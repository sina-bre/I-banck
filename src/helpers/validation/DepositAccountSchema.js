import * as Yup from 'yup';

const DepositAccountSchema = Yup.object().shape({
  name: Yup.string().required('فیلد  نام نمی تواند خالی باشد.'),
  familyName: Yup.string().required('فیلد نام خانوادگی  خالی است.'),
  postalCode: Yup.string()
    .required('فیلد کدپستی نمی تواند خالی باشد.')
    .min(10, ({ min }) => `کد پستی باید ${min} رقمی باشد`)
    .max(11, () => 'کدپستی نباید بیشتر از 10 رقم باشد '),
  address: Yup.string().required('لطفا آدرس خود را وارد کنید')
});

export default DepositAccountSchema;
