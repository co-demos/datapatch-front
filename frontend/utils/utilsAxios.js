 export class configHeaders {
  constructor (token='', tokenType='Bearer') {
    this.token = token
    this.tokenType = tokenType
    this.headersObj = {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `${tokenType} ${token}`
    };
  }

  get headers () {
    return { headers: this.headersObj }
  }

 }
