import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: "#484848",
            main: "#212121",
            dark: "#101010",
            contrastText: "#ddd"
        },
        secondary: {
            light: "#ff5f52",
            main: "#c62828",
            dark: "#8e0000",
            contrastText: "#ddd"
        }
    }
});