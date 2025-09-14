import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

type ProjectName = {
  ru: string;
  en: string;
  uk: string;
  de: string;
};

type Range = {
  from: string;
  to: string;
};

type Investment = {
  currency: string;
  amount: string;
};

type Project = {
  name: ProjectName;
  shortDescription: ProjectName;
  description: ProjectName;
  type: string; // на фронте только русский
  location: ProjectName;
  investment: Investment;
  profitability: Range;
  duration: Range;
  riskLevel: string;
  images: File[];
  youtubeLinks: string[];
  isActual: boolean;
};

// Список типов на русском
const typesRU = [
  "Недвижимость",
  "Строительные объекты",
  "Бизнес",
  "Стартапы",
  "Другие предложения",
  "Эксклюзивы"
];

// Соответствие переводов
const typeTranslations: Record<string, ProjectName> = {
  "Недвижимость": { ru: "Недвижимость", en: "Real Estate", uk: "Нерухомість", de: "Immobilien" },
  "Строительные объекты": { ru: "Строительные объекты", en: "Construction Projects", uk: "Будівельні об'єкти", de: "Bauprojekte" },
  "Бизнес": { ru: "Бизнес", en: "Business", uk: "Бізнес", de: "Business" },
  "Стартапы": { ru: "Стартапы", en: "Startups", uk: "Стартапи", de: "Startups" },
  "Другие предложения": { ru: "Другие предложения", en: "Other Offers", uk: "Інші пропозиції", de: "Andere Angebote" },
  "Эксклюзивы": { ru: "Эксклюзивы", en: "Exclusives", uk: "Ексклюзиви", de: "Exklusives" },
};

const riskLevels = ["LOW", "MEDIUM", "HIGH"];
const currencies = ["EUR", "USD", "GBP"];
const languages: (keyof ProjectName)[] = ["ru", "en", "uk", "de"];

