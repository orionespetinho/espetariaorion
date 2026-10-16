import bovina from "@/assets/espeto-bovina.jpg";
import medalhao from "@/assets/medalhao-frango.jpg";
import almondegas from "@/assets/almondegas.jpg";
import coracao from "@/assets/coracao-galinha.jpg";
import linguica from "@/assets/linguica.jpg";
import frangoBacon from "@/assets/frango-bacon.jpg";
import acomp from "@/assets/acompanhamentos.jpg";
import bebidas from "@/assets/bebidas.jpg";

export type Item = {
  id: string;
  nome: string;
  descricao: string;
  preco: number | null; // PREENCHER — null mostra "Consulte"
  img: string;
  tags?: string[];
  destaque?: boolean;
};
export type Categoria = { id: string; nome: string; icone: string; img: string; itens: Item[] };

// CONFIRMAR COM O DONO: preços, cortes, tipos e variações de cada categoria.
export const categorias: Categoria[] = [
  { id: "destaque", nome: "Destaque", icone: "Flame", img: frangoBacon, itens: [
    { id: "frango-bacon", nome: "Espeto de Frango com Bacon", descricao: "Frango suculento envolto em bacon crocante, direto da brasa.", preco: null, img: frangoBacon, destaque: true, tags: ["Destaque"] },
  ]},
  { id: "bovina", nome: "Carne bovina", icone: "Beef", img: bovina, itens: [
    { id: "bovina", nome: "Espeto de Carne Bovina", descricao: "Carne macia selada na brasa, no ponto que você preferir.", preco: null, img: bovina },
  ]},
  { id: "medalhao", nome: "Medalhão de frango", icone: "Drumstick", img: medalhao, itens: [
    { id: "medalhao", nome: "Espeto de Medalhão de Frango", descricao: "Medalhões dourados e temperados, assados lentamente.", preco: null, img: medalhao },
  ]},
  { id: "almondegas", nome: "Almôndegas", icone: "CircleDot", img: almondegas, itens: [
    { id: "almondegas", nome: "Espeto de Almôndegas", descricao: "Almôndegas temperadas com crosta tostada na brasa.", preco: null, img: almondegas },
  ]},
  { id: "coracao", nome: "Coração de galinha", icone: "Heart", img: coracao, itens: [
    { id: "coracao", nome: "Espeto de Coração de Galinha", descricao: "Clássico da brasa, macio por dentro e tostado por fora.", preco: null, img: coracao },
  ]},
  { id: "linguica", nome: "Linguiça", icone: "Utensils", img: linguica, itens: [
    { id: "linguica", nome: "Espeto de Linguiça", descricao: "Linguiça suculenta, dourada no carvão em brasa.", preco: null, img: linguica },
  ]},
  { id: "acompanhamentos", nome: "Acompanhamentos", icone: "Salad", img: acomp, itens: [
    { id: "acompanhamentos", nome: "Acompanhamentos", descricao: "Os parceiros ideais para o seu espeto.", preco: null, img: acomp },
  ]},
  { id: "porcoes", nome: "Porções", icone: "UtensilsCrossed", img: acomp, itens: [
    { id: "porcoes", nome: "Porções", descricao: "Para dividir com a mesa toda.", preco: null, img: acomp },
  ]},
  { id: "bebidas", nome: "Bebidas e cervejas", icone: "Beer", img: bebidas, itens: [
    { id: "bebidas", nome: "Bebidas e Cervejas", descricao: "Cerveja trincando de gelada e bebidas para todos.", preco: null, img: bebidas },
  ]},
];

export const combos: Item[] = []; // vazio = seção oculta

export const todosItens = categorias.flatMap((c) => c.itens);
