import { scoresData } from "@/app/data";
import Leaderboard from "@/components/Leaderboard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faGithub, faSquareYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex flex-col lg:w-[800px] mx-auto p-4">
      <div className="mx-4 justify-center">
        <div className="flex flex-col items-center">
          <h1 className="md:text-3xl text-2xl font-bold tracking-tight">
            CRUST-bench Leaderboard
          </h1>
          <div className="lg:mb-6 mb-2">
            {" "}
            <Link
              href="https://github.com/anirudhkhatry/CRUST-bench"
              target="_blank"
              className="inline-flex items-center custom-link text-sm"
            >
              GitHub
              <FontAwesomeIcon
                className="mx-1"
                icon={faGithub}
                width="15"
                height="15"
              />
            </Link>
            ,{" "}
            <Link
              href="https://arxiv.org/abs/2504.15254"
              target="_blank"
              className="inline-flex items-center custom-link text-sm"
            >
              ARXIV
              <Image
                src="./arxiv-logomark-small.svg"
                className="mx-1"
                alt="arxiv"
                width="10"
                height="10"
              />
            </Link>
            ,{" "}
            <Link
              href="https://www.youtube.com/watch?v=gKj1QZLDo4I"
              target="_blank"
              className="inline-flex items-center custom-link text-sm"
            >
              Video
              <FontAwesomeIcon
                className="mx-1"
                icon={faSquareYoutube}
                width="12"
                height="12"
              />
            </Link>
            </div>
        </div>
        <div className="mb-2">
          <p className="leading-normal">
            <span className="font-bold">CRUST-bench </span> 
            is a benchmark that measures the performance on the C-to-Rust translation task.
          </p>
          <p className="leading-normal">
            <br></br>Please see our <a
              href="/blog"
              className="custom-link"
            >
              blog post
            </a> for a more detailed description.
          </p>
        </div>
        <div className="rounded-lg">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="key-features">
              <AccordionTrigger>
                <h2>Benchmark Details</h2>
              </AccordionTrigger>
              <AccordionContent>

                <p className="leading-normal">
                  <span className="aggrefact">CRUST-bench</span> is a
                    project-level evaluation benchmark. It contains 100 C repositories with
                    human annotated (interface, test-cases) tuples. A
                    transpilation technique is expected to follow the interface when translating the C code to Rust and pass the test-cases defined in Rust.
                </p>

                <p className="leading-normal">
                    <br></br>The benchmark covers both single file projects and multifile projects. 
                    We collected data from 100 Github repositories, spanning various domains like:
                </p>
                <ul className="leading-normal list-disc list-inside ml-4">
                  <li>System utilities</li>
                  <li>Algorithms</li>
                  <li>Programming Language Infrastructure</li>
                  <li>Networking</li>
                  <li>Cryptography and Security</li>
                  <li>Data structures</li>
                  <li>...etc.</li>
                </ul>

                <p className="leading-normal">
                    <br></br>We evaluate state-of-the-art large language models (LLMs) on this task and find that safe and idiomatic Rust generation is still a challenging problem for various state-of-the-art methods and techniques.
                    The best performing model, OpenAI o1, is able to solve only 15 tasks in a single-shot setting.
                </p>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Leaderboard scoresData={scoresData}></Leaderboard>
      <div className="rounded-lg">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="author" className="flex-shrink">
            <AccordionTrigger>
              <h2>Team</h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 auto-rows-auto gap-x-4 gap-y-8">
                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/anirudh.jpg"
                    alt="Anirudh Khatry"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.anirudhkhatry.com"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Anirudh Khatry
                  </Link>
                  <p className="text-muted-foreground text-center">
                    UT Austin
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/robert.jpg"
                    alt="Robert Zhang"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2 object-cover"
                  />
                  <Link
                    href="https://robertzhang.vercel.app"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Robert Zhang
                  </Link>
                  <p className="text-muted-foreground text-center">
                    UT Austin
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/tony_pan.jpg"
                    alt="Jia Pan"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  /> 
                <Link
                    href="https://tonypan123.github.io"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Jia (Tony) Pan
                  </Link>
                  <p className="text-muted-foreground text-center">
                    UT Austin
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/zettenwang.png"
                    alt="Ziteng Wang"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                <Link
                    href="https://ziteng.wang"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Ziteng Wang
                  </Link>
                  <p className="text-muted-foreground text-center">
                    UT Austin
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/jocelyn.jpg"
                    alt="Jocelyn Chen"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://thelyad.github.io"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Jocelyn Chen
                  </Link>
                  <p className="text-muted-foreground text-center">
                    New York University
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/greg.png"
                    alt="Greg Durrett"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.cs.utexas.edu/~gdurrett"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Greg Durrett
                  </Link>
                  <p className="text-muted-foreground text-center">
                    UT Austin
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="./assets/isil.jpg"
                    alt="Isil Dillig"
                    width={128}
                    height={128}
                    quality={100}
                    className="w-32 h-32 rounded-full mb-2"
                  />
                  <Link
                    href="https://www.cs.utexas.edu/~isil/"
                    target="_blank"
                    className="mb-1 custom-link"
                  >
                    Isil Dillig
                  </Link>
                  <p className="text-muted-foreground text-center">
                    UT Austin
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="citaiton">
            <AccordionTrigger>
              <h2>Citation</h2>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap">
                {`@misc{
  khatry2025crustbenchcomprehensivebenchmarkctosaferust,
  title={CRUST-Bench: A Comprehensive Benchmark for C-to-safe-Rust Transpilation}, 
  author={Anirudh Khatry and Robert Zhang and Jia Pan and Ziteng Wang and Qiaochu Chen and Greg Durrett and Isil Dillig},
  year={2025},
  eprint={2504.15254},
  archivePrefix={arXiv},
  primaryClass={cs.SE},
  url={https://arxiv.org/abs/2504.15254}, 
}`}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="acknowledgements">
            <AccordionTrigger>
              <h2>Acknowledgements</h2>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap">
                {`This research was conducted within a group supported by the National Science Founda-
tion under awards CCF-1762299, CCF-1918889, CNS-1908304, CCF-1901376, CNS-2120696,
CCF-2210831, CCF-2319471, and and by the Defense Advanced Research Projects Agency
(DARPA) under Agreement No. HR00112590133. We also thank the All Hands AI team
for a discussion on the OpenHands CodeAct agentic framework applied to the C-to-Rust
transpilation task.`}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
