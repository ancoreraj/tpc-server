
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