import { Fragment } from 'inferno';

const FormButton = ({ children, ...otherButtonProps }) => (
  <Fragment>
    <button className="btn btn-primary" {...otherButtonProps}>
      {' '}
      {children}
    </button>
  </Fragment>
);

export default FormButton;
