import ArticleMeta from "@/components/ArticleMeta";
import Block from "@/components/Block";
import Layout from "@/components/Layout";
import { fetchBlocksByPageId, fetchPages } from "@/utils/notion";
import { getText } from "@/utils/property";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { Params, ArticleProps } from "../../types/types";
import NotionBlocks from "notion-block-renderer"

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  const { results } = await fetchPages({ slug: slug });
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);

  return {
    props: {
      page: page,
      blocks: blocks,
    },
    revalidate: 10,
  };
};

const Articles: NextPage<ArticleProps> = ({ page,blocks }) => {

  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12">
        {/* {blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))} */}
          <NotionBlocks blocks={blocks}/>
        </div>
      </article>
    </Layout>
  );
};

export default Articles;
