import { useState } from "react";

export default function Login({setAuth}: {setAuth: (state: boolean) => void}) {
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch(`https://osfinanzen.com/api/login?password=${password}`, {method: "POST"});
        const result = await response.json();

        if(!result) setError("Неверный пароль");
        else setAuth(true);
    };

    return (
        <div className="w-[500px] h-screen flex justify-center items-center mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-6 
            space-y-5">
                <input 
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Введите пароль"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
                <button
                type="submit"
                className="w-full text-2xl font-bold active-btn 
                rounded-2xl h-[50px] cursor-pointer mb-4"
                >
                Авторизоваться
                </button>
                <p className="text-red-600 font-bold text-lg">{error}</p>
            </form>
        </div>
    );
}