interface SearchParagraphProps {
  children: string;
}

const SearchParagraph: React.FC<SearchParagraphProps> = ({ children }) => {
  return <p className="text-12px font-medium tracking-[-0.36px]">{children}</p>;
};

export default SearchParagraph;
