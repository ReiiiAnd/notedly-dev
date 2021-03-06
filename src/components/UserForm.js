import React, {useState} from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
	border: 1px solid #f5f4f0;
	max-width: 500px;
	padding: 1em;
	margin: 0 auto;
`;

const Form = styled.form`
	label, input{
		display: block;
		line-height: 2em;
	}

	input{
		width: 100%;
		margin-bottom: 1em;
	}
`;

const UserForm = props => {
	const [values, setValues] = useState();

	const onChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	return (
		<Wrapper>
			{props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
			<Form
				onSubmit={e=>{
					e.preventDefault();
					props.action({
						variables: {
							...values
						}
					});
				}}
			>
				{props.formType === 'signup' && (
					<React.Fragment>
						<label htmlFor="username">Username:</label>
						<input type="text" id="username" placeholder="username" onChange={onChange} required />
					</React.Fragment>
				)}
				<label htmlFor="email">Email:</label>
				<input type="text" id="email" name="email" placeholder="Email" onChange={onChange} required />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" placeholder="Password" onChange={onChange} required />
				<Button type="submit">Submit</Button>
			</Form>
		</Wrapper>
	);
};

export default UserForm;