
const verifyAccountTemplate = (id) => {
    const link = `${process.env.SERVER_URL}/verify-account/${id}`
    const html = `<div>
    <div>Dear User,</div>
    
    <div>Thank you for signing up with us! In order to complete your registration and start using our services, we need you to verify your account.

    Please click the link below to confirm your email address and activate your account:</div>

    <div><a href=${link}>Click Here</a></div>

    <div>If you did not sign up with us or believe you have received this email in error, please ignore it and your information will be deleted from our system.

    Thank you for choosing our services, and please let us know if you have any questions or concerns.</div>

    <div>Best regards,</div>
    <div>The Project Complete</div>

    <div><a href="${process.env.SERVER_URL}/unsubscribe">Click Here to Unsubscribe</a>
    </div>`

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

const orderPlacedUserTemplate = ({name, title, orderId, price}) => {
    const html = `
    <div>
        <h2>Congratulations ${name}, Your order is placed.</h2>
        <h3><b>OrderId</b>: ${orderId}</h3>
        <h3><b>Title</b>: ${title}</h3>
        <h3><b>Price</b>: ${price}</h3>
        <h3><b>Looking forward for more orders from you.</b></h3>
    </div>
    `
    return html;
}

const orderRecievedTemplate = ({title, description, _id, fileUrl, category, price, name, number, address, pincode}) => {
    const html = `
    <div>
        <h3><b>Title</b>: ${title}</h3>
        <h3><b>Description</b>: ${description}</h3>
        <h3><b>FileUrl</b>: ${fileUrl}</h3>
        <h3><b>OrderId</b>: ${_id}</h3>
        <h3><b>Category</b>: ${category}</h3>
        <h3><b>Price</b>: ${price}</h3>
        <h3><b>Name</b>: ${name}</h3>
        <h3><b>Address</b>: ${address}</h3>
        <h3><b>Pincode</b>: ${pincode}</h3>
        <h3><b>Number</b>: ${number}</h3>
        
    </div>
    `
    return html;
}

module.exports = {
    verifyAccountTemplate,
    contactUsTemplate,
    orderPlacedUserTemplate,
    orderRecievedTemplate
}