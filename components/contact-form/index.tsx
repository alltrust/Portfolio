import Image from 'next/image';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import validationSchema, { IContactValues } from '../../schema/contact';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const MyTextarea = styled(TextField)({
  width: '100%',
  marginTop: '1rem',
});


//iformvalues and formikHelpers
const initialFormValues:IContactValues  = {
  name: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const handleSubmit = async (
    values: IContactValues,
    formikHelpers: FormikHelpers<IContactValues>
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;
    //async rest api to post data
    const {name, email, message} = values
    //refactor

    const response = await fetch('/api/contact', {
      method: "POST",
      body: JSON.stringify({name,email,message}),
      headers:{
        "Content-Type": "application/json"
      }
    })
    
    if(!response.ok){
      //set error message and display alert perhaps
    }

    const data = await response.json()
    console.log(data)
    //else display success message and 

    //get the data back from the response to display the success message. 
    //and clear the input fields after submit using the resetForm()



    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, getFieldProps, errors, touched, handleBlur }) => (
        <Form>
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
          <StyledButton
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
