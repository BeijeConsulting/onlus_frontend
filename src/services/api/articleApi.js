import { getApi } from "../genericServices";

export async function getArticles() {
  return await getApi("article/");
}

export async function getCategories() {
  return await getApi("category");
}

export async function getArticlesFromCategory(category) {
  return await getApi("article/articles_category/" + category);
}

export async function getSingleArticle(id) {
  return await getApi("article/" + id);
}
