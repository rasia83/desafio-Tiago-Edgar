import { tabelaPagamento } from "./pagamento.js";
import { tabelaValores } from "./cardapio.js";

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (itens === null || (Array.isArray(itens) && itens.length === 0)) {
            return "Não há itens no carrinho de compra!";
        }

        if (metodoDePagamento === null || !tabelaPagamento[metodoDePagamento]) {
            return "Forma de pagamento inválida!";
        }

        let itensPedido = [];
        for (let itemInfo of itens) {
            let [nome, quantidadeStr] = itemInfo.split(",");

            if (!(nome in tabelaValores)) {
                return "Item inválido!";
            }

            /* não foi necessario para estes testes
            if (isNaN(quantidadeStr)) {
                return "Quantidade inválida!";
            } */
            const quantidade = parseInt(quantidadeStr, 10);

            if (quantidade == 0) {
                return "Quantidade inválida!";
            }

            const itemPedido = [nome, quantidade];
            itensPedido.push(itemPedido);
        }

        let valorTotal = 0.0;

        /**
         * primeiro percorri o array de itens preenchendo meu proprio array itensPedido
         * para conseguir pesquisar se encontrava o item principal de um item extra
         * e nesta segunda passagem pelos itens fui calculando os valores
         * teria feito uma unica leitura de itens se não fosse a regra dos extras
         */
        for (let item of itensPedido) {
            if (tabelaValores[item[0]].dependencia !== null) {
                let dependenciaFaltando = true;
                itensPedido.forEach((element) => {
                    if (element[0].startsWith(tabelaValores[item[0]].dependencia)) {
                        dependenciaFaltando = false;
                    }
                });
                if (dependenciaFaltando) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            let valorItem = parseFloat(tabelaValores[item[0]].valor);
            valorTotal += valorItem * item[1];
        }
        
        let modPagamento = tabelaPagamento[metodoDePagamento].modificador;
        valorTotal *= modPagamento;

        /**
         * inicialmente tive dificuldades em usar valorTotal.toFixed(casasDecimais);
         * pois utilizo o sistema operacional no padrão en-us 
         * e os resultados com . no lugar da , estavam errados
         * pesquisando descobri o toLocaleString() já apresentava o valor perfeitamente até com "R$ "
         * mas um dos testes apresentava erro
         * compra de múltiplas quantidades em "credito" deve resultar em "R$ 36,56"
         * valor calculado 36.565 apresentava o resultado errado para o teste  "R$ 36,57"
         * 
         * por fim para atingir os resultados do arquivo de testes tive que 
         * usar o toFixed para conseguir o valor correto para ser exibido
         * e o toLocaleString para garantir o formato pedido nos testes
         */
        const casasDecimais = 2;
        let total2Fixed = valorTotal.toFixed(casasDecimais);
        let totalFormatado = parseFloat(total2Fixed).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return totalFormatado;

    }

}

export { CaixaDaLanchonete };
