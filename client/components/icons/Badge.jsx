/* eslint-disable react/prop-types */


const Badge = ({ variant, children }) => {
  const variants = {
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800"
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
