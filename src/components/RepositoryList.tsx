import React, { useEffect, useState } from "react";
import RepositoryItem from "./RepositoryItem";

import "../styles/repositories.scss";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/csttn/repos")
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);
  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>

      <ul>
        {repositories.map((repoItem) => (
          <RepositoryItem repository={repoItem} key={repoItem.id} />
        ))}
      </ul>
    </section>
  );
}

export default RepositoryList;
