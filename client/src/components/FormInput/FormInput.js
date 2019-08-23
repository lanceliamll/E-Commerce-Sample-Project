import { Fragment } from "inferno";


const FormInput = ({ ...otherInputProps }) => (
  <Fragment>
    <input className="form-control" {...otherInputProps} />
  </Fragment>
)

export default FormInput