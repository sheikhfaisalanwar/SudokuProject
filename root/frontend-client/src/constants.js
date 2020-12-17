require('dotenv').config({path: '../../../.env'})

export const localHostUrl = process.env.LOCALHOST_URL + process.env.SERVER_PORT;