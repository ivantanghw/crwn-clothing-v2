import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType] || BaseButton);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;


/*
// Below is the old version without styled components
import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
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
/*
Button is used in sign-in-form component
                <div className='buttons-container'>
                    <Button buttonType='' type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
*/
