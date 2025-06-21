import { useEffect, useState } from 'react'

function Example()
{
  useEffect(() => {
    document.title = "Example - OtakuStream";
  }, []);

  const [message, setMessage] = useState('');

  // use effect allows the ability to use fetch from the localhost:3000 server
  useEffect(() => {
    fetch('/api/Example')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error: ' + err.message))
  }, []);

  return (
    <>
      <p className="p-2">{message}</p>
    </>
  );
}

export default Example;