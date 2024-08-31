const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Altere para a porta desejada

// Middleware para parsear o corpo da requisição como JSON
app.use(bodyParser.json());

app.post('/webhook-mercado-pago', (req, res) => {
  try {
    // Logs para debug
    console.log('Recebido webhook do Mercado Pago:');
    console.log('Cabeçalhos:', req.headers);
    console.log('Corpo:', req.body);

    // Extraindo informações do pagamento
    const pagamento = req.body;

    // Identificando o valor do pagamento e o meio de pagamento
    const valor = pagamento.transaction_amount || 'Não disponível';
    const meioDePagamento = pagamento.payment_type_id || 'Não disponível';

    // Exibindo informações extraídas
    console.log(`Valor do pagamento: ${valor}`);
    console.log(`Meio de pagamento: ${meioDePagamento}`);

    // Enviando resposta de sucesso
    res.status(200).json({ status: 'sucesso' });
  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    res.status(500).json({ status: 'erro', mensagem: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
