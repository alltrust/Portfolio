import { IContactValues } from '../schema/validation/contact';

interface IPostMessageParams {
  values: IContactValues;
}

const postMessageRequest = async ({ values }: IPostMessageParams) => {
  const { name, email, message } = values;

  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error;

    return { errorMsg };
  }

  return { data };
};

export default postMessageRequest;
