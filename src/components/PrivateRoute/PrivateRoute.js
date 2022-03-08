import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                user ||loggedInUser.username? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivateRoute;