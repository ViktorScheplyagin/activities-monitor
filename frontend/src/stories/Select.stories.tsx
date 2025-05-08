import { Meta, StoryObj } from "@storybook/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/neomorphic";

const SelectExample = ({ open }: { open?: boolean }) => (
    <Select open={open}>
        <SelectTrigger>
            <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
        </SelectContent>
    </Select>
);

const meta: Meta<typeof Select> = {
    title: "Neomorphic/Select",
    component: SelectExample,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Opened: Story = {
    args: {
        open: true,
    },
};
