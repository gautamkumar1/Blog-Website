

const Button = ({ variant, size, onClick, children }) => {
  const sizes = {
    icon: "p-2"
  };

  const variants = {
    ghost: "text-gray-500 hover:text-gray-700"
  };

  return (
    <button
      className={`inline-flex items-center ${sizes[size]} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
