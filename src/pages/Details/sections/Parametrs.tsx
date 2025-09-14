import type { ParametrsProps } from "../interfaces/interfaces.tsx";
import { useTranslation } from "react-i18next";

import locationImg from '/icons/ShowcaseSection/location.png'
import office from '/icons/ShowcaseSection/office.png'
import salary from '/icons/ShowcaseSection/salary.png'
import growth from '/icons/ShowcaseSection/growth.png'
import termloan from '/icons/ShowcaseSection/term-loan.png'
import warning from '/icons/ShowcaseSection/warning.png'

export default function Parametrs({setIsOpen, location, type, priceEUR, priceUSD, priceGBP, profitMin, profitMax, timeMin, timeMax, risk}: ParametrsProps) {
    const { t } = useTranslation();

    return (
        <div className="pl-2 phone:pl-0 mb-8">
            <div className="grid grid-cols-2 mb-8 small:mb-4 gap-3 phone:gap-0 text-sm bigphone:text-[16px] 
            w-full phone:w-[400px] bigphone:w-[600px] small:w-[750px] mx-auto small:mx-0">
                <div className="flex items-center gap-2">
                <img src={locationImg} alt="location" className="w-4 h-4" />
                <span className="text-gray-700 font-medium">{t("detailscardloc")}</span>
                </div>
                <div className="text-gray-900 font-semibold">
                    {location}
                </div>

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
            <button
            onClick={() => setIsOpen(true)}
            className="w-[300px] big:w-[350px] mb-4 py-3 rounded-xl big:rounded-2xl cursor-pointer
            active-btn hover:brightness-80
            flex items-center justify-center font-bold
            small:text-lg big:text-lg mx-auto small:mx-0">
                {t("detailscardbtn")}
            </button>
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