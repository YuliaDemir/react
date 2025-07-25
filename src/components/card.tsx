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
    <div className="card-row">
      <Link to={`/${name}`} className="card-name">
        {name}
      </Link>
      <img src={imgUrl} />
    </div>
  );
};
