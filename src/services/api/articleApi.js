import { getApi } from "../genericServices";

export async function getArticles() {
  return await getApi("articles");
}

export async function getCategories() {
  return await getApi("categories");
}

export async function getArticlesFromCategory(category) {
  return await getApi("articles/" + category);
}

export async function getSingleArticle(id) {
  return await getApi("articles/" + id);
}
