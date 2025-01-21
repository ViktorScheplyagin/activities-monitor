import type { Preview } from "@storybook/react";
import "../app/globals.css";

import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            values: [
                { name: "Light", value: "#e8e8e8" },
                { name: "Dark", value: "#444444" },
            ],
        },
    },

    decorators: [
        withThemeByClassName({
            themes: {
                // nameOfTheme: 'classNameForTheme',
                light: "",
                dark: "dark",
            },
            defaultTheme: "light",
        }),
    ],
};

export default preview;
