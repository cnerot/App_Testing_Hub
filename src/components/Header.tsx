import { useEffect, useState } from "react";

function Header() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <span>{`${date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}, ${date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}`}</span>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Watchlist
        </button>
      </div>
      {open && (
        <div role="dialog" aria-label="watchlist">
          example
        </div>
      )}
    </>
  );
}

export default Header;
