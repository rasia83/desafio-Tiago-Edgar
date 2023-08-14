export const tabelaValores = {
    cafe: { descricao: 'Café', valor: 3.0, dependencia: null },
    chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5, dependencia: 'cafe' },
    suco: { descricao: 'Suco Natural', valor: 6.2, dependencia: null },
    sanduiche: { descricao: 'Sanduíche', valor: 6.5, dependencia: null },
    queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0, dependencia: 'sanduiche' },
    salgado: { descricao: 'Salgado', valor: 7.25, dependencia: null },
    combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50, dependencia: null}, 
    combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5, dependencia: null }  
};
