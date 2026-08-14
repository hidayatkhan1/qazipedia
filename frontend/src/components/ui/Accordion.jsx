import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-teal-900/10 border-y border-teal-900/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-base font-medium text-teal-950">
                {item.question}
              </span>
              <FaChevronDown
                className={`shrink-0 text-teal-700 text-sm transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="text-sm text-ink-700 leading-relaxed pb-4 pr-8">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
