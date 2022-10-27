import React, {FC, ReactElement} from 'react'
import { useTranslation } from 'react-i18next'
import InputBox from '../ui/inputBox/InputBox'
import SelectBox from '../ui/inputBox/SelectBox'
import './myInfoSection.scss'

interface InfoProps {
  datas:datas
}

type datas = {
  name: string,
  surname: string,
  password:string,  
  email: string,
  phoneNumber: string,
  language: "it" | "en"
}

const MyInfoSection:FC<InfoProps> = (props):ReactElement => {

const { t }:any = useTranslation();
    
  return (
    <section className='myInfo-container'>
        <InputBox label={t('login.name')} type='text' upperCase={true} defaultValue={props.datas.name} />
        <InputBox label={t('login.surname')} type='text' upperCase={true} defaultValue={props.datas.surname} />
        <InputBox label={t('login.email')} type='email' defaultValue={props.datas.email} />
        <InputBox label={t('login.password')} type='password' defaultValue={props.datas.password} />
        <InputBox label={t('login.phoneNumber')} type='text' upperCase={true} defaultValue={props.datas.phoneNumber} />
        <SelectBox label={t('login.language')} items={[t('login.italian'), t('login.english')]} />
    </section>
  )
}

export default MyInfoSection