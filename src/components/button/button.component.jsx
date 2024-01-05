import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

/* Button is used in sign-in-form component
                <div className='buttons-container'>
                    <Button buttonType='' type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
*/