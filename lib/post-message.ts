import { IContactValues } from '../schema/validation/contact';

interface IPostMessageParams {
  values: IContactValues;
}

const postMessageRequest = async ({ values }: IPostMessageParams) => {
  const { name, email, message } = values;
  const formURL = process.env.FORMSPARK_URL;

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

  if (formURL) {
    const FormSResponse = await fetch(formURL, {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log(FormSResponse);
  }

  const data = await response.json();
  return { data };
};

export default postMessageRequest;
