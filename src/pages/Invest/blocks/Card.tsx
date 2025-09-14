import { Link } from "react-router-dom";
import type {Investment} from "../interfaces/interfaces.tsx";
import { useTranslation } from "react-i18next";

import locationImg from '/icons/ShowcaseSection/location.png'
import office from '/icons/ShowcaseSection/office.png'
import salary from '/icons/ShowcaseSection/salary.png'
import growth from '/icons/ShowcaseSection/growth.png'
import termloan from '/icons/ShowcaseSection/term-loan.png'
import warning from '/icons/ShowcaseSection/warning.png'

export default function Card(
    {id, title, description, location, type, priceEUR, priceUSD, priceGBP, profitMin, profitMax, timeMin, timeMax, risk, imageUrls}: Investment) {
    const { t, i18n } = useTranslation();

    return (
        <div className="min-h-[665px] max-w-[500px] mx-auto bg-white shadow-xl rounded-2xl overflow-hidden pb-3 flex flex-col">
            {/* Фото */}
            <div
            className="h-[180px] sm:h-[220px] lg:h-[240px] w-full bg-cover bg-center"
            style={{ backgroundImage: 
                `url('https://osfinanzen.com/api/images/${imageUrls[0]}')` }}
            >
            </div>

            {/* Контент */}
            <div className="p-5 flex flex-col flex-grow">
                <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">
                    {title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm hidden">{description}</p>

                {/* Сетка параметров */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                    <img src={locationImg} alt="location" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardloc")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{location}</div>

                    <div className="flex items-center gap-2">
                    <img src={office} alt="office" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardtype")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{type}</div>

                    <div className="flex items-center gap-2">
                    <img src={salary} alt="salary" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardprice")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold flex items-end phone:block">
                        {`€ ${priceEUR} / $ ${priceUSD} / £ ${priceGBP}`}
                    </div>

                    <div className="flex items-center gap-2">
                    <img src={growth} alt="growth" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardprofit")}</span>
                    </div>
                    <div className="text-blue-600 font-semibold">
                        <ProfitDesc profitMin={profitMin} profitMax={profitMax}/>
                    </div>

                    <div className="flex items-center gap-2">
                    <img src={termloan} alt="term" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardtime")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        <TimeDesc timeMin={timeMin} timeMax={timeMax}/>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={warning} alt="risk" className="w-4 h-4" />
                        <span className="text-gray-700 font-medium">{t("detailscardrisks")}</span>
                    </div>
                    <div className="text-yellow-600 font-semibold">{risk}</div>
                </div>

                {/* Кнопка + прижатие вниз */}
                <div className="mt-auto">
                    <Link to={`/${i18n.language}/details?id=${id}`}>
                        <button
                        className="w-full py-2 active-btn font-semibold 
                        rounded-lg shadow text-sm cursor-pointer"
                        >
                        {t("detailscardbtn")}
                        </button>
                    </Link>
                    <div className="swiper-pagination !static flex justify-center mt-3"></div>
                </div>
            </div>
        </div>
    );
}

function TimeDesc({timeMin, timeMax}: {timeMin: number; timeMax: number}) {
    const { t } = useTranslation();

    if(timeMin > 90) {
        return (`${t("detailscardtimelong")}`);
    }
    else if(timeMin === 0 && timeMax === 0) {
        return (`${t("detailscardtimelready")}`);
    }
    else if(timeMax == 0) {
        return (`${timeMin} ${t("detailscardtimelabel")}`);
    }
    return (`${timeMin}-${timeMax} ${t("detailscardtimelabel")}`);
}

function ProfitDesc({profitMin, profitMax}: {profitMin: number; profitMax: number}) {
    const { t } = useTranslation();

    if(profitMax == 0) {
        return (`${profitMin}% ${t("detailscardprofitlabel")}`);
    }
    return (`${profitMin}-${profitMax}% ${t("detailscardprofitlabel")}`);
}