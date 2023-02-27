import { FC, useEffect, useState } from "react";

const MediaList: FC<{ title: string; url: string }> = ({ title, url }) => {
  const [medias, setMedias] = useState<
    { id: number; title: string; date: string; image: string }[]
  >([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMedias(
          res.results.map((el: any) => ({
            id: el.id,
            title: el.title || el.name,
            image: el.poster_path,
            date: el.release_date || el.first_air_date,
          }))
        );
      });
  }, [url]);

  return (
    <section>
      <h2>{title}</h2>
      {medias.length !== 0 ? (
        medias.map((media) => (
          <div key={media.id}>
            <span>{media.title}</span>
            <img
              src={`https://image.tmdb.org/t/p/w500${media.image}`}
              alt={media.title}
            />
            <span>{media.date}</span>
            <button>Add to watchlist</button>
          </div>
        ))
      ) : (
        <div>Pas de resultat</div>
      )}
    </section>
  );
};
export default MediaList;
