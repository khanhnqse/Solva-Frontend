import { Link } from 'react-router-dom';

const Button = ({
  children,
  link,
  disabled,
  variant = 'primary',
  classCss,
  ...restProps
}) => {
  let variantClass = '';
  switch (variant) {
    case 'primary':
      variantClass =
        'bg-[#C94C4B] text-white hover:bg-zinc-600 active:bg-zinc-700 focus:outline-none focus:ring focus:ring-zinc-300';
      break;
    case 'gray':
      variantClass =
        'bg-[#C94C4B]/[0.2] text-black hover:bg-neutral-300 active:bg-neutral-400 focus:outline-none focus:ring focus:ring-neutral-300';
      break;
    case 'red-line':
      variantClass = 'bg-transparent text-red underline-offset-8';
      break;
    default:
      break;
  }

  if (disabled) {
    variantClass = 'bg-neutral-300';
    restProps.onClick = () => {};
  }

  if (link) {
    return (
      <Link to={link} className={`${classCss}`} {...restProps}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${variantClass} ${classCss} h-8 px-4 cursor-pointer flex justify-center items-center duration-300 transition-colors`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
