import { useParams, useNavigate } from "react-router";

export function Details() {
  const { id } = useParams();

  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div>
      <button type="button" onClick={navigateBack}>
        Voltar
      </button>

      <h1>Detalhes</h1>

      <span>
        ID do produto: <strong> {id}</strong>
      </span>
    </div>
  );
}
