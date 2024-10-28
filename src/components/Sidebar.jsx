export const Sidebar = ({ onSet, list, onSelect, selectedProjectId }) => {
  return (
    <section className="bg-stone-900 w-1/3 px-8 py-16 text-stone-50 md:w-72 rounded-r-xl">
      <h1 className="mb-8 uppercase md:text-xl font-bold text-slate-200">
        Your Projects
      </h1>
      <button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={onSet}
      >
        +Add Project
      </button>
      <ul className="mt-8">
        {list.map((proj) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (proj.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={proj.id}>
              <button className={cssClasses} onClick={() => onSelect(proj.id)}>
                {proj.Title}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
