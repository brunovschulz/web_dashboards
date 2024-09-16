document.getElementById("educacao-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    
    const usoDados = document.getElementById("uso_dados").value;
    const dificuldade = document.getElementById("dificuldade").value;
    const temaRelevante = document.getElementById("tema_relevante").value;

    if (!usoDados || !dificuldade || !temaRelevante) {
        document.getElementById("error-message").style.display = "block";
        return;
    }

    document.getElementById("error-message").style.display = "none";

    const dadosForm = {
        uso_dados: usoDados,
        dificuldade: dificuldade,
        tema_relevante: temaRelevante
    };

    fetch("/form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosForm)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Dados enviados com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao enviar os dados. Tente novamente.");
    });
});
