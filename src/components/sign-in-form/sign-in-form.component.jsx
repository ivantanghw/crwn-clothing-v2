import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import { UserContext } from "../../contexts/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // no longer require - const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    // Button for logging in with Redirect can be added:
    // <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
    /*const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
        // no longer require - setCurrentUser(user);
    }*/
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
      };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // create user document with email + password
        try {
            // destructure the user object
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // Get the "user" object into the context
            // no longer require - setCurrentUser(user);
            resetFormFields();

        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
            default:
                console.log(error);
            }
        };
    };

   
    const handleChange = (event) => {
        const { name, value } = event.target;

        // only update one field while keep others constant by "...formFields"
        setFormFields({...formFields, [name]:value}); 
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
                />

                <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
                />
                
                <div className='buttons-container'>
                    <Button
                        type='submit'
                    >
                        Sign In
                    </Button>
                    <Button
                        buttonType={ BUTTON_TYPE_CLASSES.google }
                        type='button'
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>

        </div>
    );
};

export default SignInForm;