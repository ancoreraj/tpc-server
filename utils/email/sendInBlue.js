const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SEND_IN_BLUE_API

const tranEmailApi = new Sib.TransactionalEmailsApi()

const sender = {
    email: 'ancore.nita@gmail.com',
    name: 'The Project Complete',
}

const sendEmail = async ({email, subject, htmlContent}) => {
    try{
        const data = await tranEmailApi.sendTransacEmail({
            sender,
            to: [{email}],
            subject,
            htmlContent,
        });
    }catch(err){
        console.log(err)
    }
}

module.exports = sendEmail
