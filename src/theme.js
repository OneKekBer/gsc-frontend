export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "light"
                ? {
                      primary: {
                          main: "#rgba(0,0,0,0.2)",
                          white: "#FFFFFF",
                          black: "#0C0C0C",
                          purple: "#CF2DB4",
                          blue: "#5CE1E6",
                          lightBlue: "#E3FEFF",
                          red: "#FF5757",
                          yellow: "#FDFDB9",
                          lightYellow: "#F5F5DC",
                          lightPink: "#FFD9E4",
                      },
                      background: {},
                  }
                : {
                      primary: {
                          main: "#rgba(0,0,0,0.2)",
                          white: "#FFFFFF",
                          black: "#0C0C0C",
                          purple: "#CF2DB4",
                          blue: "#5CE1E6",
                          red: "#FF5757",
                          yellow: "#FDFDB9",
                          lightYellow: "#F5F5DC",
                          lightPink: "#FFD9E4",
                      },
                  }),
        },
        typography: {
            fontSize: 16,

            fontWeight: "bold",
            color: "white",
            h1: {
                fontSize: "140px",
                "@media (max-width:2000px)": {
                    fontSize: "80px",
                },
                "@media (max-width:992px)": {
                    fontSize: "80px",
                },

                "@media (max-width:600px)": {
                    fontSize: "60px",
                },
                "@media (max-width:400px)": {
                    fontSize: "40px",
                },
            },
            h2: {
                fontSize: "100px",
                "@media (max-width:2000px)": {
                    fontSize: "70px",
                },
                "@media (max-width:992px)": {
                    fontSize: "70px",
                },
                "@media (max-width:600px)": {
                    fontSize: "50px",
                },
                "@media (max-width:400px)": {
                    fontSize: "30px",
                },
            },
            h3: {
                fontSize: "80px",
                "@media (max-width:2000px)": {
                    fontSize: "60px",
                },
                "@media (max-width:992px)": {
                    fontSize: "60px",
                },
                "@media (max-width:600px)": {
                    fontSize: "40px",
                },
                "@media (max-width:400px)": {
                    fontSize: "30px",
                },
            },
            h4: {
                fontSize: "60px",
                "@media (max-width:2000px)": {
                    fontSize: "40px",
                },

                "@media (max-width:992px)": {
                    fontSize: "40px",
                },
                "@media (max-width:600px)": {
                    fontSize: "30px",
                },
                "@media (max-width:400px)": {
                    fontSize: "20px",
                },
            },
            h5: {
                fontSize: "50px",
                "@media (max-width:2000px)": {
                    fontSize: "30px",
                },

                "@media (max-width:992px)": {
                    fontSize: "25px",
                },
                "@media (max-width:600px)": {
                    fontSize: "25px",
                },
                "@media (max-width:400px)": {
                    fontSize: "20px",
                },
            },

            text1: {
                fontSize: "80px",
                "@media (max-width:2000px)": {
                    fontSize: "40px",
                },
                "@media (max-width:992px)": {
                    fontSize: "40px",
                },
                "@media (max-width:600px)": {
                    fontSize: "30px",
                },
                "@media (max-width:400px)": {
                    fontSize: "30px",
                },
            },
            text2: {
                fontSize: "50px",
                "@media (max-width:2000px)": {
                    fontSize: "25px",
                },
                "@media (max-width:992px)": {
                    fontSize: "25px",
                },
                "@media (max-width:600px)": {
                    fontSize: "25px",
                },
                "@media (max-width:400px)": {
                    fontSize: "20px",
                },
            },
        },
    };
};
