export const checkText = (value: string): boolean => {
  const re = /^[a-z ,.'-]+$/i
  let ok = re.exec(value)
  return !!ok ? true : false
}

export const checkEmail = (email: string): boolean => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  let ok = re.exec(email)
  return !!ok ? true : false
}

export const checkPhone = (phone: string): boolean => {
  const re = /^(([+]|00)39)?((3[1-6][0-9]))(\d{7})$/g
  let ok = re.exec(phone)
  return !!ok ? true : false
}

export const checkCF = (cf: string): boolean => {
  const re =
    /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$/g
  let ok = re.exec(cf)
  return !!ok ? true : false
}

export const checkConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  console.log(password, confirmPassword)
  console.log("uguale?", password === confirmPassword)
  return password === confirmPassword
}

export const checkPassword = (password: string): boolean => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
  let ok = re.exec(password)
  return !!ok ? true : false
}
