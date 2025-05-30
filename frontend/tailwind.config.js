import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            boxShadow: {
                box: "-4px 4px 14px var(--shadow-bg-dark), 4px -4px 12px var(--shadow-bg-light), inset -2px 3px 10px var(--shadow-bg-light), inset 1px -3px 5px var(--shadow-bg-dark);",
                "box-lifted":
                    "-4px 4px 30px var(--shadow-bg-dark), 4px -4px 12px var(--shadow-bg-light), inset -2px 3px 10px var(--shadow-bg-light), inset 1px -3px 5px var(--shadow-bg-dark);",
                inset: "inset -4px 4px 8px var(--shadow-bg-dark), inset 4px -4px 8px var(--shadow-bg-light), -2px 3px 10px var(--shadow-bg-light), 1px -3px 5px var(--shadow-bg-dark);",
                "inset-mini":
                    "inset -2px 2px 4px var(--shadow-bg-dark), inset 2px -2px 4px var(--shadow-bg-light), -2px 2px 4px var(--shadow-bg-light), 2px -2px 4px var(--shadow-bg-dark)",
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [animate],
};

export default config;
