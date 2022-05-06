import React from 'react'
import { useTranslation } from 'react-i18next'
import './index.less'

const PasswordTooltip = () => {
    const { t } = useTranslation()

    return (
        <div>
            <p className='tooltip-paragraph'>{t('messages.passwordMustBe')}:</p>
            <p className='tooltip-paragraph'>- {t('messages.oneUppercaseLetter')}</p>
            <p className='tooltip-paragraph'>- {t('messages.oneLowercaseLetter')}</p>
            <p className='tooltip-paragraph'>- {t('messages.specialCharacter')}</p>
            <p className='tooltip-paragraph'>- {t('messages.aNumber')}</p>
            <p className='tooltip-paragraph'>- {t('messages.minimumCharacters', { characters: 8 })}</p>
            <p className='tooltip-paragraph'>- {t('messages.maximumCharacters', { characters: 20 })}</p>
        </div>
    )
}

export default PasswordTooltip