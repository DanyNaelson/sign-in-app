import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Loader, Message, Schema, toaster } from 'rsuite'
import TextField from '../../text-field'
import 'rsuite/Button/styles/index.less';
import 'rsuite/Message/styles/index.less';
import 'rsuite/Form/styles/index.less';
import './index.less'
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../../../utils';
import { setUser } from '../../../utils/localstorage';
import PasswordTooltip from '../../password-tooltip';
import { BASE_URL, DEFAULT_HEADERS } from '../../../utils/constants';

const SignInForm = () => {
    const { t, i18n } = useTranslation()
    const formRef = useRef();
    const [language, setLanguage] = useState('es')
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const model = Schema.Model({
        email: Schema.Types.StringType().isEmail(t('validations.invalidEmail')).isRequired(t('validations.isRequired')),
        password: Schema.Types.StringType().isRequired(t('validations.isRequired'))
    })

    useEffect(() => {
        const lang = selectLanguage()
        lang && setLanguage(lang)
        lang === "en" && i18n.changeLanguage(lang)
    }, [])


    const handleSubmit = () => {
        // if (!formRef.current.check()) {
        //     return;
        // }

        setSubmitting(true)

        fetch(`${BASE_URL}/v1/login`, { headers: DEFAULT_HEADERS, method: 'POST', body: JSON.stringify(formValue) })
            .then(response => response.json())
            .then(result => {
                const { success } = result

                if (success) {
                    const { data: { userData, tokens } } = result
                    setUser(userData, tokens)
                    toaster.push(<Message showIcon type="success">{t('messages.success')}</Message>);
                    window.location.href = language == 'es' ? '/mi-perfil' : '/my-profile'
                } else {
                    const { message, validationErrors } = result
                    const messageError = validationErrors && validationErrors.length > 0 ? validationErrors[0] : message
                    toaster.push(<Message showIcon type='error'>{t(`${messageError}`)}</Message>)
                }
            })
            .catch(error => {
                console.log(error.message);
            })
            .finally(() => setSubmitting(false))
    };

    return (
        <div id='form-container'>
            <p id='title-form'>{t('loginToJefa')}</p>
            <Form fluid
                ref={formRef}
                onChange={setFormValue}
                onCheck={setFormError}
                formValue={formValue}
                model={model}
                className="form"
            >
                <TextField name="email" label={t('fields.email')} placeholder={t('fields.emailExample')} value={formValue.email} />
                <TextField name="password" label={`${t('fields.password')} (${t('messages.atLeastCharacter', { characters: 8 })})`} placeholder={t('fields.enterPassword')} type="password" autoComplete="off" value={formValue.password} tooltipComp={<PasswordTooltip />} />
                <Button id='submit-button' appearance="default" onClick={handleSubmit} type="submit">
                    {t('buttons.login')}
                </Button>
            </Form>
            <p className='form-text'>{t('forgotPassword')} <a href={language == 'es' ? '/reestablecer-contrasena' : '/reset-password'} className='recover-here-text'>{t('recoverHere')}</a></p>
            {submitting && <Loader center size='lg' vertical backdrop />}
        </div>
    )
}

export default SignInForm