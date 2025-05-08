import { Meta, StoryObj } from "@storybook/react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/shared/ui/neomorphic/AlertDialog";
import { Button } from "@/shared/ui/neomorphic/Button";

const AlertDialogExample = () => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button>Open Alert Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to proceed with this action? This
                    action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

const meta: Meta<typeof AlertDialog> = {
    title: "Neomorphic/AlertDialog",
    component: AlertDialogExample,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
