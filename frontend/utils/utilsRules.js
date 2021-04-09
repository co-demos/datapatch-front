export const rules = {

  valueRules: (reqMsg) => {
    return [
      (value) => !!value || reqMsg,
    ]
  },

  emailRules: (reqMsg, validMsg) => {
    return [
      (value) => !!value || reqMsg,
      (value) => /.+@.+\..+/.test(value) || validMsg,
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
