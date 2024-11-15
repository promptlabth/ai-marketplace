import { useState, useEffect } from 'react';

const useGetFullPrompt = (callerInput: string) => {
  const [fullPrompt, setFullPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFullPrompt = async () => {
      console.log(`Fetching full prompt for callerInput: ${callerInput}`);
      try {
        const response = await fetch(`http://localhost:8080/customer/get_full_prompt/${callerInput}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Full prompt data:', data);
        setFullPrompt(data.FullPrompt); // Ensure the correct property is used
      } catch (err) {
        console.error('Error fetching full prompt:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    if (callerInput) {
      fetchFullPrompt();
    }
  }, [callerInput]);

  return { fullPrompt, loading, error };
};

export default useGetFullPrompt;