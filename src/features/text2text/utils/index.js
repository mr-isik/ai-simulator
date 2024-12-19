export const callAI = async (prompt) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/text2text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      }
    );

    if (!response.ok) {
      throw new Error(response.message || 'An unknown error occurred');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    throw new Error(error.message || 'An unknown error occurred');
  }
};
