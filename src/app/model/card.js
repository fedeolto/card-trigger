export const getCard = async (cardId) => {
  let url = `https://jsonplaceholder.typicode.com/posts/${cardId}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
