import { IContactValues } from '../schema/validation/contact';

interface IPostMessageParams {
  values: IContactValues;
}

const postMessageRequest = async ({ values }: IPostMessageParams) => {
  const { name, email, message } = values;
  const formURL = `https://submit-form.com/${process.env.NEXT_PUBLIC_FORMSPARK_ENDPOINT}`;

  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to submit your message');
  }

  const FormResponse = await fetch(formURL, {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if(!FormResponse.ok){
    throw new Error('Form submission error.')
  }

  const data = await response.json();
  return { data };
};

export default postMessageRequest;
