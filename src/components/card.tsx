import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export const Card = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const pokData = await fetch(description).then((res) => res.json());
      const formUrl = pokData.forms[0].url;
      const formData = await fetch(formUrl).then((res) => res.json());
      setImgUrl(formData.sprites.front_default);
    })();
  }, [description]);

  return (
    <Link
      to={`/${name}`}
      className="flex items-center justify-between border rounded-lg px-20 py-1 shadow hover:shadow-md transition hover:bg-blue-100"
    >
      <span className="text-lg font-semibold text-blue-500">{name}</span>
      <img src={imgUrl} alt={name} className="w-20 h-20 object-contain" />
    </Link>
  );
};
