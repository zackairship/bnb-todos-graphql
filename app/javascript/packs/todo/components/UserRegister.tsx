import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import { Formik, FormikActions, FormikProps, FieldProps, Field } from 'formik';
import * as yup from 'yup';
import { Row, Form, Input, Button } from 'antd';

import { UserContext } from '../context/UserContext';

type UserRegistrationValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const createUserMutation = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      user {
        id
        email
        firstName
        lastName
        jwt
      }
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
  const history = useHistory();
  const { authenticated, setJwt } = useContext(UserContext);
  const [createUser] = useMutation(createUserMutation);

  const onSubmit = async (values: UserRegistrationValues) => {
    try {
      const { data } = await createUser({
        variables: {
          user: values
        }
      });

      console.log(data);

      setJwt(data.jwt);
      history.push('/');
    } catch(error) {

    }
  };

  return (
    <Row>
      <h1>Sign Up</h1>

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
