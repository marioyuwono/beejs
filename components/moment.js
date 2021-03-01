import Moment from 'react-moment'

export default function Format({ children, format}) {

    if (children==null) {
        return ''
    }

    if (format==null) {
        format = 'D MMM YYYY'
    }

    const ts = new Date(children.seconds * 1000)
    return <Moment format={format}>{ts}</Moment>
}