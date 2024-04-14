import { JsonApiClient } from "@drupal-api-client/json-api-client";
import { Jsona } from "jsona";

import styles from "../page.module.css";

const client = new JsonApiClient(
  "https://dev-drupal-api-client-poc.pantheonsite.io",
  {
    serializer: new Jsona(),
  }
);

export async function generateStaticParams() {
  const articles = await client.getCollection("node--article");

  return articles.map((article) => ({
    slug: article.path.alias.split("/"),
  }));
}

export default async function Page({ params }) {
  const slug = params.slug.join("/");
  const article = await client.getResourceByPath(slug, {
    queryString: "include=field_media_image.field_media_image",
  });
  const image = `${client.baseUrl}${article.field_media_image.field_media_image.uri.url}`;
  return (
    <main className={styles.main}>
      <h1>{article.title}</h1>
      <a href="/">Back to home</a>
      <img src={image} alt={article.title} />
      <div dangerouslySetInnerHTML={{ __html: article.body.value }} />
    </main>
  );
}
