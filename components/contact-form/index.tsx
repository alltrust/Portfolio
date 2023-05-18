import useAppContext from '../../hooks/useAppContext';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import validationSchema, {
  IContactValues,
} from '../../schema/validation/contact';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import postMessageRequest from '../../lib/post-message';
import DialogTitle from '@mui/material/DialogTitle';

const MyTextarea = styled(TextField)({
  width: '100%',
  marginTop: '1rem',
});

const initialFormValues: IContactValues = {
  name: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const { dispatch, stateFns } = useAppContext();

  const { handleModalClose } = stateFns;

  const handleSubmit = async (
    values: IContactValues,
    formikHelpers: FormikHelpers<IContactValues>
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;

    try {
      const { data } = await postMessageRequest({ values });
      setSubmitting(false);

      dispatch({
        type: 'ALERT',
        payload: { display: true, message: data.message, variant: 'success' },
      });

      resetForm();
      handleModalClose();
    } catch (error) {
      setSubmitting(false);

      dispatch({
        type: 'ALERT',
        payload: {
          display: true,
          message: error?.toString(),
          variant: 'error',
        },
      });
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, getFieldProps, errors, touched, handleBlur }) => (
        <Form>
          <DialogTitle>Contact</DialogTitle>
          <DialogContentText>
            To contact the owner of this site, please submit this form with the
            following information. Aldo will get back to you as soon as
            possible.
          </DialogContentText>
          <Field
            {...getFieldProps('name')}
            component={TextField}
            label="Name"
            variant="outlined"
            fullWidth
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            onBlur={handleBlur}
          />
          <Field
            {...getFieldProps('email')}
            component={TextField}
            label="Email"
            variant="outlined"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
          />
          <Field
            {...getFieldProps('message')}
            component={MyTextarea}
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            error={touched.message && Boolean(errors.message)}
            helperText={touched.message && errors.message}
            onBlur={handleBlur}
          />
          {isSubmitting && <LinearProgress />}
          <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
