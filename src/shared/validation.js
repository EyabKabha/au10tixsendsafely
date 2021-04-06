import vest,{ validate, test, enforce } from 'vest';


const validateTrackerData = (data = {}, changedField) => validate('tracker_data', () => {

 
    vest.only(changedField);

    test('work_space_role', 'Required Field', () => {
        enforce(data.work_space_role)
            .isNotEmpty()
    });

    test('email', 'Enter a valid email address.', () => {
        enforce(data.email)
            .isNotEmpty()
            .matches(EMAIL_REGEX);
    })

    test('work_space_name', 'Required Field', () => {
        enforce(data.work_space_name)
            .isNotEmpty()
    })

    test('date', 'Required Field', () => {
        enforce(data.date)
            .isNotEmpty()
    })

    test('account_manager', 'Required Field', () => {
        enforce(data.account_manager)
            .isNotEmpty()
    })

    test('customer', 'Required Field', () => {
        enforce(data.customer)
            .isNotEmpty()
    })
})

const validateAccountManager= (data = {}, changedField) => validate('account_manager', () => {

    vest.only(changedField);

    test('first_name', 'Required Field', () => {
        enforce(data.first_name)
            .isNotEmpty()
    });
    test('last_name', 'Required Field', () => {
        enforce(data.last_name)
            .isNotEmpty()
    });
})

const validateLoginIn= (data = {}, changedField) => validate('account_manager', () => {

    vest.only(changedField);

    test('email', 'Please enter a valid email address.', () => {
        enforce(data.email)
            .isNotEmpty().matches(EMAIL_REGEX);
    });
    test('password', 'Required Field', () => {
        enforce(data.password)
            .isNotEmpty()
    });
})
const EMAIL_REGEX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export {
    validateTrackerData,
    validateAccountManager,
    validateLoginIn
}