export default function AddForm() {
  const [project, setProject] = useState<Project>({
    name: { ru: "", en: "", uk: "", de: "" },
    shortDescription: { ru: "", en: "", uk: "", de: "" },
    description: { ru: "", en: "", uk: "", de: "" },
    type: "", // на фронте только русский
    location: { ru: "", en: "", uk: "", de: "" },
    investment: { currency: "EUR", amount: "" },
    profitability: { from: "", to: "" },
    duration: { from: "", to: "" },
    riskLevel: "",
    images: [],
    youtubeLinks: [""],
    isActual: false,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const newPreviews = project.images.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [project.images]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: keyof Project | string,
    lang?: keyof ProjectName
  ) => {
    if (lang) {
      setProject(prev => ({
        ...prev,
        [field as keyof Project]: {
          ...(prev[field as keyof Project] as ProjectName),
          [lang]: e.target.value
        }
      }));
    } else if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProject(prev => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof Project] as Range), [child]: e.target.value }
      }));
    } else {
      setProject(prev => ({ ...prev, [field as keyof Project]: e.target.value }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setProject(prev => ({ ...prev, images: [...prev.images, ...Array.from(files)] }));
  };

  const removeImage = (index: number) => {
    setProject(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleYouTubeLinkChange = (index: number, value: string) => {
    const newLinks = [...project.youtubeLinks];
    newLinks[index] = value;
    setProject(prev => ({ ...prev, youtubeLinks: newLinks }));
  };

  const addYouTubeLinkField = () => {
    setProject(prev => ({ ...prev, youtubeLinks: [...prev.youtubeLinks, ""] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const typeTranslation = typeTranslations[project.type]; // ✅ получаем переводы типов

      const body = {
        nameRU: project.name.ru,
        nameUA: project.name.uk,
        nameEN: project.name.en,
        nameDE: project.name.de,
        descriptionRU: project.shortDescription.ru,
        descriptionUA: project.shortDescription.uk,
        descriptionEN: project.shortDescription.en,
        descriptionDE: project.shortDescription.de,
        fullDescriptionRU: project.description.ru,
        fullDescriptionUA: project.description.uk,
        fullDescriptionEN: project.description.en,
        fullDescriptionDE: project.description.de,
        locationRU: project.location.ru,
        locationUA: project.location.uk,
        locationEN: project.location.en,
        locationDE: project.location.de,
        typeRU: typeTranslation.ru,
        typeUA: typeTranslation.uk,
        typeEN: typeTranslation.en,
        typeDE: typeTranslation.de,
        baseCurrency: project.investment.currency,
        price: Number(project.investment.amount),
        profitMin: Number(project.profitability.from),
        profitMax: Number(project.profitability.to),
        timeMin: Number(project.duration.from),
        timeMax: Number(project.duration.to),
        risk: project.riskLevel,
        actual: project.isActual,
        videoUrls: project.youtubeLinks.filter(Boolean),
      };

      const createResponse = await fetch("https://osfinanzen.com/api/houses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!createResponse.ok) throw new Error("Ошибка при создании проекта");

      const createdProject = await createResponse.json();
      const projectId = createdProject;

      if (project.images.length > 0) {
        const formData = new FormData();
        project.images.forEach(file => formData.append("images", file));
        const imagesResponse = await fetch(`https://osfinanzen.com/api/images/${projectId}`, {
          method: "POST",
          body: formData,
        });
        if (!imagesResponse.ok) throw new Error("Ошибка при загрузке изображений");
      }

      alert("Проект был успешно добавлен");
      setProject({
        name: { ru: "", en: "", uk: "", de: "" },
        shortDescription: { ru: "", en: "", uk: "", de: "" },
        description: { ru: "", en: "", uk: "", de: "" },
        type: "",
        location: { ru: "", en: "", uk: "", de: "" },
        investment: { currency: "EUR", amount: "" },
        profitability: { from: "", to: "" },
        duration: { from: "", to: "" },
        riskLevel: "",
        images: [],
        youtubeLinks: [""],
        isActual: false,
      });
    } catch (error) {
      alert(`Ошибка: ${error}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Добавить проект</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Название */}
        {languages.map(lang => (
          <div key={lang}>
            <label className="block font-medium mb-1">Название ({lang.toUpperCase()})</label>
            <input
              required
              type="text"
              value={project.name[lang]}
              onChange={(e) => handleChange(e, "name", lang)}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        {/* Короткое описание */}
        {languages.map(lang => (
          <div key={lang}>
            <label className="block font-medium mb-1">Короткое описание ({lang.toUpperCase()})</label>
            <textarea
              required
              value={project.shortDescription[lang]}
              onChange={(e) => handleChange(e, "shortDescription", lang)}
              className="w-full border p-2 rounded h-16 resize-none"
            />
          </div>
        ))}

        {/* Тип объекта */}
        <div>
          <label className="block font-medium mb-1">Тип объекта</label>
          <select
            value={project.type}
            onChange={(e) => handleChange(e, "type")}
            className="w-full border p-2 rounded"
          >
            <option value="">Выберите тип</option>
            {typesRU.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        {/* Локация */}
        {languages.map(lang => (
          <div key={lang}>
            <label className="block font-medium mb-1">Локация ({lang.toUpperCase()})</label>
            <input
              required
              type="text"
              value={project.location[lang]}
              onChange={(e) => handleChange(e, "location", lang)}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        {/* Остальные поля остаются как в предыдущем примере... */}
        {/* Инвестиции, срок, доходность, риск, полное описание, картинки, YouTube, актуально */}

    {/* Инвестиционный вход */}
        <div>
          <label className="block font-medium mb-1">Инвестиционный вход</label>
          <div className="flex gap-2">
            <select
              value={project.investment.currency}
              onChange={(e) =>
                setProject(prev => ({
                  ...prev,
                  investment: { ...prev.investment, currency: e.target.value }
                }))
              }
              className="border border-gray-300 p-2 rounded"
            >
              {currencies.map(cur => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
            <input
              required
              type="number"
              value={project.investment.amount}
              onChange={(e) =>
                setProject(prev => ({
                  ...prev,
                  investment: { ...prev.investment, amount: e.target.value }
                }))
              }
              className="flex-1 border border-gray-300 p-2 rounded"
              placeholder="Введите сумму"
            />
          </div>
        </div>

        {/* Доходность */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Доходность от (%)</label>
            <input
              required
              type="number"
              value={project.profitability.from}
              onChange={(e) => handleChange(e, "profitability.from")}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">до (%)</label>
            <input
              type="number"
              value={project.profitability.to}
              onChange={(e) => handleChange(e, "profitability.to")}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        {/* Срок */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Срок от (мес.)</label>
            <input
              type="number"
              required
              value={project.duration.from}
              onChange={(e) => handleChange(e, "duration.from")}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">до (мес.)</label>
            <input
              type="number"
              value={project.duration.to}
              onChange={(e) => handleChange(e, "duration.to")}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        {/* Уровень риска */}
        <div>
          <label className="block font-medium mb-1">Уровень риска</label>
          <select
            value={project.riskLevel}
            onChange={(e) => handleChange(e, "riskLevel")}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Выберите уровень риска</option>
            {riskLevels.map(risk => <option key={risk} value={risk}>{risk}</option>)}
          </select>
        </div>

        {/* Полное описание */}
        {languages.map(lang => (
          <div key={lang}>
            <label className="block font-medium mb-1">
              Полное описание ({lang.toUpperCase()})
            </label>
            <textarea
              required
              value={project.description[lang]}
              onChange={(e) => handleChange(e, "description", lang)}
              className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
              placeholder="Введите полное описание проекта..."
            />
          </div>
        ))}

        {/* Загрузка картинок */}
        <div>
          <label className="block font-medium mb-2">Загрузить картинки</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {project.images.map((_, index) => (
              <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                <img
                  src={imagePreviews[index]}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ссылки на YouTube */}
        <div>
          <label className="block font-medium mb-1">Ссылки на YouTube</label>
          {project.youtubeLinks.map((link, index) => (
            <input
              key={index}
              type="text"
              value={link}
              onChange={(e) => handleYouTubeLinkChange(index, e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="https://youtube.com/..."
            />
          ))}
          <button
            type="button"
            onClick={addYouTubeLinkField}
            className="text-blue-600 hover:underline"
          >
            Добавить ссылку
          </button>
        </div>

        {/* Актуально */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={project.isActual}
            onChange={(e) =>
              setProject(prev => ({ ...prev, isActual: e.target.checked }))
            }
          />
          <label className="font-medium">Актуально</label>
        </div>

        {/* Кнопка отправки */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Добавить проект
          </button>
        </div>
      </form>
    </div>
  );
}
