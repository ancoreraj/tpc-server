
const verifyAccountTemplate = (id) => {
    const link = `http://localhost:5000/verify-account/${id}`
    const html = `<p>Click this link to verify your account ${link}</p>`

    return html;
}

const contactUsTemplate = ({name, email, message, contactNo}) => {
    const html = `
    <ul>
        <li><b>Name</b>: ${name}</li>
        <li><b>Email</b>: ${email}</li>
        <li><b>Contact No</b>: ${contactNo}</li>
        <li><b>Message</b>: ${message}</li>
    </ul>`
    return html;
}


module.exports = {
    verifyAccountTemplate,
    contactUsTemplate
}