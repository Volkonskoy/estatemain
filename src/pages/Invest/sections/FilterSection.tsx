import { useState, useEffect } from "react";
import type {ChangeEvent, FormEvent} from "react";
import { useTranslation } from "react-i18next";

interface Filters {
  type: string;
  region: string;
  currency: string;
  price_min: string;
  price_max: string;
}

interface FilterProps {
  request: string;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterSection({request, setRequest}: FilterProps) {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filters>({
    type: "",
    region: "",
    currency: "USD",
    price_min: "",
    price_max: "",
  });

  // Строка запроса

  // Обновляем filters при изменении select/input
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Сбрасываем фильтры
  const handleReset = () => {
    setFilters({
      type: "",
      region: "",
      currency: "USD",
      price_min: "",
      price_max: "",
    });
  };

  // Формируем строку запроса каждый раз, когда меняются filters
  useEffect(() => {
    let query = "";
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query += `&${key}=${encodeURIComponent(value)}`;
      }
    });
    setRequest(query);
  }, [filters]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Фильтры:", filters);
    console.log("Строка запроса:", request);
    // Здесь можно вызвать API с request
  };

  return (
    <div className="w-full p-4 shadow-md bg-white rounded-2xl mb-[50px]">
      <form
        className="grid gap-4 md:grid-cols-3"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {/* Основные фильтры */}
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border rounded-xl p-2 w-full"
        >
          <option value="">{t("investfiltertype1")}</option>
          <option>{t("investfiltertype2")}</option>
          <option>{t("investfiltertype3")}</option>
          <option>{t("investfiltertype4")}</option>
          <option>{t("investfiltertype5")}</option>
          <option>{t("investfiltertype6")}</option>
          <option>{t("investfiltertype7")}</option>
        </select>

        <select
          name="region"
          value={filters.region}
          onChange={handleChange}
          className="border rounded-xl p-2 w-full"
        >
          <option value="">{t("investfilterregion1")}</option>
          <option>{t("investfilterregion2")}</option>
          <option>{t("investfilterregion3")}</option>
          <option>{t("investfilterregion4")}</option>
          <option>{t("investfilterregion5")}</option>
          <option>{t("investfilterregion6")}</option>
          <option>{t("investfilterregion7")}</option>
          <option>{t("investfilterregion8")}</option>
          <option>{t("investfilterregion9")}</option>
          <option>{t("investfilterregion10")}</option>
          <option>{t("investfilterregion11")}</option>
          <option>{t("investfilterregion12")}</option>
          <option>{t("investfilterregion13")}</option>
          <option>{t("investfilterregion14")}</option>
        </select>

        <div className="flex items-center gap-2">
  <select
    name="currency"
    value={filters.currency}
    onChange={handleChange}
    className="border rounded-xl p-2"
  >
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
  </select>
  <input
    type="number"
    name="price_min"
    value={filters.price_min}
    onChange={handleChange}
    placeholder={t("investfilterpricefrom")}
    className="border rounded-xl p-2 w-full"
  />
  <input
    type="number"
    name="price_max"
    value={filters.price_max}
    onChange={handleChange}
    placeholder={t("investfilterpriceto")}
    className="border rounded-xl p-2 w-full"
  />
</div>


        {/* Кнопки действия */}
        <div className="col-span-full flex justify-end gap-4 mt-4">
          <button
            type="reset"
            className="px-6 py-2 border rounded-xl disabled-btn hover:brightness-110 transition cursor-pointer"
          >
            {t("investfilterbtn")}
          </button>
        </div>
      </form>
    </div>
  );
}
