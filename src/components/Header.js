import React from 'react';
import logo from '../img/logo.svg';
import styled from 'styled-components';

import {useQuery, gql} from '@apollo/client';
import {Link, withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const Header = (props) => {

  const { data, client } = useQuery(IS_LOGGED_IN);

	return (
		<HeaderBar>
			<img src={logo} alt="Notedly Logo" height="40" />
			<LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? ( 
          <ButtonAsLink
            onClick={() => {
              // remove the token
              localStorage.removeItem('token');
              // clear the application's cache
              client.resetStore();
              // update local state
              client.writeData({ data: { isLoggedIn: false } });
              // redirect the user to the homepage
              props.history.push('/');
            }}
          >Log out
          </ButtonAsLink> 
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or {' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
		</HeaderBar>
	);
};

export default withRouter(Header);