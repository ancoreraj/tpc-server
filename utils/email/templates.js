
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
        <ul>
        <li><b>OrderId</b>: ${orderId}</li>
        <li><b>Title</b>: ${title}</li>
        <li><b>Price</b>: ${price}</li>
        <div>You will recieve your purchase within 8 - 10 days of purchase.</div>
        <div>For any query, write us at <b><i>${process.env.ADMIN_EMAIL}</i><b></div>
        <div><b>Looking forward for more orders from you.</b></div>
        </ul>
    </div>
    `
    return html;
}

const orderRecievedTemplate = ({title, description, _id, fileUrl, category, price, name, number, address, pincode}) => {
    const html = `
    <div>
        <h3>Yay!! New Order Recieved.</h3>
        <ul>
        <li><b>Title</b>: ${title}</li>
        <li><b>Description</b>: ${description}</li>
        <li><b>FileUrl</b>: ${fileUrl}</li>
        <li><b>OrderId</b>: ${_id}</li>
        <li><b>Category</b>: ${category}</li>
        <li><b>Price</b>: ${price}</li>
        <li><b>Name</b>: ${name}</li>
        <li><b>Address</b>: ${address}</li>
        <li><b>Pincode</b>: ${pincode}</li>
        <li><b>Number</b>: ${number}</li>
        </ul>
    </div>
    `
    return html;
}

const freelanceTemplate = ({name, category}) => {
    const html = `
        <div>
            <h3>Congratulations, ${name},</h3>
            <div>You are now added as a Partner for category <b><i>${category}</i></b>.</div>
            <div>Best regards,</div>
            <div>The Project Complete</div>
        </div>
    `

    return html;
}


const resetPasswordTemplate = (code) => {
    const html = `
        <div>

        <div>We have received a request to reset the password for your account. </div>
        <div>If you did not make this request, please ignore this email.</div>

        <div>Below is your reset code</div>
        <h3><b>${code}</b></h3>
        <div>Please note that the link will expire in 30 minutes.</div>

        <div>If you have any issues or concerns, please don't hesitate to contact us at ${process.env.ADMIN_EMAIL}</div>

        <div>Best regards,</div>
        <div>The Project Complete</div>
        </div>
    `

    return html;
}

const setFreelanceTemplate = ({title, description, fileUrl}) => {
    const html = `
    <div>
        <h3>Yay!! You recieved a new Project request.</h3>
        <ul>
        <li><b>Title</b>: ${title}</li>
        <li><b>Description</b>: ${description}</li>
        <li><b>FileUrl</b>: ${fileUrl}</li>
        </ul>
    </div>
    `
    
    return html;
}

const cancelOrderTemplate = (orderId, title, price) => {
    const html = `
    <div>
        <h2>Your Order has now been canceled.</h2>
        <ul>
        <li><b>OrderId</b>: ${orderId}</li>
        <li><b>Title</b>: ${title}</li>
        <li><b>Price</b>: ${price}</li>
        <div>You will recieve your refund within 8 - 10 days.</div>
        <div>For any query, write us at <b><i>${process.env.ADMIN_EMAIL}</i><b></div>
        </ul>
    </div>
    `
    return html;
}

module.exports = {
    verifyAccountTemplate,
    contactUsTemplate,
    orderPlacedUserTemplate,
    orderRecievedTemplate,
    freelanceTemplate,
    resetPasswordTemplate,
    setFreelanceTemplate,
    cancelOrderTemplate
}