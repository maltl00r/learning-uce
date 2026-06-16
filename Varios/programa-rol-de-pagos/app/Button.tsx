interface ButtonProps {
  bgColor: string;
  hoverColor: string;
  title: string;
  onClick: () => void;
  textColor?: string;
}

export default function Button({
  onClick,
  bgColor,
  hoverColor,
  title,
  textColor = "text-white",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${hoverColor} ${textColor} rounded-xl px-4 py-2 font-semibold shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500`}
    >
      {title}
    </button>
  );
}
