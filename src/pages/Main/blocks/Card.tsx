import { Link } from "react-router-dom";
import type {Investment} from "../interfaces/interfaces.tsx";
import { useTranslation } from "react-i18next";

export default function Card(
    {id, title, description, location, type, priceEUR, priceUSD, priceGBP, profitMin, profitMax, timeMin, timeMax, risk, imageUrls}: Investment) {
    const { t, i18n } = useTranslation();

    return (
        <div className="w-[95%] min-h-[665px] phone:w-[90%] max-w-[500px] mx-auto bg-white shadow-xl rounded-2xl overflow-hidden pb-3 flex flex-col">
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
                <p className="text-gray-600 mb-4 text-sm">{description}</p>

                {/* Сетка параметров */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                    <img src="icons/ShowcaseSection/location.png" alt="location" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardloc")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{location}</div>

                    <div className="flex items-center gap-2">
                    <img src="icons/ShowcaseSection/office.png" alt="office" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardtype")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{type}</div>

                    <div className="flex items-center gap-2">
                    <img src="icons/ShowcaseSection/salary.png" alt="salary" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardprice")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold flex items-end phone:block">
                        {`€ ${priceEUR} / $ ${priceUSD} / £ ${priceGBP}`}
                    </div>

                    <div className="flex items-center gap-2">
                    <img src="icons/ShowcaseSection/growth.png" alt="growth" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardprofit")}</span>
                    </div>
                    <div className="text-blue-600 font-semibold">
                        {`${profitMin}-${profitMax}% ${t("detailscardprofitlabel")}`}
                    </div>

                    <div className="flex items-center gap-2">
                    <img src="icons/ShowcaseSection/term-loan.png" alt="term" className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{t("detailscardtime")}</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {`${timeMin}-${timeMax} ${t("detailscardtimelabel")}`}
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="icons/ShowcaseSection/warning.png" alt="risk" className="w-4 h-4" />
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