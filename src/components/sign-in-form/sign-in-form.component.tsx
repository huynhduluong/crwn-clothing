import { ChangeEvent, FormEvent, useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFields = {
    email: '',
    password: '',
};

export default function SignInForm() {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields()
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
                alert('incorrect password for email');
            } else if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
                console.log('NO USER ASSOCITATE WITH EMAIL', error);
            }
        }
    }
    return (
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}
