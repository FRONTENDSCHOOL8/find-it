import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { increment, decrement } from '@/store/slices/countSlice';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.count.number);

  return (
    <div className="text-center">
      <h1 className="text-32px">Find It</h1>
      <span className="text-50px font-black">{count}</span>
      <div className="mt-12px">
        <button
          type="button"
          className="px-16px text-24px font-bold"
          onClick={() => dispatch(increment())}
        >
          업
        </button>
        <button
          type="button"
          className="px-16px text-24px font-bold"
          onClick={() => dispatch(decrement())}
        >
          다운
        </button>
        <img src="asdf" />
      </div>
    </div>
  );
}

export default App;
