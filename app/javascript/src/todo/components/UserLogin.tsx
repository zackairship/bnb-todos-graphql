import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory, Redirect } from 'react-router-dom';
import { Formik, FormikActions, FormikProps, FieldProps, Field } from 'formik';
import * as yup from 'yup';
import { Row, Form, Input, Button, Alert } from 'antd';

import { UserContext } from '../context/UserContext';

type UserLoginValues = {
  email: string;
  password: string;
};

const createUserSessionMutation = gql`
  mutation createUserSession($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
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
    .required('Please enter a password.')
});

const UserLogin: React.FC = () => {
  const [message, setMessage] = React.useState(null);
  const history = useHistory();
  const { authenticated, setJwt } = useContext(UserContext);
  const [createUserSession] = useMutation(createUserSessionMutation);

  if (authenticated === true) {
    return <Redirect to="/" />;
  }

  const onSubmit = async (values: UserLoginValues) => {
    setMessage(null);
    try {
      const { data } = await createUserSession({
        variables: {
          email: values.email,
          password: values.password
        }
      });

      if (data.createUserSession.jwt !== null) {
        setJwt(data.createUserSession.jwt);
        history.push('/');
      } else {
        setMessage(data.createUserSession.errors[0]);
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
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(
          values: UserLoginValues,
          actions: FormikActions<UserLoginValues>
        ) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
        render={(
          formikBag: FormikProps<UserLoginValues>
        ) => (
          <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
            <Field
              name="email"
              render={({
                field,
                form
              }: FieldProps<UserLoginValues>) => (
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
              }: FieldProps<UserLoginValues>) => (
                <Form.Item label="Password">
                  <Input type="password" {...field} />
                  {form.errors.email && form.touched.email ? (
                    <p>{form.errors.password}</p>
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
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      />
    </Row>
  );
};

export default UserLogin;
