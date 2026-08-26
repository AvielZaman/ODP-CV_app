function PrivateDetails() {
    return (
        <div className='details'>
            <h2> Enter your details :</h2>
            <label> Full Name*:</label>
            <input required type='text' />

            <label> Email*:</label>
            <input required type='email' />

            <label> Phone*:</label>
            <input required type='tel' />
        </div>
    )
}

export default PrivateDetails;