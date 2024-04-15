import { JsonApiClient } from "@drupal-api-client/json-api-client";
import styles from "./page.module.css";

export default async function Home() {
  const client = new JsonApiClient(
    "https://dev-drupal-api-client-poc.pantheonsite.io"
  );
  const articles = await client.getCollection("node--article");

  return (
    <main className={styles.main}>
      <h1>Umami Articles</h1>
      <div className={styles.grid}>
        {articles.data.map((article) => (
          <a
            href={article.attributes.path.alias}
            className={styles.card}
            key={article.id}
          >
            <h2>{article.attributes.title}</h2>
            <p>
              Read more <span>-&gt;</span>
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
