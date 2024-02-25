import useCountStore from '@/store/count/countStore';

const App = () => {
  const { count } = useCountStore((state) => state);

  console.log(count);

  return (
    <div className="text-center">
      <h1 className="text-32px">Find It</h1>
    </div>
  );
};

export default App;
