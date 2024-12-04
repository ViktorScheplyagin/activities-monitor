type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export const Card = ({ children, ...props }: Props) => {
  return (
    <div
      {...props}
      className={`bg-white p-8 rounded-lg shadow-md dark:bg-gray-800 ${props.className}`}
    >
      {children}
    </div>
  );
};
