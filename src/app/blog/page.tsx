export default function Blog() {
  return (
    <div className="lg:w-[800px] mx-auto p-4 mb-8 space-y-8">

      <div>
        <h1 className="font-bold text-3xl tracking-tight pr-2">
          CRUST-Bench: A Benchmark for C-to-Safe-Rust Transpilation
        </h1>
      </div>

      <div className="mb-8">
        <figure>
          <img src="../assets/CRUST-bench.png" className="w-full h-auto" />
        </figure> 
      </div>

      <div>
        <div className="italic text-accented-foreground">
          <br />
          <p>
            C-to-Rust transpilation is a critical step for modernizing legacy C codebases, aiming to improve safety and integrate with modern Rust ecosystems.  However, the field has lacked a standard dataset for evaluating whether a system can transpile C into safe, functionally correct Rust. 
          </p>
          <br />
          <p>
            We introduce <strong>CRUST-Bench</strong>, a new benchmark designed to fill this gap.  It consists of 100 C repositories, each paired with manually-written safe Rust interfaces and test cases to validate the correctness of the transpilation.  By focusing on entire repositories instead of isolated functions, CRUST-Bench provides a realistic and challenging testbed for automated code migration. 
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="font-bold text-2xl tracking-tight">
          The Challenge: From Unsafe C to Safe, Idiomatic Rust
        </h2>
        <div className="space-y-6">
          <p className="leading-normal">
            The goal of C-to-Rust translation is not just ensuring functional equivalence; it involves a shift from C&apos;s non-memory-safe semantics to the memory-safe, idiomatic patterns of Rust.  While Rust supports `unsafe` code, the primary benefit of migration is to produce code that leverages Rust &apos;s compile-time safety guarantees, which can eliminate entire classes of memory bugs.  This requires more than a simple syntactic conversion.
          </p>

          <div className="my-8 flex justify-center">
            <figure className="w-full max-w-2xl">
              <img src="../assets/CRUST-bench-pipeline.png" className="w-full h-auto" />
              <figcaption className="text-center text-sm mt-2 text-gray-600">
                An example from CRUST-Bench, illustrating the C source, the target Rust interface, and the expected Rust implementation.  The task requires translating low-level C pointer operations into safe Rust abstractions. 
              </figcaption>
            </figure>
          </div>
          <div className="space-y-6">
            <p className="leading-normal">
              CRUST-Bench is designed to test this deep translation capability. A successful transpilation must produce Rust code that not only compiles without errors but also conforms to a predefined, idiomatic Rust interface and passes a suite of functional tests.  As the figure above shows, this involves complex challenges like converting raw C pointers into safe, structured types like Vec&lt;u8&gt; and handling Rust &apos;s strict borrowing and ownership rules.
            </p>
          </div>
          <div className="space-y-6">
          <h2 className="font-bold text-2xl tracking-tight">
            Inside the CRUST-Bench Benchmark
          </h2>
          <p className="leading-normal">
            Our benchmark contains 100 real-world C projects sourced from GitHub, with an average size of 958 lines of code, making them complex yet manageable for today &apos;s LLMs.  The projects span a diverse range of domains, including programming language infrastructure, data structures, system utilities, and networking. 
          </p>
          <div className="leading-normal">
            Each of the 100 instances in CRUST-Bench includes:
            <ul className="list-disc pl-4">
              <li>
                <strong>C Source Code:</strong> The original C repository, which can consist of multiple files with complex dependencies. 
              </li>
              <li>
                <strong>Rust Interface:</strong> A manually-authored Rust interface that specifies the target function signatures, data structures, and ownership patterns.  This interface guides the model to produce safe and idiomatic Rust.  The interfaces feature significant complexity, with 56% of functions using reference arguments and 30% involving mutable references. 
              </li>
              <li>
                <strong>Rust Tests:</strong> A suite of test cases, adapted from the original C project, to enforce the functional correctness of the transpiled Rust code. 
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="font-bold text-2xl tracking-tight">
            How do State-of-the-Art Models Do?
          </h2>
          <p className="leading-normal">
            We evaluated 8 frontier large language models on CRUST-Bench and found that C-to-safe-Rust transpilation remains a significant challenge. 
          </p>
          <p className="leading-normal">
            In a single-shot setting, performance is low across the board. The best-performing model, OpenAI &apos;s o1, correctly solved only 15% of the tasks.  Performance improves substantially with iterative self-repair.  When provided with compiler and test-failure feedback, the success rate for o1 increases to 37%.  Similarly, Claude 3.7 Sonnet &apos;s performance improves from 13% to 32% with a test-based repair strategy. 
          </p>
          <p className="leading-normal">
            Our error analysis shows that models struggle most with Rust &apos;s strict static guarantees.  The most common errors are type mismatches and violations of Rust &apos;s ownership and borrowing rules.  Another frequent issue is the generation of incomplete code, often due to model token limits, which results in unimplemented functions. 
          </p>
        </div>
        </div>
        <div className="space-y-6">
        <div className="space-y-6">
          <h2 className="font-bold text-2xl tracking-tight">
            Conclusion and Future Work
          </h2>
          <p className="leading-normal">
            Our evaluation shows that even state-of-the-art LLMs find safe and idiomatic code migration challenging, with the best approaches succeeding on only about a third of the tasks in CRUST-Bench.  This leaves significant room for future systems to improve. 
          </p>
          <p className="leading-normal">
            We are eager to see more progress in this area. We hope that CRUST-Bench will serve as a valuable resource for the community to drive research, enabling the systematic evaluation and development of new techniques for automated, safe code migration. 
          </p>
        </div>
      </div> 
      </div>
    </div>
    
  );
}
