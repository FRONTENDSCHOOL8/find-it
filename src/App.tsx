import { useEffect } from 'react';
import useCountStore from '@/store/count/countStore';
import SignIn from '@/components/SignIn/SignIn';

const App = () => {
  const { count } = useCountStore((state) => state);
  console.log(count);

  useEffect(() => {
    const openApiParams = new URLSearchParams({
      key: import.meta.env.VITE_PUBLICINFO_API_KEY_DEC,
    });

    const data = fetch(
      `${import.meta.env.VITE_PUBLICINFO_API_URL}?${openApiParams}`
    )
      .then((res) => res.text())
      .catch((err) => console.error(err));

    console.log(data);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-32px text-red-500">Find It</h1>
    </div>
  );
};

export default App;
