import React, { useEffect, useState } from 'react';
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
    email: '',
    fullName: '',
    username: '',
    password: '',
    repeatPassword: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (isAuthorized) {
      history.replace('/');
    }
  }, [isAuthorized, history]);

  const handleSubmit = () => {
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
          />
        );
      default:
        return;
    }
  };

  return (
    <React.Fragment>
      <div className="Register">{Registration(step)}</div>
    </React.Fragment>
  );
}

export default Register;
