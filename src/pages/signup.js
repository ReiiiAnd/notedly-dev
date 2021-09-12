import React, { useEffect, useState } from 'react';
import {useMutation, useApolloClient, gql} from '@apollo/client';
import styled from 'styled-components';
import Button from '../components/Button';
import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = (props) => {

	const client = useApolloClient();
	const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
	    onCompleted: data => {
	      // store the token
	      localStorage.setItem('token', data.signUp);
	      // update the local cache
	      client.writeData({ data: { isLoggedIn: true } });
	      // redirect the user to the homepage
	      props.history.push('/');
	    }
	});

	const [values, setValues] = useState();

	const onChange = event =>{
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	}

	useEffect(() => {
        // update the document title
        document.title = 'Sign Up — Notedly';
    });

	return (
		<React.Fragment>
			<UserForm action={signUp} formType="signup" />
			{loading && <p>Loading...</p>}
			{error && <p>Error creating an account!</p>}
		</React.Fragment>
	);
};

export default SignUp;
