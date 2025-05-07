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
    { id: 1, icon: <SunnyIcon className="icon" />, name: "Солнечно", status: false },
    { 
        id: 2, 
        icon: <CloudyIcon className="icon" />, 
        name: "Облачно", 
        status: false, 
        detail: [
            { id: 1, name: 'Переменная облачность', status: false }, 
            { id: 2, name: 'Преимущественная облачность', status: false }, 
            { id: 3, name: 'Сильная облачность', status: false }
        ] 
    },
    { 
        id: 3, 
        icon: <RainIcon className="icon" />, 
        name: "Дождь", 
        status: false, 
        detail: [
            { id: 1, name: 'Небольшой', status: false }, 
            { id: 2, name: 'Умеренный', status: false }, 
            { id: 3, name: 'Сильный', status: false }
        ]
    },
    { 
        id: 4, 
        icon: <FreezingRainIcon className="icon" />, 
        name: 'Ледяной дождь', 
        status: false, 
        detail: [
            { id: 1, name: 'Небольшой', status: false }, 
            { id: 2, name: 'Умеренный', status: false }, 
            { id: 3, name: 'Сильный', status: false }
        ]
    },
    { 
        id: 5, 
        icon: <SnowIcon className="icon" />, 
        name: "Снег", 
        status: false, 
        detail: [
            { id: 1, name: 'Небольшой', status: false }, 
            { id: 2, name: 'Умеренный', status: false }, 
            { id: 3, name: 'Сильный', status: false }
        ]
    },
];

export const TEMPERATURE_DATA = [
    { id: 1, icon: <TempSunIcon className="icon" />, name: "По ощущениям теплее", status: false },
    { id: 2, icon: <TempNorm className="icon" />, name: "Прогноз был точным", status: true },
    { id: 3, icon: <TempSnowIcon className="icon" />, name: "По ощущениям холоднее", status: false },
];

export const WIND_DATA = [
    { id: 1, icon: <MoreIcon className="icon" />, name: "Сейчас более ветренно", status: false },
    { id: 2, icon: <EqualIcon className="icon" />, name: "Прогноз был точным", status: false },
    { id: 3, icon: <LessIcon className="icon" />, name: "Сейчас не так ветренно", status: false },
];

export const OTHER_WEATHER_CONDITIONS_DATA = [
    { id: 1, icon: <RainbowIcon className="icon" />, name: "Радуга", status: false },
    { id: 2, icon: <LightningIcon className="icon" />, name: "Молния", status: false },
    { id: 3, icon: <HailIcon className="icon" />, name: "Град", status: false },
    { id: 4, icon: <CloudyTwoIcon className="icon" />, name: "Смог", status: false },
    { id: 5, icon: <FogIcon className="icon" />, name: "Туман", status: false },
    { id: 6, icon: <HazeIcon className="icon" />, name: "Дымка", status: false },
];

export const FEELING_DESCR = [
    {id: 1, name: 'Приятно', status: false},
    {id: 2, name: 'Неприятно', status: false},
]

export const TEMPERATURE_DESCR = [
    {id: 1, name: 'Жарко', status: false},
    {id: 2, name: 'Прохладно', status: false},
]

export const ATMOSPHERE_DESCR = [
    {id: 1, name: 'Зной', status: false},
    {id: 2, name: 'Сухо', status: false},
]

export const WIND__DESCR = [
    {id: 1, name: 'Ветрено', status: false},
    {id: 2, name: 'Штиль', status: false},
]
