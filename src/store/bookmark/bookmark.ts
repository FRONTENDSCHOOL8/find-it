import { create } from 'zustand';

interface BookmarkState {
  bookmark: boolean;
}

interface BookmarkActions {
  setBookmark: (value: boolean) => void;
}

type BookmarkStore = BookmarkState & BookmarkActions;

const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmark: false,
  setBookmark: (value: boolean) => set(() => ({ bookmark: value })),
}));

export default useBookmarkStore;
