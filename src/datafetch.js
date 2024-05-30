export async function getWordDefinition(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (response.status === 404) {
    throw new Error(
      "we couldn't find definitions for the word you were looking for."
    );
  }

  const data = await response.json();

  return data;
}
