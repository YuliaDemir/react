export const Card = (props: { name: string, description: string }) => {
  const { name, description } = props;
  return (
    <div className="card-row">
      <div className="card-name">{name}</div>
      <div className="card-description">{description}</div>
    </div>
  );
}
