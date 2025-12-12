import { Link } from "react-router";

export default function Home() {
    return (
        <main className="h-full flex flex-col">
            <h1 className="text-center mt-5">Cintyr</h1>
            <div className="flex justify-center items-center gap-3 grow-2">
                <Link to="/weekly-movie" className="bg-white px-4 py-2 rounded-xl">Films de la semaine</Link>
                <Link to="/daily-movie" className="bg-white px-4 py-2 rounded-xl">Films du jour</Link>
            </div>
        </main>
    );
}
