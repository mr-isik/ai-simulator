export const callAI = async (data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/image2image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(response.message || 'An unknown error occurred');
    }

    const responseData = await response.json();
    return responseData.response;
  } catch (error) {
    throw new Error(error.message || 'An unknown error occurred');
  }
};
