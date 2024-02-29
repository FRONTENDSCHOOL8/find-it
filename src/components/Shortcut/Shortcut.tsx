import icon_next from '@/assets/icons/icon_next_14.svg';

interface ShortcutProps {
  link: string;
  text: string;
  alt: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ link, text, alt }) => {
  return (
    <a href={link} className="flex">
      <span className="text-14px text-gray-700">{text}</span>
      <img src={icon_next} alt={alt} />
    </a>
  );
};

export default Shortcut;
