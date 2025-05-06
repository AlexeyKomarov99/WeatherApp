// current weather
import { IoSunnySharp as SunnyIcon } from "react-icons/io5";
import { IoIosCloudy as CloudyIcon } from "react-icons/io";
import { IoRainy as RainIcon } from "react-icons/io5";
import { GiSnowing as FreezingRainIcon } from "react-icons/gi";
import { FaRegSnowflake as SnowIcon } from "react-icons/fa";
// temperature
import { TbTemperatureSun as TempSunIcon } from "react-icons/tb";
import { TbTemperature as TempNorm } from "react-icons/tb";
import { TbTemperatureSnow as TempSnowIcon } from "react-icons/tb";
// wind
import { AiOutlineRightCircle as MoreIcon } from "react-icons/ai";
import { LuCircleEqual as EqualIcon } from "react-icons/lu";
import { AiOutlineLeftCircle as LessIcon } from "react-icons/ai";
// other weather conditions
import { PiRainbow as RainbowIcon } from "react-icons/pi";
import { BsCloudLightningFill as LightningIcon } from "react-icons/bs";
import { BsFillCloudHailFill as HailIcon } from "react-icons/bs";
import { LuCloudy as CloudyTwoIcon } from "react-icons/lu";
import { BsCloudFogFill as FogIcon } from "react-icons/bs";
import { RiHazeFill as HazeIcon } from "react-icons/ri";

export const CURRENT_WEATHER_DATA = [
    { id: 1, icon: <SunnyIcon />, name: "Солнечно", status: false},
    { id: 2, icon: <CloudyIcon />, name: "Облачно", status: false, detail: ['Переменная облачность', 'Преимущественная облачность', 'Сильная облачность'] },
    { id: 3, icon: <RainIcon />, name: "Дождь", status: false, detail: ['Небольшой', 'Умеренный', 'Сильный']},
    { id: 4, icon: <FreezingRainIcon />, name: 'Ледяной дождь', status: false, detail: ['Небольшой', 'Умеренный', 'Сильный']},
    { id: 5, icon: <SnowIcon />, name: "Снег", status: false, detail: ['Небольшой', 'Умеренный', 'Сильный']},
];

export const TEMPERATURE_DATA = [
    { id: 1, icon: <TempSunIcon />, name: "По ощущениям теплее" },
    { id: 2, icon: <TempNorm />, name: "Прогноз был точным" },
    { id: 3, icon: <TempSnowIcon />, name: "По ощущениям холоднее" },
];

export const WIND_DATA = [
    { id: 1, icon: <MoreIcon />, name: "Сейчас более ветренно" },
    { id: 2, icon: <EqualIcon />, name: "Прогноз был точным" },
    { id: 3, icon: <LessIcon />, name: "Сейчас не так ветренно" },
];

export const OTHER_WEATHER_CONDITIONS_DATA = [
    { id: 1, icon: <RainbowIcon />, name: "Радуга" },
    { id: 2, icon: <LightningIcon />, name: "Молния" },
    { id: 3, icon: <HailIcon />, name: "Град" },
    { id: 4, icon: <CloudyTwoIcon />, name: "Смог" },
    { id: 5, icon: <FogIcon />, name: "Туман" },
    { id: 6, icon: <HazeIcon />, name: "Дымка" },
];