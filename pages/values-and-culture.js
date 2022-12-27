import Head from "next/head";
import React from "react";

import styles from "../components/Post/post.module.css";
import markdownToHtml from "../lib/markdownToHtml";

export const config = {
  runtime: "experimental-edge",
};

export const getServerSideProps = async () => {
  console.log(" /values-and-culture page");
  const content = await markdownToHtml(`
These Values and Culture statements below are much more than company good intentions. They are the result of a lot of learnt lessons, thoughtful leadership, and the will to put in the center of our actions and growth, our core values. This is how we work on a daily basis, a reminder for each of us in the Wasmer Team, and a welcoming honest declaration for those who are joining onboard. 

Our Wellness Plan and daily life work is inspired, supported and boosted by the principles here: 

## Values
### Empowerment
The more each of us can shine, the better for the team, the company and our users and collaborators. Freedom and responsibility work together. We trust every team member is qualified to make convenient decisions in their area. We enforce self-development, ownership and autonomy.
### Simplicity
Let's make things easy. In our environment we need to be dynamic and pragmatic: fast is better than perfect. We can get to the essence of the process/task/feature and prioritize steps to provide a better experience for users/partners/workmates.
### Innovation and Disruption
We are curious, we are creating and thinking out of the box. We challenge the status quo. We try to see beyond the seeming limitations. Let's cultivate unrestricted thinking.
### Excellence
Excellence as a dynamic concept refers to giving our best in every moment. This habit leads us to constant improvement. We are continuously creating a framework which supports this value at every level of the organization.

## Culture
### Diversity, inclusion
People that think differently, have different backgrounds, education and skills balances the team, enriches the culture and the company's super-powers set, and provides a wider view.
### Accountability
We learn from the past to improve in the present and create the future. With a focus on accountability and improvement, we use our mistakes as a tool to grow.
By the habit of making healthy analyses and constructive reviews, we can discern what is working well and what needs to be improved, in both ourselves and the company.
### Fluid Communication
By being clear and proactive in communication, we positively affect workflow, relationships and environment. We must all try to stay connected to the rest of the team by cultivating interactions with openness and confidence.
### Team view
Each of us is a part of a gear and has the opportunity to add unique value to the overall project by thinking in terms of collaboration and contribution. Our attitude, findings and actions can make an impact on our teammates and results.
### Ownership
By being in charge of our part of a global plan, our best capabilities awake and our responsibility muscle (our response capability) gets stronger to make sure things get done.
### Happiness
Achieve your goals, happily. This is not only about getting the results we want but also enjoying the process. We must be prepared to celebrate the triumphs but also to manage challenges in the best way. We support wellness in a holistic way by the design and growth of an integral plan. We promote people's satisfaction and development.
### Enthusiasm
We do what we love and love what we do. That is reflected in what is built. We cultivate a balanced optimistic point of view so we are engaged with our projects in a natural way along the path.
### Transparency
We are transparent in terms of what we do and how we do it. Knowing plans and direction provides us with context and security. Don't be afraid to ask.
`);
  return { props: { content } };
};
const ValuesAndCulture = ({ content }) => {
  return (
    <>
      <Head>
        <title>Wasmer - Values & Culture</title>
        <meta name="title" content="Wasmer - Values & Culture" key="title" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
        />
      </Head>
      <div className="container my-page">
        <h2 className="text-2xl font-bold text-left md:text-center mb-12">
          Values and Culture
        </h2>
        <div className="flex items-center justify-center">
          <article className={styles.root}>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose mt-4"
            />
          </article>
        </div>
      </div>
    </>
  );
};

export default ValuesAndCulture;
