import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactsSection() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    telegram: "",
    topic: "",
    message: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a single string from form values
    const formString = `Имя: ${formData.name}\nEmail: ${formData.email}\nТелефон: ${formData.phone}\nTelegram: ${formData.telegram}\nТема: ${formData.topic}\nСообщение: ${formData.message}`;
    
    fetch("https://osfinanzen.com/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: formString,
      });
    
    // Reset form data
    setFormData({
        name: "",
        email: "",
        phone: "",
        telegram: "",
        topic: "",
        message: ""
    });
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mb-[50px] small:mb-[100px]" id="contactform">
      <h2 className="font-bold text-3xl sm:text-4xl text-center mb-5">
        {t("maincontactstitle")}
      </h2>
      <h3 className="font-semibold text-lg phone:text-xl text-center mb-8">
        {t("maincontactsdesc")}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-5 mb-4"
      >
        <div>
          <label className="block font-medium mb-2">{t("maincontactsbtnname")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">{t("maincontactsbtnnumber")}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">{t("maincontactsbtntg")}</label>
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">{t("maincontactsbtntopic")}</label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">{t("maincontactstopic1")}</option>
            <option>{t("maincontactstopic2")}</option>
            <option>{t("maincontactstopic3")}</option>
            <option>{t("maincontactstopic4")}</option>
            <option>{t("maincontactstopic5")}</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">{t("maincontactsbtnmessage")}</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full text-2xl font-bold active-btn rounded-2xl h-[50px] cursor-pointer"
        >
          {t("maincontactsbtnsubmit")}
        </button>
      </form>

      <h4 className="text-center font-semibold text-2xl mb-4 phone:mb-0">
        {t("maincontactsunderdesc")}
      </h4>
      <div className="flex flex-col phone:flex-row justify-center gap-x-8 items-center phone:items-baseline text-xl" id="contactform1">
        <p className="mb-2 phone:mb-0">E-mail: osfinanzen@gmail.com</p>
        <div className="flex items-center gap-3">
          <p>Telegram: </p>
          <a href="https://t.me/step_fin" target="_blank">
            <img
              src="icons/ContactsSection/telegram.svg"
              alt="telegram"
              className="w-[32px] h-auto cursor-pointer"
            />
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              {t("maincontactsmodaltitle")}
            </h2>
            <p className="mb-6">
              {t("maincontactsmodaldesc")}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full active-btn text-white font-semibold py-2 
              rounded-xl transition cursor-pointer"
            >
              {t("maincontactsmodalclose")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}