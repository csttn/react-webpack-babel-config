interface RepositoryItemProps {
  repository: {
    id: number;
    name: string;
    description: string;
    html_url: string;
  };
}

function RepositoryItem({
  repository: { name, description, html_url },
}: RepositoryItemProps) {
  return (
    <li>
      <strong>{name ?? "Default2"}</strong>
      <p>{description ?? "Description"}</p>

      <a href={html_url}>Acessar Repo</a>
    </li>
  );
}

export default RepositoryItem;
