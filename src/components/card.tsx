import { Link } from "react-router";

export const Card = (props: { name: string, description: string }) => {
  const { name, description } = props;
  return (
    <div className="card-row">
      <Link to={`/${name}`} className="card-name">{name}</Link>
      <div className="card-description">{description}</div>
    </div>
  );
}
