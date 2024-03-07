import Constants from "expo-constants";

const theme = {
  colors: {
    background: "#EAE8E8",
    white: "#fff",
    red: "#FF5733",
    blue: "#4287f5",
    yellow: "#f5e342",
    fontGrey: "#605f5f"
  },
  darkButton: {
    backgroundColor: "#101B1C",
    width: 335,
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#DDDDDD",
    fontSize: 20,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'space-between',
    fontFamily: 'Roboto'
  },
  header: {
    width: "100%",
    height: '12%',
  },
  body: {
    width: "100%",
    height: '78%'
  },
  footer: {
    width: "100%",
    height: '10%',
    alignItems: 'center'
  },
  fontSizes: {
    h1: 30,
    h2: 25,
    h3: 20,
    h4: 16,
    inputHeader: 13,
    inputText: 15
  }
};

export default theme;
