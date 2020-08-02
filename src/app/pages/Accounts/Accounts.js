import React, { useEffect } from 'react';
import './index.scss';
import { Route, Switch, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//Modules
import authentication from '../../../authentication';
import users from '../../../users';

//Pages
import NotFound from '../../pages/NotFound/NotFound';

// Components
import EditInfoForm from '../../components/EditInfoForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';

function Accounts() {
  //   const { username } = useParams();
  const location = useLocation();

  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const error = useSelector(users.selectors.getUsersError);

  return (
    <React.Fragment>
      <div className="Accounts">
        {!!error ? (
          <NotFound />
        ) : (
          <>
            <div className="AccountsContainer">
              <div className="AccountsNavigation">
                <ul className="NavigationList">
                  <li
                    className={
                      location.pathname === `/Accounts/edit/`
                        ? 'active'
                        : undefined
                    }
                  >
                    <Link to={{ pathname: `/Accounts/edit/` }}>
                      Edit Profile
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === `/Accounts/password/change/`
                        ? 'active'
                        : undefined
                    }
                  >
                    <Link to={{ pathname: `/Accounts/password/change/` }}>
                      Change Password
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="AccountsInfo">
                <Switch>
                  <Route exact path="/Accounts/edit/">
                    <EditInfoForm />
                  </Route>
                  <Route exact path="/Accounts/password/change/">
                    <ChangePasswordForm />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Accounts;
