import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import classnames from "classnames";

import css from "./about.css";
import grid from "../components/grid.css";

import heart from "../images/heart.svg";

import syrusPhoto from "../images/team/syrus.png";
import ivanPhoto from "../images/team/ivan.png";
// import nickPhoto from "../images/team/nick.png";
// import aaronPhoto from "../images/team/aaron.png";
import genericPhoto from "../images/team/generic.png";

const team = [
  {
    name: "Syrus Akbary",
    photo: syrusPhoto,
    description:
      "Before starting Wasmer in November 2018, Syrus Akbary was the CTO of Try.com. He’s the creator of several popular Python open-source libraries like Graphene, Promise used in 5 of top 50 Y Combinator companies.",
    twitter: "syrusakbary",
    github: "syrusakbary"
  },
  {
    name: "Ivan Enderlin",
    photo: ivanPhoto,
    description:
      "A versatile polyglot software engineer passionate about WebAssembly. Prior joining Wasmer he was working at Automattic and Mozilla.",
    twitter: "mnt_io",
    github: "Hywan"
  },
  {
    name: "Mark McCaskey",
    photo: genericPhoto,
    description:
      "Software engineer and language lover (Mark speaks 3 different languages!). Prior joining Wasmer he created rusty-boy, a GameBoy emulator in Rust.",
    github: "MarkMcCaskey"
  },
  {
    name: "Nick Lewycky",
    photo: nickPhoto,
    description:
      "Expert compiler engineer. Chocolatier. Ex-Google, with more than 10 year tenure on the company and LLVM core contributor.",
    github: "nlewycky"
  },
  // {
  //   name: "Aaron Turner",
  //   photo: aaronPhoto,
  //   description:
  //     "WebAssembly frontend developer and dev advocate. Skateboarder, musician, Ex-Google. Previous to joining Wasmer he created wasmbyexample and WasmBoy",
  //   twitter: "torch2424",
  //   github: "torch2424"
  // },
  // {
  //   name: "Brandon Fish",
  //   photo: genericPhoto,
  //   description:
  //     "Senior engineer with experience with language runtimes. He previously worked in Oracle-Labs in the Truffle framework, accelerating the execution of the Ruby runtime.",
  //   github: "bjfish"
  // },
  {
    name: "Heyang Zhou",
    photo: genericPhoto,
    description:
      "Prolific WebAssembly contributor. Before working at Wasmer he created the first Linux Subsystem based on WebAssembly: Cervus.",
    github: "losfair"
  }
];

const Home = () => (
  <div>
    <Head>
      <title>Wasmer - About</title>
    </Head>
    <Nav />
    <div className={classnames(css.hero)}>
      <div className={classnames(css.valuesGrid, grid.grid)} />
      <div className={css.heroContent}>
        <img src={heart} className={css.heart} />
        <div className={css.mainHero}>
          <h1 className={css.title}>
            Making software universally available
          </h1>
          <p>
            Wasmer was founded to solve problems we faced ourselves every day.
            Now, we strive to contribute to developers around the
            world so they can reach their full potential - and we do it with a smile :)
          </p>
          <p>
            Our team is distributed but connected by a culture of diligence,
            amplified by the passion we have for our shared mission.
            We care and value one another.
          </p>
        </div>
      </div>
    </div>
    <div className={css.team}>
      <h2>Meet the team...</h2>
      <ul>
        {team.map(person => {
          return (
            <li>
              <img src={person.photo} alt={`${person.name} profile picture`} />
              <h5>{person.name}</h5>
              <p>{person.description}</p>
            </li>
          );
        })}
      </ul>
    </div>

    {/* <div className={css.investors}>
      <h2>...and the investors</h2>
    </div> */}

    <Footer />
  </div>
);

export default Home;
