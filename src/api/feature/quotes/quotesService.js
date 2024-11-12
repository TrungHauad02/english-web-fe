export const getRandomQuotes = async () => {
  const categories = ['learning', 'success', 'inspirational', 'education']
  const category = categories[Math.floor(Math.random() * categories.length)];;
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  const apiKey = 'TGiJCgZ1tJuyxZnc1RB8LQ==DVdW2eeYd7OEw726';
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
