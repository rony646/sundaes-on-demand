import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({  message, variant }) {
    const alertMessage = message || "An unexpected error ocurred. Please try again later"
    const alertVairant = variant || 'danger';

    return(
        <Alert variant={alertVairant} style={{background: 'red'}}>
            {alertMessage}
        </Alert>
    )
}