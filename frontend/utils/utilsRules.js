export const rules = {

  valueRules: (reqMsg) => {
    return [
      (value) => !!value || reqMsg,
    ]
  },

  minCharRules: (reqMsg, minMsg, minLlength=3) => {
    return [
      (value) => !!value || reqMsg,
      (value) => (value && value.length >= minLlength) || minMsg,
    ]
  },

  emailRules: (reqMsg, validMsg) => {
    return [
      (value) => !!value || reqMsg,
      (value) => /.+@.+\..+/.test(value) || validMsg,
    ]
  },

  urlRules: (reqMsg, validMsg) => {
    return [
      (value) => !!value || reqMsg,
      (value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value) || validMsg,
    ]
  },

  passwordLoginRules: (typeMsg) => {
    return [
      (value) => !!value || typeMsg,
    ]
  },

  passwordRules: (typeMsg, minMsg) => { 
    return [
      (value) => !!value || typeMsg,
      (value) => (value && value.length >= 6) || minMsg,
    ]
  },

  confirmPasswordRules: (confirmMsg) => {
    return [
      (value) => !!value || confirmMsg,
      // (value) => value === pwd || matchMsg,
    ]
  },

  checkboxRules: (agreeMsg) => {
    return [
      v => !!v || agreeMsg,
    ]
  },

}
