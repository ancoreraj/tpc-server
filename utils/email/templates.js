
const verifyAccountTemplate = (id) => {
    const link = `http://localhost:5000/verify-account/${id}`
    const html = `<p>Click this link to verify your account ${link}</p>`

    return html;
}


module.exports = {
    verifyAccountTemplate
}