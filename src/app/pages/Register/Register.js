import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './index.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

//State Modules
import authentication from '../../../authentication';

//Components
import RegisterForm from '../../components/RegisterForm';
import DateOfBirthForm from '../../components/DobForm';
import PhoneNumberForm from '../../components/PhoneNumberForm';
import EmailForm from '../../components/EmailForm';

function Register({ regStep = 1 }) {
  const history = useHistory();

  // Dispatch
  const dispatch = useDispatch();
  const registerUser = bindActionCreators(
    authentication.actions.registerUser,
    dispatch
  );
  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const { phoneNumber, email } = useSelector(
    authentication.selectors.getActiveUser
  );
  const error = useSelector(authentication.selectors.getRegisterError);
  const loading = useSelector(authentication.selectors.isRegisterLoading);

  // Registration step state
  const [step, setStep] = useState(regStep);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Request body state
  const [body, setBody] = useState({
    fullName: '',
    username: '',
    password: '',
    repeatPassword: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (isAuthorized && phoneNumber && email) {
      history.replace('/');
    }
  }, [isAuthorized, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Right before submit', body);
    registerUser(body);
  };

  const Registration = (step) => {
    switch (step) {
      case 1:
        return (
          <RegisterForm
            nextStep={nextStep}
            body={body}
            setBody={setBody}
            error={error}
            handleSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <DateOfBirthForm
            prevStep={prevStep}
            loading={loading}
            body={body}
            setBody={setBody}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
          />
        );

      default:
        return;
    }
  };

  return (
    <div className="Register">
      <Switch>
        <Route exact path="/register">
          {Registration(step)}
        </Route>
        <Route exact path="/register/phoneNumber/">
          <PhoneNumberForm />
        </Route>
        <Route exact path="/register/email/">
          <EmailForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Register;
