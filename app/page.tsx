
"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Бағдарламалау оқу", done: false },
  { id: 2, title: "Кітап оқу", done: true },
  { id: 3, title: "Ағылшын тілін үйрену", done: false },
];

const navigation = [
  "Басты бет",
  "Тапсырмалар",
  "Күнтізбе",
  "Көңіл күй",
  "Күнделік",
  "Статистика",
  "Профиль",
];

export default function Home() {
  const [activePage, setActivePage] = useState("Басты бет");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [mood, setMood] = useState("😊 Жақсы");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<string[]>([]);
  const [name, setName] = useState("Әсел");

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  function addTask() {
    const title = newTask.trim();

    if (!title) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), title, done: false },
    ]);

    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function saveEntry() {
    if (!note.trim()) return;

    setEntries((current) => [note.trim(), ...current]);
    setNote("");
  }

  return (
    <main className="min-h-screen bg-[#f5f2ff] p-3 text-[#302b68] md:p-6">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-[230px_1fr]">
        <aside className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
          <h1 className="mb-8 text-2xl font-extrabold text-violet-600">
            day by day ♡
          </h1>

          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {navigation.map((item) => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                  activePage === item
                    ? "bg-violet-100 text-violet-700"
                    : "text-slate-500 hover:bg-purple-50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <p className="mt-8 text-xs leading-6 text-purple-400">
            Кішкентай қадамдар күн сайын үлкен нәтижелерге жеткізеді. ♡
          </p>
        </aside>

        <section className="min-w-0 rounded-3xl border border-purple-100 bg-white p-5 shadow-sm md:p-8">
          <header className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">
                Сәлем, {name}! ♡
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Бүгін — өзің үшін тамаша күн.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-200 font-bold text-violet-700">
              {name.charAt(0).toUpperCase()}
            </div>
          </header>

          {activePage === "Басты бет" && (
            <>
              <div className="rounded-3xl bg-gradient-to-r from-violet-500 to-purple-400 p-7 text-white md:p-10">
                <p className="mb-3 text-sm text-purple-100">
                  Жеке даму күнделігі
                </p>

                <h2 className="text-4xl font-extrabold">
                  day by day ♡
                </h2>

                <p className="mt-3 text-sm">
                  Өзіңнің ең жақсы нұсқаңа қарай.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-purple-50 p-5">
                  <p className="text-sm text-slate-500">
                    Бүгінгі прогресс
                  </p>

                  <p className="mt-3 text-3xl font-extrabold text-violet-600">
                    {progress}%
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-purple-200">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {completed} / {tasks.length} тапсырма орындалды
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-5">
                  <p className="text-sm text-slate-500">
                    Көңіл күй
                  </p>

                  <p className="mt-4 text-xl font-bold">{mood}</p>

                  <button
                    onClick={() => setActivePage("Көңіл күй")}
                    className="mt-3 text-sm font-bold text-violet-600"
                  >
                    Көңіл күйді өзгерту →
                  </button>
                </div>

                <div className="rounded-2xl bg-purple-50 p-5">
                  <p className="text-sm text-slate-500">
                    Күннің сөзі
                  </p>

                  <p className="mt-3 text-sm leading-6">
                    «Үлкен жетістіктер кішкентай қадамдардан басталады». ♡
                  </p>
                </div>
              </div>

              <h3 className="mb-3 mt-8 text-lg font-extrabold">
                Бүгінгі тапсырмалар
              </h3>

              <TaskList tasks={tasks} onToggle={toggleTask} />

              <button
                onClick={() => setActivePage("Тапсырмалар")}
                className="mt-4 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-700"
              >
                + Тапсырма қосу
              </button>
            </>
          )}

          {activePage === "Тапсырмалар" && (
            <div>
              <h2 className="text-2xl font-extrabold">Тапсырмалар</h2>

              <p className="mt-2 text-sm text-slate-400">
                Жоспарла, орында, жетістігіңді белгіле. ♡
              </p>

              <form
                className="my-6 flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  addTask();
                }}
              >
                <input
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                  placeholder="Жаңа тапсырма жаз..."
                  className="min-w-0 flex-1 rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-violet-400"
                />

                <button className="rounded-xl bg-violet-600 px-4 py-3 font-bold text-white">
                  Қосу
                </button>
              </form>

              <TaskList tasks={tasks} onToggle={toggleTask} />
            </div>
          )}

          {activePage === "Көңіл күй" && (
            <div>
              <h2 className="text-2xl font-extrabold">Көңіл күй ♡</h2>

              <p className="mb-5 mt-2 text-sm text-slate-400">
                Бүгін өзіңді қалай сезініп тұрсың?
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "😄 Керемет",
                  "😊 Жақсы",
                  "😐 Қалыпты",
                  "😔 Мұңды",
                  "🥱 Шаршадым",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMood(item)}
                    className={`rounded-2xl border p-5 font-bold ${
                      mood === item
                        ? "border-violet-400 bg-violet-100 text-violet-700"
                        : "border-purple-100 bg-purple-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-sm">
                Таңдалған көңіл күй: <b>{mood}</b>
              </p>
            </div>
          )}

          {activePage === "Күнделік" && (
            <div>
              <h2 className="text-2xl font-extrabold">Күнделік ♡</h2>

              <p className="mb-5 mt-2 text-sm text-slate-400">
                Бүгінгі ойларыңды осында жаз.
              </p>

              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Бүгінгі күнің қалай өтті?"
                className="min-h-36 w-full rounded-2xl border border-purple-100 p-4 outline-none focus:border-violet-400"
              />

              <button
                onClick={saveEntry}
                className="mt-3 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white"
              >
                Жазбаны сақтау
              </button>

              <div className="mt-6 grid gap-3">
                {entries.map((entry, index) => (
                  <div
                    key={index}
                    className="whitespace-pre-wrap rounded-2xl bg-purple-50 p-5"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === "Күнтізбе" && (
            <div>
              <h2 className="text-2xl font-extrabold">Күнтізбе</h2>

              <p className="mt-2 text-sm text-slate-400">
                Бүгінгі күн:{" "}
                {new Date().toLocaleDateString("kk-KZ")}
              </p>

              <div className="mt-5 rounded-2xl bg-purple-50 p-5">
                <h3 className="font-extrabold">Бүгінгі жоспар</h3>
                <div className="mt-3">
                  <TaskList tasks={tasks} onToggle={toggleTask} />
                </div>
              </div>
            </div>
          )}

          {activePage === "Статистика" && (
            <div>
              <h2 className="text-2xl font-extrabold">Статистика</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <StatCard label="Барлық тапсырма" value={tasks.length} />
                <StatCard label="Орындалған" value={completed} />
                <StatCard label="Күнделік жазбалары" value={entries.length} />
              </div>

              <div className="mt-6 rounded-2xl bg-purple-50 p-5">
                <p className="font-bold">Тапсырмалардың орындалуы</p>
                <p className="mt-3 text-3xl font-extrabold text-violet-600">
                  {progress}%
                </p>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-purple-200">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {activePage === "Профиль" && (
            <div>
              <h2 className="text-2xl font-extrabold">Профиль</h2>

              <label className="mb-2 mt-5 block text-sm font-bold">
                Есімің
              </label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full max-w-md rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-violet-400"
              />

              <p className="mt-3 text-sm text-slate-400">
                Сәлемдесу мәтіні есіміңе сәйкес автоматты түрде өзгереді.
              </p>
            </div>
          )}

          <footer className="mt-10 border-t border-purple-100 pt-5 text-center text-xs text-slate-400">
            day by day ♡ — Кішкентай қадамдар, үлкен нәтижелер.
          </footer>
        </section>
      </div>
    </main>
  );
}

function TaskList({
  tasks,
  onToggle,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="divide-y divide-purple-100 rounded-2xl border border-purple-100 px-4">
      {tasks.map((task) => (
        <label
          key={task.id}
          className="flex cursor-pointer items-center gap-3 py-4"
        >
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
            className="h-4 w-4 accent-violet-600"
          />

          <span
            className={`text-sm ${
              task.done ? "text-slate-400 line-through" : "text-slate-700"
            }`}
          >
            {task.title}
          </span>
        </label>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-purple-50 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-violet-600">
        {value}
      </p>
    </div>
  );
}
