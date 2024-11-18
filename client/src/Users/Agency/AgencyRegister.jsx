import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import emailSvg from "../../Assets/email.svg";
import lock from "../../Assets/lock.svg";
import aurora from "../../Assets/aurora.jpg";
import user from "../../Assets/user.svg";
import phone from "../../Assets/phone.svg";
import license from "../../Assets/license.svg";
import location from "../../Assets/location.svg";
import cnic from "../../Assets/cnic.svg";

import { useAgencyRegMutation } from "../../Services/Register/agencyRegisterAPI.js";
import Loader from "../../Utils/Loader";
function AgencyRegister() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    companyNameError: false,
    adminNameError: false,
    phoneError: false,
    licenseError: false,
    locationError: false,
    cnicError: false,
    cityError: false,
    provinceError: false,
    checkedError: false,
    ntnError: false,
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    adminName: "",
    license: "",
    ntn: "",
    location: "",
    cnic: "",
    city: "",
    province: "",
    checked: false,
  });

  const handleCnicInput = (e) => {
    if (cnicRef.current.value.length === 15 && e.key !== "Backspace") return;
    if (e.keyCode > 47 && e.keyCode < 58) {
      console.log("Sahi Input hai");
      cnicRef.current.value = cnicRef.current.value + e.key;

      if (
        cnicRef.current.value.length === 5 ||
        cnicRef.current.value.length === 13
      ) {
        cnicRef.current.value = cnicRef.current.value + "-";
      }
    } else if (e.key === "Backspace") {
      cnicRef.current.value = cnicRef.current.value.slice(0, -1);
    } else {
      console.log("Invalid");
      e.preventDefault();
    }
    handleChange(e, "cnic");
  };
  const handleChange = (e, type) => {
    switch (type) {
      case "name":
        setCompanyInfo({ ...companyInfo, companyName: e.target.value });
        break;
      case "email":
        setCompanyInfo({ ...companyInfo, email: e.target.value });
        break;
      case "password":
        setCompanyInfo({ ...companyInfo, password: e.target.value });
        break;
      case "confirmPassword":
        setCompanyInfo({ ...companyInfo, confirmPassword: e.target.value });
        break;
      case "adminName":
        setCompanyInfo({ ...companyInfo, adminName: e.target.value });
        break;
      case "contact":
        setCompanyInfo({ ...companyInfo, phone: e.target.value });
        break;
      case "license":
        setCompanyInfo({ ...companyInfo, license: e.target.value });
        break;
      case "ntn":
        setCompanyInfo({ ...companyInfo, ntn: e.target.value });
        break;
      case "location":
        setCompanyInfo({ ...companyInfo, location: e.target.value });
        break;
      case "cnic":
        console.log(cnicRef.current.value);
        setCompanyInfo({ ...companyInfo, cnic: e.target.value });
        break;
      case "city":
        setCompanyInfo({ ...companyInfo, city: e.target.value });
        break;
      case "province":
        setCompanyInfo({ ...companyInfo, province: e.target.value });
        break;
      case "checked":
        console.log(e.target.checked);
        setCompanyInfo({ ...companyInfo, checked: e.target.checked });
        break;
      default:
        console.log("Error in Handle Change");
        break;
    }
  };
  const [province, setProvince] = useState({});
  const [cities, setCities] = useState([]);

  const cnicRef = useRef("");

  const [agencyReg, { isLoading }] = useAgencyRegMutation();

  const navigate = useNavigate();
  const provinces = [
    {
      label: "Punjab",
      code: "east",
    },
    {
      label: "Fedral",
      code: "central",
    },
    {
      label: "KPK",
      code: "north-west",
    },
    {
      label: "Balochistan",
      code: "south-west",
    },
    {
      label: "Gilgit-Baltistan",
      code: "north",
    },
    {
      label: "Kashmir",
      code: "north-east",
    },
    {
      label: "Sindh",
      code: "south",
    },
  ];

  const punjabCities = [
    {
      label: "Lahore",
      code: 54000,
    },
    {
      label: "Faislabad",
      code: 38000,
    },
    {
      label: "Ahmadpur Sial",
      code: 36150,
    },
    {
      label: "Ahmedpur East",
      code: 62350,
    },
    {
      label: "Alipur Chatha",
      code: 52250,
    },
    {
      label: "Arifwala",
      code: 57250,
    },
    {
      label: "Attock Tehsil",
      code: 43600,
    },
    {
      label: "Baddomalhi",
      code: 51800,
    },
    {
      label: "Bahawalnagar",
      code: 62300,
    },
    {
      label: "Bahawalpur",
      code: 63100,
    },
    {
      label: "Bakhri Ahmad Khan",
      code: 36430,
    },
    {
      label: "Basirpur",
      code: 57230,
    },
    {
      label: "Basti Dosa",
      code: 38440,
    },
    {
      label: "Begowala",
      code: 35430,
    },
    {
      label: "Bhakkar",
      code: 30000,
    },
    {
      label: "Bhalwal",
      code: 36340,
    },
    {
      label: "Bhawana",
      code: 36220,
    },
    {
      label: "Bhera",
      code: 57450,
    },
    {
      label: "Bhopalwala",
      code: 35420,
    },
    {
      label: "Burewala",
      code: 61010,
    },
    {
      label: "Chak Azam Saffo",
      code: 58250,
    },
    {
      label: "Chak Jhumra",
      code: 37200,
    },
    {
      label: "Chak One Hundred Twenty Nine Left",
      code: 36350,
    },
    {
      label: "Chak Thirty-one -Eleven Left",
      code: 36310,
    },
    {
      label: "Chak Two Hundred Forty-Nine TDA",
      code: 38010,
    },
    {
      label: "Chakwal",
      code: 48800,
    },
    {
      label: "Chawinda",
      code: 51310,
    },
    {
      label: "Chichawatni",
      code: 57200,
    },
    {
      label: "Chiniot",
      code: 35400,
    },
    {
      label: "Chishtian",
      code: 63800,
    },
    {
      label: "Choa Saidanshah",
      code: 48850,
    },
    {
      label: "Chuhar Kana",
      code: 50200,
    },
    {
      label: "Chunian",
      code: 53400,
    },
    {
      label: "Daira Din Panah",
      code: 64300,
    },
    {
      label: "Dajal",
      code: 30070,
    },
    {
      label: "Dandot RS",
      code: 48870,
    },
    {
      label: "Darya Khan",
      code: 30050,
    },
    {
      label: "Daska",
      code: 51010,
    },
    {
      label: "Daud Khel",
      code: 30210,
    },
    {
      label: "Daultala",
      code: 47840,
    },
    {
      label: "Dera Ghazi Khan",
      code: 32200,
    },
    {
      label: "Dhanot",
      code: 49600,
    },
    {
      label: "Dhaunkal",
      code: 35380,
    },
    {
      label: "Dhok Awan",
      code: 35550,
    },
    {
      label: "Dijkot",
      code: 35570,
    },
    {
      label: "Dinan Bashnoian Wala",
      code: 36800,
    },
    {
      label: "Dinga",
      code: 50150,
    },
    {
      label: "Dipalpur",
      code: 57210,
    },
    {
      label: "Dullewala",
      code: 34180,
    },
    {
      label: "Dunga Bunga",
      code: 63300,
    },
    {
      label: "Dunyapur",
      code: 63150,
    },
    {
      label: "Eminabad",
      code: 51040,
    },
    {
      label: "Faisalabad",
      code: 38000,
    },
    {
      label: "Faqirwali",
      code: 62310,
    },
    {
      label: "Faruka",
      code: 38620,
    },
    {
      label: "Fazilpur",
      code: 58230,
    },
    {
      label: "Ferozewala",
      code: 53300,
    },
    {
      label: "Fort Abbas",
      code: 63450,
    },
    {
      label: "Garh Maharaja",
      code: 66250,
    },
    {
      label: "Gojra",
      code: 36120,
    },
    {
      label: "Gujar Khan",
      code: 47850,
    },
    {
      label: "Gujranwala",
      code: 52250,
    },
    {
      label: "Gujranwala Division",
      code: 52250,
    },
    {
      label: "Gujrat",
      code: 50700,
    },
    {
      label: "Hadali",
      code: 41300,
    },
    {
      label: "Hafizabad",
      code: 54700,
    },
    {
      label: "Harnoli",
      code: 43140,
    },
    {
      label: "Harunabad",
      code: 63240,
    },
    {
      label: "Hasan Abdal",
      code: 43730,
    },
    {
      label: "Hasilpur",
      code: 63320,
    },
    {
      label: "Haveli Lakha",
      code: 58140,
    },
    {
      label: "Hazro",
      code: 43760,
    },
    {
      label: "Hujra Shah Muqeem",
      code: 58150,
    },
    {
      label: "Jahanian Shah",
      code: 58300,
    },
    {
      label: "Jalalpur Jattan",
      code: 50230,
    },
    {
      label: "Jalalpur Pirwala",
      code: 62220,
    },
    {
      label: "Jampur",
      code: 32160,
    },
    {
      label: "Jand",
      code: 47150,
    },
    {
      label: "Jandiala Sher Khan",
      code: 50240,
    },
    {
      label: "Jaranwala",
      code: 37250,
    },
    {
      label: "Jatoi Shimali",
      code: 57240,
    },
    {
      label: "Jauharabad",
      code: 41270,
    },
    {
      label: "Jhang",
      code: 35200,
    },
    {
      label: "Jhang Sadar",
      code: 35200,
    },
    {
      label: "Jhawarian",
      code: 40600,
    },
    {
      label: "Jhelum",
      code: 49600,
    },
    {
      label: "Kabirwala",
      code: 58220,
    },
    {
      label: "Kahna Nau",
      code: 54000,
    },
    {
      label: "Kahuta",
      code: 47420,
    },
    {
      label: "Kalabagh",
      code: 42180,
    },
    {
      label: "Kalaswala",
      code: 52120,
    },
    {
      label: "Kaleke Mandi",
      code: 36360,
    },
    {
      label: "Kallar Kahar",
      code: 48230,
    },
    {
      label: "Kalur Kot",
      code: 50100,
    },
    {
      label: "Kamalia",
      code: 36350,
    },
    {
      label: "Kamar Mushani",
      code: 32440,
    },
    {
      label: "Kamoke",
      code: 52370,
    },
    {
      label: "Kamra",
      code: 43730,
    },
    {
      label: "Kanganpur",
      code: 61160,
    },
    {
      label: "Karor",
      code: 32500,
    },
    {
      label: "Kasur",
      code: 55050,
    },
    {
      label: "Keshupur",
      code: 35110,
    },
    {
      label: "Khairpur Tamiwali",
      code: 63050,
    },
    {
      label: "Khandowa",
      code: 31200,
    },
    {
      label: "Khanewal",
      code: 58150,
    },
    {
      label: "Khanga Dogran",
      code: 52110,
    },
    {
      label: "Khangarh",
      code: 36450,
    },
    {
      label: "Khanpur",
      code: 58200,
    },
    {
      label: "Kharian",
      code: 50000,
    },
    {
      label: "Khewra",
      code: 48100,
    },
    {
      label: "Khurrianwala",
      code: 37150,
    },
    {
      label: "Khushab",
      code: 41000,
    },
    {
      label: "Kohror Pakka",
      code: 58000,
    },
    {
      label: "Kot Addu Tehsil",
      code: 34500,
    },
    {
      label: "Kot Ghulam Muhammad",
      code: 63220,
    },
    {
      label: "Kot Mumin",
      code: 36110,
    },
    {
      label: "Kot Radha Kishan",
      code: 55170,
    },
    {
      label: "Kot Rajkour",
      code: 37600,
    },
    {
      label: "Kot Samaba",
      code: 58280,
    },
    {
      label: "Kot Sultan",
      code: 57000,
    },
    {
      label: "Kotli Loharan",
      code: 51100,
    },
    {
      label: "Kundian",
      code: 34120,
    },
    {
      label: "Kunjah",
      code: 50300,
    },
    {
      label: "Ladhewala Waraich",
      code: 51310,
    },
    {
      label: "Lala Musa",
      code: 50100,
    },
    {
      label: "Lalian",
      code: 33160,
    },
    {
      label: "Layyah",
      code: 31200,
    },
    {
      label: "Layyah District",
      code: 31200,
    },
    {
      label: "Liliani",
      code: 48340,
    },
    {
      label: "Lodhran",
      code: 58200,
    },
    {
      label: "Mailsi",
      code: 58260,
    },
    {
      label: "Malakwal",
      code: 50400,
    },
    {
      label: "Malakwal City",
      code: 50610,
    },
    {
      label: "Mamu Kanjan",
      code: 36150,
    },
    {
      label: "Mananwala",
      code: 37100,
    },
    {
      label: "Mandi Bahauddin",
      code: 50400,
    },
    {
      label: "Mandi Bahauddin District",
      code: 50400,
    },
    {
      label: "Mangla",
      code: 50770,
    },
    {
      label: "Mankera",
      code: 32430,
    },
    {
      label: "Mehmand Chak",
      code: 36460,
    },
    {
      label: "Mian Channun",
      code: 58000,
    },
    {
      label: "Mianke Mor",
      code: 52290,
    },
    {
      label: "Mianwali",
      code: 42200,
    },
    {
      label: "Minchinabad",
      code: 62180,
    },
    {
      label: "Mitha Tiwana",
      code: 50730,
    },
    {
      label: "Moza Shahwala",
      code: 36200,
    },
    {
      label: "Multan",
      code: 60000,
    },
    {
      label: "Multan District",
      code: 60000,
    },
    {
      label: "Muridke",
      code: 39950,
    },
    {
      label: "Murree",
      code: 47150,
    },
    {
      label: "Mustafabad",
      code: 37650,
    },
    {
      label: "Muzaffargarh",
      code: 34200,
    },
    {
      label: "Nankana Sahib",
      code: 38450,
    },
    {
      label: "Narang Mandi",
      code: 40070,
    },
    {
      label: "Narowal",
      code: 51600,
    },
    {
      label: "Naushahra Virkan",
      code: 52080,
    },
    {
      label: "Nazir Town",
      code: 52400,
    },
    {
      label: "Okara",
      code: 56300,
    },
    {
      label: "Pakki Shagwanwali",
      code: 36420,
    },
    {
      label: "Pakpattan",
      code: 57400,
    },
    {
      label: "Pasrur",
      code: 51480,
    },
    {
      label: "Pattoki",
      code: 57150,
    },
    {
      label: "Phalia",
      code: 50230,
    },
    {
      label: "Pind Dadan Khan",
      code: 48830,
    },
    {
      label: "Pindi Bhattian",
      code: 35460,
    },
    {
      label: "Pindi Gheb",
      code: 43510,
    },
    {
      label: "Pir Mahal",
      code: 36660,
    },
    {
      label: "Qadirpur Ran",
      code: 36620,
    },
    {
      label: "Qila Didar Singh",
      code: 50760,
    },
    {
      label: "Rabwah",
      code: 35460,
    },
    {
      label: "Rahim Yar Khan",
      code: 64200,
    },
    {
      label: "Rahimyar Khan District",
      code: 64200,
    },
    {
      label: "Raiwind",
      code: 55150,
    },
    {
      label: "Raja Jang",
      code: 43730,
    },
    {
      label: "Rajanpur",
      code: 32400,
    },
    {
      label: "Rasulnagar",
      code: 33230,
    },
    {
      label: "Rawalpindi",
      code: 46000,
    },
    {
      label: "Rawalpindi District",
      code: 46000,
    },
    {
      label: "Renala Khurd",
      code: 57360,
    },
    {
      label: "Rojhan",
      code: 32420,
    },
    {
      label: "Sadiqabad",
      code: 64350,
    },
    {
      label: "Sahiwal",
      code: 57000,
    },
    {
      label: "Sambrial",
      code: 51310,
    },
    {
      label: "Sangla Hill",
      code: 38220,
    },
    {
      label: "Sanjwal",
      code: 47340,
    },
    {
      label: "Sarai Alamgir",
      code: 50030,
    },
    {
      label: "Sarai Sidhu",
      code: 57560,
    },
    {
      label: "Sargodha",
      code: 40100,
    },
    {
      label: "Shahkot Tehsil",
      code: 52380,
    },
    {
      label: "Shahpur",
      code: 40330,
    },
    {
      label: "Shahr Sultan",
      code: 42460,
    },
    {
      label: "Shakargarh",
      code: 51800,
    },
    {
      label: "Sharqpur",
      code: 53140,
    },
    {
      label: "Sheikhupura",
      code: 39350,
    },
    {
      label: "Shorkot",
      code: 36500,
    },
    {
      label: "Shujaabad",
      code: 59330,
    },
    {
      label: "Sialkot",
      code: 51310,
    },
    {
      label: "Sillanwali",
      code: 34520,
    },
    {
      label: "Sodhra",
      code: 35120,
    },
    {
      label: "Sukheke Mandi",
      code: 50250,
    },
    {
      label: "Surkhpur",
      code: 33210,
    },
    {
      label: "Talagang",
      code: 48800,
    },
    {
      label: "Talamba",
      code: 36650,
    },
    {
      label: "Tandlianwala",
      code: 37180,
    },
    {
      label: "Taunsa",
      code: 32200,
    },
    {
      label: "Toba Tek Singh",
      code: 36050,
    },
    {
      label: "Umerkot",
      code: 70160,
    },
    {
      label: "Vihari",
      code: 61100,
    },
    {
      label: "Wah",
      code: 47060,
    },
    {
      label: "Warburton",
      code: 55020,
    },
    {
      label: "Wazirabad",
      code: 52000,
    },
    {
      label: "West Punjab",
      code: 40000,
    },
    {
      label: "Yazman",
      code: 63000,
    },
    {
      label: "Zafarwal",
      code: 51570,
    },
    {
      label: "Zahir Pir",
      code: 60600,
    },
  ];

  const kpkCities = [
    {
      label: "Abbottabad",
      code: 22010,
    },
    {
      label: "Bannu",
      code: 28100,
    },
    {
      label: "Charsadda",
      code: 24420,
    },
    {
      label: "Dera Ismail Khan",
      code: 29050,
    },
    {
      label: "Kohat",
      code: 26000,
    },
    {
      label: "Mardan",
      code: 23200,
    },
    {
      label: "Nowshera",
      code: 24100,
    },
    {
      label: "Peshawar",
      code: 25000,
    },
    {
      label: "Swabi",
      code: 23430,
    },
    {
      label: "Swat",
      code: 19120,
    },
  ];

  const balochistanCities = [
    {
      label: "Quetta",
      code: 87300,
    },
    {
      label: "Gwadar",
      code: 91200,
    },
    {
      label: "Khuzdar",
      code: 89000,
    },
    {
      label: "Turbat",
      code: 91000,
    },
    {
      label: "Chaman",
      code: 86300,
    },
    {
      label: "Sibi",
      code: 83520,
    },
    {
      label: "Zhob",
      code: 85300,
    },
    {
      label: "Loralai",
      code: 86400,
    },
    {
      label: "Dera Bugti",
      code: 79300,
    },
    {
      label: "Kharan",
      code: 90100,
    },
  ];

  const sindhCities = [
    {
      label: "Karachi",
      code: 74000,
    },
    {
      label: "Hyderabad",
      code: 71000,
    },
    {
      label: "Sukkur",
      code: 65200,
    },
    {
      label: "Larkana",
      code: 77150,
    },
    {
      label: "Mirpur Khas",
      code: 69000,
    },
    {
      label: "Nawabshah",
      code: 67450,
    },
    {
      label: "Jacobabad",
      code: 79000,
    },
    {
      label: "Shikarpur",
      code: 78100,
    },
    {
      label: "Dadu",
      code: 76200,
    },
    {
      label: "Tando Adam",
      code: 68100,
    },
  ];

  const kashmirCities = [
    {
      label: "Muzaffarabad",
      code: 13100,
    },
    {
      label: "Mirpur",
      code: 10250,
    },
    {
      label: "Rawalakot",
      code: 12350,
    },
    {
      label: "Kotli",
      code: 11100,
    },
    {
      label: "Bhimber",
      code: 10100,
    },
    {
      label: "Bagh",
      code: 12500,
    },
    {
      label: "Hattian Bala",
      code: 13300,
    },
    {
      label: "Haveli",
      code: 12700,
    },
    {
      label: "Neelum",
      code: 13200,
    },
    {
      label: "Poonch",
      code: 12400,
    },
  ];

  const gbCities = [
    {
      label: "Gilgit",
      code: 15100,
    },
    {
      label: "Skardu",
      code: 16100,
    },
    {
      label: "Chilas",
      code: 17050,
    },
    {
      label: "Ghizer",
      code: 15300,
    },
    {
      label: "Astore",
      code: 17200,
    },
    {
      label: "Kharmang",
      code: 16200,
    },
    {
      label: "Shigar",
      code: 16400,
    },
    {
      label: "Hunza",
      code: 17210,
    },
    {
      label: "Nagar",
      code: 16600,
    },
    {
      label: "Diamer",
      code: 15100,
    },
  ];

  const getCities = (province) => {
    console.log(province);

    if (!province) {
      return null;
    } else if (province.label === "Punjab") {
      return punjabCities;
    } else if (province.label === "KPK") {
      return kpkCities;
    } else if (province.label === "Sindh") {
      return sindhCities;
    } else if (province.label === "Kashmir") {
      return kashmirCities;
    } else if (province.label === "Gilgit-Baltistan") {
      return gbCities;
    } else if (province.label === "Balochistan") {
      return balochistanCities;
    } else if (province.label === "Fedral") {
      return [{ label: "Islamabad", code: 4400 }];
    }
  };

  if (isLoading) return <Loader />;

  const handleApply = async () => {
    if (!companyInfo.email.includes("@") || companyInfo.email.length === 0) {
      setError((prevError) => ({
        ...prevError,
        emailError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        emailError: false,
      }));
    }

    if (
      companyInfo.password.length === 0 ||
      companyInfo.password !== companyInfo.confirmPassword
    ) {
      setError((prevError) => ({
        ...prevError,
        passwordError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        passwordError: false,
      }));
    }

    if (companyInfo.adminName.length === 0) {
      setError((prevError) => ({
        ...prevError,
        adminNameError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        adminNameError: false,
      }));
    }

    if (companyInfo.companyName.length === 0) {
      setError((prevError) => ({
        ...prevError,
        companyNameError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        companyNameError: false,
      }));
    }

    if (companyInfo.cnic.length === 0) {
      setError((prevError) => ({
        ...prevError,
        cnicError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        cnicError: false,
      }));
    }

    if (companyInfo.ntn.length === 0) {
      setError((prevError) => ({
        ...prevError,
        ntnError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        ntnError: false,
      }));
    }

    if (companyInfo.phone.length === 0) {
      setError((prevError) => ({
        ...prevError,
        phoneError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        phoneError: false,
      }));
    }

    if (companyInfo.location.length === 0) {
      setError((prevError) => ({
        ...prevError,
        locationError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        locationError: false,
      }));
    }

    if (companyInfo.city.length === 0) {
      setError((prevError) => ({
        ...prevError,
        cityError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        cityError: false,
      }));
    }

    if (companyInfo.license.length === 0) {
      setError((prevError) => ({
        ...prevError,
        licenseError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        licenseError: false,
      }));
    }

    if (companyInfo.province.length === 0) {
      setError((prevError) => ({
        ...prevError,
        provinceError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        provinceError: false,
      }));
    }

    if (!companyInfo.checked) {
      setError((prevError) => ({
        ...prevError,
        checkedError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        checkedError: false,
      }));
    }

    try {
      if (
        !error.emailError &&
        !error.passwordError &&
        !error.adminNameError &&
        !error.companyNameError &&
        !error.cnicError &&
        !error.cityError &&
        !error.provinceError &&
        !error.licenseError &&
        !error.checkedError &&
        !error.locationError &&
        !error.ntnError &&
        !error.phoneError
      ) {
        console.log(companyInfo);
        const response = await agencyReg({
          adminName: companyInfo.adminName,
          companyName: companyInfo.companyName,
          adminCNIC: companyInfo.cnic,
          companyEmail: companyInfo.email,
          companyNTN: companyInfo.ntn,
          password: companyInfo.password,
          license: companyInfo.license,
          city: companyInfo.city,
          province: companyInfo.province,
          officeAddress: companyInfo.location,
          contactNo: companyInfo.phone,
        }).unwrap();

        console.log(response);

        navigate("/agency-login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <Box
            sx={{
              backgroundImage: `url(${aurora})`,
              backgroundSize: "cover",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                marginBottom: "30px",
                padding: "20px",
                maxWidth: "75%",
                border: "1px solid black",
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow:
                  "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              {/* Row 1 */}

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box component="div" sx={{}}>
                  <Box
                    component="div"
                    sx={{
                      fontSize: "53px",
                      color: "#87638F",
                      fontWeight: "bolder",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Travel Agency Registration
                  </Box>
                </Box>
              </Grid>

              {/* Row 2 */}

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="ad_name"
                  label="Admin Name"
                  variant="outlined"
                  type="text"
                  required
                  color="secondary"
                  error={error.adminNameError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={user} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "adminName")}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="name"
                  label="Company Name"
                  variant="outlined"
                  type="text"
                  required
                  color="secondary"
                  error={error.companyNameError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={user} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "name")}
                />
              </Grid>

              {/* Row 3 */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="cnic"
                  label="CNIC Number"
                  variant="outlined"
                  type="text"
                  color="secondary"
                  required
                  error={error.cnicError}
                  inputRef={cnicRef}
                  value={companyInfo.cnic}
                  onKeyUp={handleCnicInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={cnic} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="email"
                  label="Company Email Address"
                  variant="outlined"
                  color="secondary"
                  type="email"
                  required
                  error={error.emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={emailSvg} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                    color: "#A2597C",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "email")}
                />
              </Grid>

              {/* Row 4 */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  color="secondary"
                  required
                  error={error.passwordError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={lock} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "password")}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="ntn"
                  label="Company's NTN"
                  variant="outlined"
                  type="text"
                  color="secondary"
                  required
                  error={error.ntnError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={cnic} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "ntn")}
                />
              </Grid>
              {/* Row 5 */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  required
                  color="secondary"
                  error={error.passwordError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={lock} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "confirmPassword")}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="license"
                  label="Company's DTC License"
                  variant="outlined"
                  type="text"
                  required
                  color="secondary"
                  error={error.licenseError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={license} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "license")}
                />
              </Grid>

              {/* Row 6 */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="contact"
                  label="Contact Number"
                  variant="outlined"
                  type="tel"
                  required
                  color="secondary"
                  error={error.phoneError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={phone} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "35ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "contact")}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
              {/* Row 6 */}

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <TextField
                  id="address"
                  label="Company's Office Address"
                  variant="outlined"
                  type="text"
                  required
                  color="secondary"
                  error={error.locationError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={location} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  sx={{
                    width: "86ch",
                  }}
                  focused
                  onChange={(e) => handleChange(e, "location")}
                />
              </Grid>

              {/* Row 8 */}

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                  marginBottom: "25px",
                }}
              >
                <FormControl>
                  <InputLabel id="province-select" color="secondary">
                    Select Province{" "}
                  </InputLabel>
                  <Select
                    labelId="province-select"
                    label="Select Province"
                    sx={{
                      width: 250,
                      height: 50,
                    }}
                    color="secondary"
                    variant="outlined"
                    error={error.provinceError}
                    onChange={(event) => {
                      const selectedProvince = provinces.find(
                        (province) => province.label === event.target.value
                      );
                      console.log(selectedProvince);

                      setProvince(selectedProvince);
                      console.log(province);

                      const cityArray = getCities(selectedProvince);
                      setCities(cityArray);

                      handleChange(event, "province");
                    }}
                  >
                    {provinces.map((province) => (
                      <MenuItem
                        key={province.code}
                        value={province.label}
                        label={province.label}
                      >
                        {province.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                  marginBottom: "25px",
                }}
              >
                <FormControl>
                  <InputLabel id="city-select" color="secondary">
                    Select City{" "}
                  </InputLabel>
                  <Select
                    labelId="city-select"
                    label="Select City"
                    value={cities.label}
                    error={error.cityError}
                    sx={{
                      width: 250,
                      height: 50,
                    }}
                    color="secondary"
                    onChange={(e) => handleChange(e, "city")}
                  >
                    {cities.map((city) => (
                      <MenuItem
                        key={city.label}
                        value={city.label}
                        label={city.label}
                      >
                        {city.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 9 */}
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                <Checkbox
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: "#A46285",
                    "&.Mui-checked": {
                      color: "#A46285",
                    },
                  }}
                  error={error.checkedError}
                  onChange={(e) => {
                    handleChange(e, "checked");
                  }}
                />
                <Box component="div">
                  By applying, I agree to The{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#A46285",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Privacy Policy
                  </Box>{" "}
                  and{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#A46285",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Terms & Conditions
                  </Box>{" "}
                  .
                </Box>
              </Grid>

              {/* Row 10 */}
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "#E5888B",
                    width: "125px",
                    height: "48px",
                    "&:hover": {
                      bgcolor: "#A46285",
                    },
                  }}
                  onClick={handleApply}
                >
                  APPLY
                </Button>

                <Box
                  sx={{ display: "flex", color: "#848383", gap: "5px", mt: 2 }}
                >
                  <Box component="div">
                    <Divider sx={{ width: "100px", color: "#CCCCCC", mt: 1 }} />
                  </Box>

                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#000000",
                      fontWeight: "normal",
                    }}
                  >
                    OR
                  </Box>

                  <Box component="div">
                    <Divider sx={{ width: "100px", color: "#CCCCCC", mt: 1 }} />
                  </Box>
                </Box>

                <Box
                  component="Box"
                  sx={{
                    mt: 1,
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "normal",
                  }}
                >
                  Have an account?
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#A46285",
                      },
                    }}
                    onClick={() => navigate("/agency-login")}
                  >
                    {" "}
                    Sign In
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default AgencyRegister;
