"use client";
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
      {children}
    </div>
  );
};
