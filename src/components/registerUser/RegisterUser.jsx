import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import PT from 'prop-types';

import { registerUser } from '../../store/actions/authActions';

import styles from './RegisterUser.module.scss';

const RegisterUser = ({ textContent }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const isAlreadyRegistered = useSelector((state) => state.auth.isAlreadyRegistered);

  const errorMessage = isAlreadyRegistered
    ? <p>{textContent[0]}</p>
    : null;

  const onSubmit = (values) => {
    const user = {
      ...values,
    };

    dispatch(registerUser(user));
  };

  const onError = (error) => console.log('[error]', error);

  return (
    <div className={styles.register}>
      {errorMessage}
      <form
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <fieldset>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              pattern: {
                value: /^[a-zA-Z_\-0-9]+@[a-z]+\.[a-z]{2,3}$/,
                message: 'Invalid email addres',
              },
            }}
            render={({
              field: {
                onChange, onBlur, value,
              },
            }) => (
              <input
                label="Email"
                placeholder={textContent[1]}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <ErrorMessage errors={errors} name="email" />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters',
              },
            }}
            render={({
              field: {
                onChange, onBlur, value,
              },
            }) => (
              <input
                label="Password"
                placeholder={textContent[2]}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <ErrorMessage errors={errors} name="password" />

        </fieldset>
        <div className={styles.form__button_wrapper}>
          <button
            type="submit"
            className="button button__secondary"
          >
            <div className="inner">{textContent[3]}</div>
          </button>
        </div>

      </form>
      <p className={styles.register__paragraph}>{textContent[4]}</p>
      <Link to="/login" className={styles.register__link}>{textContent[5]}</Link>
    </div>

  );
};

RegisterUser.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

RegisterUser.defaultProps = {
  textContent: [
    'This user is already registered. Please go to the login page',
    'Email',
    'Password',
    'Register',
    'Already have account?',
    'Go to login page',
  ],
};
export default RegisterUser;
