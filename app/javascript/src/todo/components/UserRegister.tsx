import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory, Redirect } from 'react-router-dom';
import { Formik, FormikActions, FormikProps, FieldProps, Field } from 'formik';
import * as yup from 'yup';
import { Row, Form, Input, Button, Alert } from 'antd';

import { UserContext } from '../context/UserContext';
import { AuthTokenContext } from '../context/AuthTokenContext';

type UserRegistrationValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const createUserMutation = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      jwt
      errors
    }
  }
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter an email address.'),
  password: yup
    .string()
    .required('Please enter a password.'),
  firstName: yup
    .string()
    .required('Please enter a first name.'),
  lastName: yup
    .string()
    .required('Please enter a last name.')
});

const UserRegister: React.FC = () => {
  const [message, setMessage] = React.useState(null);
  const history = useHistory();
  const { setJwt } = useContext(AuthTokenContext);
  const { authenticated } = useContext(UserContext);
  const [createUser] = useMutation(createUserMutation);

  if (authenticated === true) {
    return <Redirect to="/" />;
  }

  const onSubmit = async (values: UserRegistrationValues) => {
    setMessage(null);
    try {
      const { data } = await createUser({
        variables: {
          user: values
        }
      });

      if (data.createUser.jwt !== null) {
        setJwt(data.createUser.jwt);
        history.push('/');
      } else {
        setMessage('There was an error creating your account.');
      }
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <h1>Sign Up</h1>

      {message && <Alert type="error" message={message} />}

      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
        validationSchema={validationSchema}
        onSubmit={(
          values: UserRegistrationValues,
          actions: FormikActions<UserRegistrationValues>
        ) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
        render={(
          formikBag: FormikProps<UserRegistrationValues>
        ) => (
          <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
            <Field
              name="email"
              render={({
                field,
                form
              }: FieldProps<UserRegistrationValues>) => (
                <Form.Item label="Email">
                  <Input type="text" {...field} />
                  {form.errors.email && form.touched.email ? (
                    <p>{form.errors.email}</p>
                  ) : null}
                </Form.Item>
              )}
            />

            <Field
              name="password"
              render={({
                field,
                form
              }: FieldProps<UserRegistrationValues>) => (
                <Form.Item label="Password">
                  <Input type="password" {...field} />
                  {form.errors.email && form.touched.email ? (
                    <p>{form.errors.password}</p>
                  ) : null}
                </Form.Item>
              )}
            />

            <Field
              name="firstName"
              render={({
                field,
                form
              }: FieldProps<UserRegistrationValues>) => (
                <Form.Item label="First Name">
                  <Input type="text" {...field} />
                  {form.errors.firstName && form.touched.firstName ? (
                    <p>{form.errors.firstName}</p>
                  ) : null}
                </Form.Item>
              )}
            />

            <Field
              name="lastName"
              render={({
                field,
                form
              }: FieldProps<UserRegistrationValues>) => (
                <Form.Item label="Last Name">
                  <Input type="text" {...field} />
                  {form.errors.lastName && form.touched.lastName ? (
                    <p>{form.errors.lastName}</p>
                  ) : null}
                </Form.Item>
              )}
            />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={formikBag.isSubmitting}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      />
    </Row>
  );
};

export default UserRegister;
