import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import './sign-in-form.styles.scss'
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
    email: '',
    password: '',
};

export default function SignInForm() {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert('incorrect password for email');
            } else if (error.code === 'auth/user-not-found') {
                console.log('NO USER ASSOCITATE WITH EMAIL', error);
            }
        }
    }
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
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}
