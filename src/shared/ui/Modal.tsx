import { PropsWithChildren } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const Modal = ({ children, isOpen, onClose, title }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card className="w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
          <Button
            onClick={onClose}
            className="!bg-transparent !p-1 hover:!bg-gray-100 dark:hover:!bg-gray-700 !text-gray-500 hover:!text-gray-700 dark:!text-gray-400 dark:hover:!text-gray-200"
          >
            ✕
          </Button>
        </div>
        {children}
      </Card>
    </div>
  );
};
