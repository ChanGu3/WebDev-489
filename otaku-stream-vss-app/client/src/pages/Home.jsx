import { useEffect } from 'react'

function Home()
{
  useEffect(() => {
    document.title = "Home - OtakuStream";
  }, []);

  return (
    <>
      <p className="p-2">Home</p>
    </>
  );
};

export default Home;