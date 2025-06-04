import { useEffect, useState } from "react";
import Button from "../Divers/Button";
import SearchInput from "../Divers/SearchBar/SearchInput";
import { get } from "../../api/apiClient";

interface Exercice {
  id_exercice_respiration: number;
  nomExercice: string;
  duree_inspiration: number;
  duree_expiration: number;
  duree_apnee: number;
  nombre_repetitions: number;
}

const ExercicesRespirationPanel = () => {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [filtered, setFiltered] = useState<Exercice[]>([]);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<Exercice | null>(null);
  const [phase, setPhase] = useState<"inspire" | "expire" | "apnee" | null>(null);
  const [repetition, setRepetition] = useState(0);
  const [playing, setPlaying] = useState(false);

 useEffect(() => {
  const fetchExercices = async () => {
    const res = await get<{ exercices: Exercice[] }>("/exercices");
    console.log("Résultat de l'API :", res);
    if (res && Array.isArray(res.exercices)) {
      setExercices(res.exercices);
      setFiltered(res.exercices);
    } else {
      console.warn("Réponse inattendue :", res);
    }
  };
  fetchExercices();
}, []);



  useEffect(() => {
    if (playing && current) {
      const runCycle = async () => {
        for (let i = 0; i < current.nombre_repetitions; i++) {
          setRepetition(i + 1);
          setPhase("inspire");
          await wait(current.duree_inspiration * 1000);
          setPhase("apnee");
          await wait(current.duree_apnee * 1000);
          setPhase("expire");
          await wait(current.duree_expiration * 1000);
        }
        setPlaying(false);
        setCurrent(null);
        setPhase(null);
      };
      runCycle();
    }
  }, [playing]);

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.trim() === "") {
      setFiltered(exercices);
    } else {
      const f = exercices.filter((ex) =>
        ex.nomExercice.toLowerCase().includes(q.toLowerCase())
      );
      setFiltered(f);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Exercices de respiration
      </h2>

      <SearchInput
        name="search"
        placeholder="Rechercher un exercice..."
        value={query}
        onChange={handleSearch}
      />

      <ul className="mt-4 space-y-4">
        {filtered.map((ex) => (
          <li
            key={ex.id_exercice_respiration}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow dark:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">
                  {ex.nomExercice}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Inspiration : {ex.duree_inspiration}s</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Apnée : {ex.duree_apnee}s</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Expiration : {ex.duree_expiration}s</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Répétitions : {ex.nombre_repetitions}</p>
              </div>
              <Button
                label="Lancer"
                color="green"
                onClick={() => {
                  setCurrent(ex);
                  setPlaying(true);
                  setRepetition(0);
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      {playing && current && (
        <div className="fixed inset-0 z-50 bg-gray-300 flex items-center justify-center">
          <div className="w-64 h-100 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center max-w-md w-full">
            <div
              className={`mx-auto rounded-full bg-green-300 dark:bg-green-600 transition-all duration-1000 ease-in-out ${
                phase === "inspire"
                  ? "w-48 h-48"
                  : phase === "expire"
                  ? "w-28 h-28"
                  : "w-36 h-36"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700 dark:text-white">
                  {phase === "inspire"
                    ? "Inspirez"
                    : phase === "expire"
                    ? "Expirez"
                    : "Apnée"}
                </span>
              </div>
            </div>
            <div className=" flex flex-col justify-between mt-6">
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      Répétition {repetition} / {current.nombre_repetitions}
    </p>
    <Button
      label="Arrêter"
      color="red"
      onClick={() => {
        setPlaying(false);
        setCurrent(null);
        setPhase(null);
      }}
    />
  </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercicesRespirationPanel;
