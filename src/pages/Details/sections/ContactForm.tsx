import React from 'react';

export default function ContactForm({setIsOpen, title}: {setIsOpen: (state: boolean) => void, title: string}) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Extract form data
    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    
    const formString = `Недвижимость: ${title}\nИмя: ${formValues.name}\nEmail: ${formValues.email}\nСообщение: ${formValues.message}`;
  
    console.log(formValues);

    fetch("https://osfinanzen.com/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: formString,
      });

    setIsOpen(false);
  };

  return (
    // Затемнённый фон
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Форма */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-2xl p-8 w-full max-w-md shadow-lg relative"
      >
        {/* Заголовок */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Уточнить детали по проекту
        </h2>

        {/* Ваше имя */}
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введите ваше имя"
            className="w-full p-2 rounded-md border border-gray-300 text-black"
            required
          />
        </div>

        {/* E-mail */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите ваш e-mail"
            className="w-full p-2 rounded-md border border-gray-300 text-black"
            required
          />
        </div>

        {/* Большое текстовое поле */}
        <div className="mb-6">
          <textarea
            id="message"
            name="message"
            placeholder="Ваш комментарий"
            className="w-full p-2 rounded-md border border-gray-300 text-black h-32 resize-none"
          />
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="w-full gradient-btn cursor-pointer transition-colors py-2 rounded-md font-semibold"
        >
          Отправить
        </button>

        {/* Кнопка закрытия формы */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-black
          text-xl font-bold hover:text-gray-300 cursor-pointer"
        >
          &times;
        </button>
      </form>
    </div>
  );
}