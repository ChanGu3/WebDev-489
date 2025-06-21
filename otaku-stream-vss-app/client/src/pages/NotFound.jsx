import { useEffect } from 'react'


function NotFound()
{
    useEffect(() => {
      document.title = "404 - OtakuStream";
    }, []);

  return (
    <>
      <p className="p-2">404 Not Found</p>
    </>
  );
}

export default NotFound;